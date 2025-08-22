'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/lib/config'
import { useTranslations, Locale } from '@/lib/translations'
import { useLocale, getNavigationUrls } from '@/hooks/useLocale'
import { NewsletterSignup } from './NewsletterSignup'
import { ClientOnly } from './ClientOnly'

export function Footer() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations(locale)
  const navigationUrls = getNavigationUrls(locale)
  
  const currentYear = new Date().getFullYear()
  
  // Social links will be rendered client-side only via ClientOnly wrapper
  const socialLinks = Object.entries(siteConfig.social).filter(([, url]) => url)

  return (
    <footer className="border-t transition-colors duration-200">
      <div className="container py-mobile">
        {/* Newsletter Section */}
        <div className="mb-8 sm:mb-12">
          <div className="mx-auto max-w-md text-center">
            <h3 className="mb-3 text-card-title font-semibold text-theme-primary transition-colors duration-200">
              {t.newsletter.stayUpdated}
            </h3>
            <p className="mb-4 sm:mb-6 text-card-content text-theme-secondary transition-colors duration-200">
              {t.newsletter.stayUpdatedText}
            </p>
            <div suppressHydrationWarning>
              <NewsletterSignup locale={locale} />
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <Link
              href={navigationUrls.essays}
              className="touch-target text-sm text-theme-secondary hover:text-primary-500 transition-colors"
            >
              {t.footer.allEssays}
            </Link>
            <Link
              href={navigationUrls.about}
              className="touch-target text-sm text-theme-secondary hover:text-primary-500 transition-colors"
            >
              {t.footer.about}
            </Link>
          </div>

          <ClientOnly>
            {socialLinks.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                {socialLinks.map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target text-sm capitalize text-theme-secondary hover:text-primary-500 transition-colors"
                  >
                    {platform === 'email' ? t.footer.contact : platform}
                  </a>
                ))}
              </div>
            )}
          </ClientOnly>
        </div>

        <div className="mt-6 sm:mt-8 border-t border-theme pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-theme-muted">
            &copy; {currentYear} {siteConfig.author}. {t.footer.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  )
}
