import { NextRequest, NextResponse } from 'next/server'
import { newsletterConfig } from '@/lib/config'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: true, message: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    // Try different newsletter services in order of preference
    let result = null

    // Try Mailchimp first
    if (
      newsletterConfig.mailchimp.apiKey &&
      newsletterConfig.mailchimp.audienceId
    ) {
      result = await subscribeToMailchimp(email)
      if (result.success) {
        return NextResponse.json({
          success: true,
          message: 'Successfully subscribed to the newsletter!',
        })
      }
    }

    // Try ConvertKit second
    if (
      newsletterConfig.convertkit.apiKey &&
      newsletterConfig.convertkit.formId
    ) {
      result = await subscribeToConvertKit(email)
      if (result.success) {
        return NextResponse.json({
          success: true,
          message: 'Successfully subscribed to the newsletter!',
        })
      }
    }

    // Fallback: Just return success (for development/testing)
    // In production, you should implement at least one service
    if (process.env.NODE_ENV === 'development') {
      console.log(`Newsletter signup (dev mode): ${email}`)
      return NextResponse.json({
        success: true,
        message:
          'Successfully subscribed to the newsletter! (Development mode)',
      })
    }

    return NextResponse.json(
      {
        error: true,
        message: 'Newsletter service not configured. Please try again later.',
      },
      { status: 500 }
    )
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json(
      { error: true, message: 'Something went wrong. Please try again.' },
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
