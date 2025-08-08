'use client'

import { useState } from 'react'
import { siteConfig } from '@/lib/config'
import { useTranslations, Locale } from '@/lib/translations'

interface SocialShareProps {
  title: string
  url: string
  description?: string
  locale?: Locale
}

export function SocialShare({ title, url, description, locale = 'en' }: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const t = useTranslations(locale)

  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)
  const encodedDescription = encodeURIComponent(description || '')

  const shareLinks = [
    {
      name: 'Twitter',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: '𝕏',
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: 'in',
    },
    {
      name: 'Email',
      href: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      icon: '✉',
    },
  ]

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  return (
    <div className="flex items-center gap-4 py-4">
      <span className="text-sm text-dark-muted">{t.essayDetail.share}</span>

      <div className="flex items-center gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-dark-border bg-dark-card text-dark-text transition-all duration-200 hover:border-primary-500 hover:bg-primary-500 hover:text-white"
            title={`Share on ${link.name}`}
          >
            <span className="text-sm font-semibold">{link.icon}</span>
          </a>
        ))}

        <button
          onClick={handleCopyLink}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-dark-border bg-dark-card text-dark-text transition-all duration-200 hover:border-primary-500 hover:bg-primary-500 hover:text-white"
          title="Copy link"
        >
          {copied ? (
            <span className="text-sm">✓</span>
          ) : (
            <span className="text-sm">🔗</span>
          )}
        </button>
      </div>
    </div>
  )
}
