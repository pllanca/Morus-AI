'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { siteConfig } from '@/lib/config'
import { useTranslations, Locale } from '@/lib/translations'
import { useLocale, getNavigationUrls, switchLocaleForPath } from '@/hooks/useLocale'
import { cn } from '@/lib/utils'
import { Brain, Home, BookOpen, User, Globe, Sun, Moon, Menu } from 'lucide-react'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (savedTheme) {
      setTheme(savedTheme)
      if (savedTheme === 'light') {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      } else {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      }
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    if (mounted) {
      if (newTheme === 'light') {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      } else {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      }
      localStorage.setItem('theme', newTheme)
    }
  }
  
  // Use centralized locale detection
  const locale = useLocale()
  const t = useTranslations(locale)
  const navigationUrls = getNavigationUrls(locale)

  const navigation = [
    { name: t.nav.home, href: navigationUrls.home, icon: Home },
    { name: t.nav.essays, href: navigationUrls.essays, icon: BookOpen },
    { name: t.nav.about, href: navigationUrls.about, icon: User },
  ]

  const switchLanguage = () => {
    const newLocale = locale === 'en' ? 'es' : 'en'
    const newPath = switchLocaleForPath(pathname, newLocale)
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Header switchLanguage - current locale:', locale, 'new locale:', newLocale, 'new path:', newPath)
    }
    router.push(newPath)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true)
  }

  return (
    <>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        theme={theme}
        onToggleTheme={toggleTheme}
        onSwitchLanguage={switchLanguage}
      />
    <header className={cn(
      "sticky top-0 z-50 w-full border-b backdrop-blur-sm transition-colors duration-200",
      theme === 'dark' 
        ? "border-dark-border bg-dark-bg/80" 
        : "border-light-border bg-light-bg/80"
    )}>
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <Link href={navigationUrls.home} className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="transition-transform duration-200 group-hover:scale-110">
              <Brain size={20} className="text-primary-500 sm:w-6 sm:h-6" />
            </div>
            <span className={cn(
              "text-lg sm:text-xl font-headline font-bold transition-colors duration-200",
              theme === 'dark' ? "text-white" : "text-light-text"
            )}>
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigation.map((item) => {
              const IconComponent = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center space-x-2 text-sm font-medium transition-all duration-200',
                    'hover:text-primary-500 hover:-translate-y-0.5',
                    isActive
                      ? 'text-primary-500'
                      : theme === 'dark' ? 'text-dark-text' : 'text-light-text'
                  )}
                >
                  <IconComponent 
                    size={16} 
                    className={cn(
                      'transition-all duration-200',
                      isActive ? 'text-primary-500' : theme === 'dark' ? 'text-dark-muted' : 'text-light-muted',
                      'group-hover:text-primary-500 group-hover:scale-110'
                    )}
                  />
                  <span>{item.name}</span>
                </Link>
              )
            })}
            
            {/* Language Switcher */}
            <button
              onClick={switchLanguage}
              className={cn(
                "group flex items-center space-x-2 text-sm font-medium hover:text-primary-500 transition-all duration-200 hover:-translate-y-0.5",
                theme === 'dark' ? 'text-dark-text' : 'text-light-text'
              )}
              title={locale === 'en' ? 'Cambiar a Español' : 'Switch to English'}
            >
              <Globe 
                size={16} 
                className={cn(
                  "group-hover:text-primary-500 group-hover:scale-110 transition-all duration-200",
                  theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                )}
              />
              <span>{locale === 'en' ? 'ES' : 'EN'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={cn(
                "group flex items-center space-x-2 text-sm font-medium hover:text-primary-500 transition-all duration-200 hover:-translate-y-0.5",
                theme === 'dark' ? 'text-dark-text' : 'text-light-text'
              )}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun 
                  size={16} 
                  className={cn(
                    "group-hover:text-primary-500 group-hover:scale-110 transition-all duration-200",
                    'text-dark-muted'
                  )}
                />
              ) : (
                <Moon 
                  size={16} 
                  className={cn(
                    "group-hover:text-primary-500 group-hover:scale-110 transition-all duration-200",
                    'text-light-muted'
                  )}
                />
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={openMobileMenu}
            className={cn(
              "md:hidden p-2 rounded-md transition-colors",
              theme === 'dark' 
                ? "hover:bg-dark-card text-dark-text" 
                : "hover:bg-light-card text-light-text"
            )}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
    </>
  )
}
