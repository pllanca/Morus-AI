'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface NewsletterSignupProps {
  className?: string
  placeholder?: string
  buttonText?: string
}

export function NewsletterSignup({
  className,
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Thanks for subscribing!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div
        className={cn(
          'rounded-lg border border-primary-500/20 bg-primary-500/10 p-4 text-center',
          className
        )}
      >
        <p className="font-medium text-primary-400">{message}</p>
        <p className="mt-2 text-sm text-dark-muted">
          Check your email to confirm your subscription.
        </p>
      </div>
    )
  }

  return (
    <div className={cn('', className)}>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="newsletter-input flex-1"
            disabled={status === 'loading'}
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className={cn(
              'newsletter-button',
              status === 'loading' && 'cursor-not-allowed opacity-75'
            )}
          >
            {status === 'loading' ? 'Subscribing...' : buttonText}
          </button>
        </div>

        {status === 'error' && (
          <p className="mt-2 text-sm text-red-400">{message}</p>
        )}

        <p className="mt-2 text-xs text-dark-muted">
          No spam, unsubscribe anytime.
        </p>
      </form>
    </div>
  )
}
