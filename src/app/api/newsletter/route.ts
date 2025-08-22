import { NextRequest, NextResponse } from 'next/server'
import { newsletterConfig } from '@/lib/config'
import { newsletterRateLimit } from '@/lib/rate-limit'

// Input validation
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = newsletterRateLimit(request)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: true, 
          message: 'Too many subscription attempts. Please try again later.',
          retryAfter: rateLimitResult.retryAfter 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': rateLimitResult.retryAfter?.toString() || '900',
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
          }
        }
      )
    }

    // Parse and validate request body
    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: true, message: 'Invalid request format.' },
        { status: 400 }
      )
    }

    const { email } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: true, message: 'Email address is required.' },
        { status: 400 }
      )
    }

    if (!validateEmail(email.trim())) {
      return NextResponse.json(
        { error: true, message: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.trim().toLowerCase()

    // Try different newsletter services in order of preference
    let result = null
    const errors: string[] = []

    // Try Mailchimp first
    if (
      newsletterConfig.mailchimp.apiKey &&
      newsletterConfig.mailchimp.audienceId
    ) {
      result = await subscribeToMailchimp(normalizedEmail)
      if (result.success) {
        return NextResponse.json({
          success: true,
          message: 'Successfully subscribed to the newsletter!',
        })
      } else {
        errors.push('Mailchimp service unavailable')
      }
    }

    // Try ConvertKit second
    if (
      newsletterConfig.convertkit.apiKey &&
      newsletterConfig.convertkit.formId
    ) {
      result = await subscribeToConvertKit(normalizedEmail)
      if (result.success) {
        return NextResponse.json({
          success: true,
          message: 'Successfully subscribed to the newsletter!',
        })
      } else {
        errors.push('ConvertKit service unavailable')
      }
    }

    // Fallback: Just return success (for development/testing)
    // In production, you should implement at least one service
    if (process.env.NODE_ENV === 'development') {
      console.log(`Newsletter signup (dev mode): ${normalizedEmail}`)
      return NextResponse.json({
        success: true,
        message:
          'Successfully subscribed to the newsletter! (Development mode)',
      })
    }

    // Log errors for monitoring (in production, use proper logging service)
    console.error('Newsletter subscription failed:', {
      email: normalizedEmail,
      errors,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        error: true,
        message: 'Newsletter service temporarily unavailable. Please try again later.',
      },
      { status: 503 }
    )
  } catch (error) {
    // Log error for monitoring
    console.error('Newsletter signup error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    })
    
    return NextResponse.json(
      { error: true, message: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}

async function subscribeToMailchimp(email: string) {
  try {
    const { apiKey, audienceId } = newsletterConfig.mailchimp
    if (!apiKey || !audienceId) return { success: false }

    const datacenter = apiKey.split('-')[1]
    const url = `https://${datacenter}.api.mailchimp.com/3.0/lists/${audienceId}/members`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
      }),
    })

    if (response.ok) {
      return { success: true }
    } else {
      const error = await response.json()
      console.error('Mailchimp error:', error)
      return { success: false, error }
    }
  } catch (error) {
    console.error('Mailchimp subscription error:', error)
    return { success: false, error }
  }
}

async function subscribeToConvertKit(email: string) {
  try {
    const { apiKey, formId } = newsletterConfig.convertkit
    if (!apiKey || !formId) return { success: false }

    const url = `https://api.convertkit.com/v3/forms/${formId}/subscribe`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey,
        email: email,
      }),
    })

    if (response.ok) {
      return { success: true }
    } else {
      const error = await response.json()
      console.error('ConvertKit error:', error)
      return { success: false, error }
    }
  } catch (error) {
    console.error('ConvertKit subscription error:', error)
    return { success: false, error }
  }
}
