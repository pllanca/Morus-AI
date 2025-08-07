import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import { NewsletterSignup } from './NewsletterSignup'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const socialLinks = Object.entries(siteConfig.social).filter(([, url]) => url)

  return (
    <footer className="border-t border-dark-border bg-dark-bg">
      <div className="container py-16">
        {/* Newsletter Section */}
        <div className="mb-12">
          <div className="mx-auto max-w-md text-center">
            <h3 className="mb-3 text-xl font-semibold text-white">
              Stay Updated
            </h3>
            <p className="mb-6 text-dark-text">
              Get notified when I publish new essays. No spam, ever.
            </p>
            <NewsletterSignup />
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-8">
            <Link
              href="/essays"
              className="text-sm text-dark-text hover:text-primary-500"
            >
              All Essays
            </Link>
            <Link
              href="/about"
              className="text-sm text-dark-text hover:text-primary-500"
            >
              About
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
                  className="text-sm capitalize text-dark-text hover:text-primary-500"
                >
                  {platform === 'email' ? 'Contact' : platform}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 border-t border-dark-border pt-8 text-center">
          <p className="text-sm text-dark-muted">
            &copy; {currentYear} {siteConfig.author}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
