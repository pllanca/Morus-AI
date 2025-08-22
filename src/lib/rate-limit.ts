import { NextRequest } from 'next/server'

interface RateLimitOptions {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
  identifier?: (req: NextRequest) => string // Function to identify unique users
}

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

// In-memory store for rate limiting (in production, use Redis or similar)
const rateLimitStore: RateLimitStore = {}

export function rateLimit(options: RateLimitOptions) {
  const { windowMs, maxRequests, identifier = getDefaultIdentifier } = options

  return (req: NextRequest) => {
    const key = identifier(req)
    const now = Date.now()
    
    // Clean up expired entries
    if (rateLimitStore[key] && now > rateLimitStore[key].resetTime) {
      delete rateLimitStore[key]
    }

    // Initialize or get current count
    if (!rateLimitStore[key]) {
      rateLimitStore[key] = {
        count: 0,
        resetTime: now + windowMs,
      }
    }

    // Increment count
    rateLimitStore[key].count++

    const { count, resetTime } = rateLimitStore[key]
    const remaining = Math.max(0, maxRequests - count)
    const isExceeded = count > maxRequests

    return {
      success: !isExceeded,
      limit: maxRequests,
      remaining,
      resetTime,
      retryAfter: isExceeded ? Math.ceil((resetTime - now) / 1000) : null,
    }
  }
}

function getDefaultIdentifier(req: NextRequest): string {
  // Use IP address as default identifier
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown'
  return ip
}

// Pre-configured rate limiters
export const newsletterRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 requests per 15 minutes per IP
})

export const generalApiRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 60, // 60 requests per minute per IP
})