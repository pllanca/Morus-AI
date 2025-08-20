'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { siteConfig } from '@/lib/config'
import { useTranslations, Locale } from '@/lib/translations'
import { cn } from '@/lib/utils'
import { NewsletterSignup } from './NewsletterSignup'

export function Footer() {
  const pathname = usePathname()
  const locale = pathname.startsWith('/es') ? 'es' : 'en'
  const t = useTranslations(locale as Locale)
  
  const [currentYear, setCurrentYear] = useState<number | null>(null)
  const socialLinks = Object.entries(siteConfig.social).filter(([, url]) => url)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="border-t transition-colors duration-200">
      <div className="container py-16">
        {/* Newsletter Section */}
        <div className="mb-12">
          <div className="mx-auto max-w-md text-center">
            <h3 className="mb-3 text-xl font-semibold text-theme-primary transition-colors duration-200">
              {t.newsletter.stayUpdated}
            </h3>
            <p className="mb-6 text-theme-secondary transition-colors duration-200">
              {t.newsletter.stayUpdatedText}
            </p>
            <NewsletterSignup locale={locale} />
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-8">
            <Link
              href={locale === 'es' ? '/es/essays' : '/essays'}
              className="text-sm text-theme-secondary hover:text-primary-500"
            >
              {t.footer.allEssays}
            </Link>
            <Link
              href={locale === 'es' ? '/es/about' : '/about'}
              className="text-sm text-theme-secondary hover:text-primary-500"
            >
              {t.footer.about}
            </Link>
          </div>

          {socialLinks.length > 0 && (
            <div className="flex items-center space-x-6">
              {socialLinks.map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm capitalize text-theme-secondary hover:text-primary-500"
                >
                  {platform === 'email' ? t.footer.contact : platform}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 border-t border-theme pt-8 text-center">
          <p className="text-sm text-theme-muted">
            &copy; {currentYear || '2024'} {siteConfig.author}. {t.footer.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  )
}
