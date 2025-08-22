'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { siteConfig } from '@/lib/config'
import { useTranslations, Locale } from '@/lib/translations'
import { cn } from '@/lib/utils'
import { Brain, Home, BookOpen, User, Globe, Sun, Moon } from 'lucide-react'

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = useState(false)

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
  
  // Extract locale from pathname
  const locale = pathname.startsWith('/es') ? 'es' : 'en'
  const t = useTranslations(locale as Locale)

  const navigation = [
    { name: t.nav.home, href: locale === 'es' ? '/es' : '/', icon: Home },
    { name: t.nav.essays, href: locale === 'es' ? '/es/essays' : '/essays', icon: BookOpen },
    { name: t.nav.about, href: locale === 'es' ? '/es/about' : '/about', icon: User },
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
    <header className={cn(
      "sticky top-0 z-50 w-full border-b backdrop-blur-sm transition-colors duration-200",
      theme === 'dark' 
        ? "border-dark-border bg-dark-bg/80" 
        : "border-light-border bg-light-bg/80"
    )}>
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <Link href={locale === 'es' ? '/es' : '/'} className="flex items-center space-x-3 group">
            <div className="transition-transform duration-200 group-hover:scale-110">
              <Brain size={24} className="text-primary-500" />
            </div>
            <span className={cn(
              "text-xl font-headline font-bold transition-colors duration-200",
              theme === 'dark' ? "text-white" : "text-light-text"
            )}>
              {siteConfig.name}
            </span>
          </Link>

          <nav className="flex items-center space-x-8">
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
        </div>
      </div>
    </header>
  )
}
