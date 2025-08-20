'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useTranslations, Locale } from '@/lib/translations'

interface NewsletterSignupProps {
  className?: string
  placeholder?: string
  buttonText?: string
  locale?: Locale
}

export function NewsletterSignup({
  className,
  placeholder,
  buttonText,
  locale = 'en',
}: NewsletterSignupProps) {
  const t = useTranslations(locale)
  
  // Use translations as defaults if no props provided
  const finalPlaceholder = placeholder || t.newsletter.placeholder
  const finalButtonText = buttonText || t.newsletter.subscribe
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage(t.newsletter.invalidEmail)
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
        setMessage(t.newsletter.successMessage)
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.message || t.newsletter.genericError)
      }
    } catch (error) {
      setStatus('error')
      setMessage(t.newsletter.networkError)
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
        <p className="mt-2 text-sm text-theme-muted">
          {t.newsletter.confirmEmail}
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
            placeholder={finalPlaceholder}
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
            {status === 'loading' ? t.newsletter.subscribing : finalButtonText}
          </button>
        </div>

        {status === 'error' && (
          <p className="mt-2 text-sm text-red-400">{message}</p>
        )}

        <p className="mt-2 text-xs text-theme-muted">
          {t.newsletter.noSpam}
        </p>
      </form>
    </div>
  )
}
