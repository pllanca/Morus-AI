'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { siteConfig } from '@/lib/config'
import { useTranslations, Locale } from '@/lib/translations'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  
  // Extract locale from pathname
  const locale = pathname.startsWith('/es') ? 'es' : 'en'
  const t = useTranslations(locale as Locale)

  const navigation = [
    { name: t.nav.home, href: locale === 'es' ? '/es' : '/' },
    { name: t.nav.essays, href: locale === 'es' ? '/es/essays' : '/essays' },
    { name: t.nav.about, href: locale === 'es' ? '/es/about' : '/about' },
  ]

  const switchLanguage = () => {
    const newLocale = locale === 'en' ? 'es' : 'en'
    let newPath = pathname
    
    if (locale === 'es') {
      // Remove /es prefix
      newPath = pathname.replace('/es', '') || '/'
    } else {
      // Add /es prefix
      newPath = '/es' + pathname
    }
    
    router.push(newPath)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-dark-border bg-dark-bg/80 backdrop-blur-sm">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <Link href={locale === 'es' ? '/es' : '/'} className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">
              {siteConfig.name}
            </span>
          </Link>

          <nav className="flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary-500',
                  pathname === item.href
                    ? 'text-primary-500'
                    : 'text-dark-text'
                )}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Language Switcher */}
            <button
              onClick={switchLanguage}
              className="text-sm font-medium text-dark-text hover:text-primary-500 transition-colors"
              title={locale === 'en' ? 'Cambiar a Español' : 'Switch to English'}
            >
              {locale === 'en' ? 'ES' : 'EN'}
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
