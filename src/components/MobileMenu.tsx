'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useTranslations, Locale } from '@/lib/translations'
import { Brain, Home, BookOpen, User, Globe, Sun, Moon, X } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  onSwitchLanguage: () => void
}

export function MobileMenu({ 
  isOpen, 
  onClose, 
  theme, 
  onToggleTheme, 
  onSwitchLanguage 
}: MobileMenuProps) {
  const pathname = usePathname()
  const locale = pathname.startsWith('/es') ? 'es' : 'en'
  const t = useTranslations(locale as Locale)

  const navigation = [
    { name: t.nav.home, href: locale === 'es' ? '/es' : '/', icon: Home },
    { name: t.nav.essays, href: locale === 'es' ? '/es/essays' : '/essays', icon: BookOpen },
    { name: t.nav.about, href: locale === 'es' ? '/es/about' : '/about', icon: User },
  ]

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className={cn(
        "fixed right-0 top-0 z-50 h-full w-64 transform transition-transform duration-300 ease-in-out md:hidden",
        theme === 'dark' 
          ? "bg-dark-bg border-l border-dark-border" 
          : "bg-light-bg border-l border-light-border"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-theme">
          <div className="flex items-center space-x-2">
            <Brain size={20} className="text-primary-500" />
            <span className={cn(
              "text-lg font-headline font-bold",
              theme === 'dark' ? "text-white" : "text-light-text"
            )}>
              Pedro LLanca
            </span>
          </div>
          <button
            onClick={onClose}
            className={cn(
              "p-2 rounded-md transition-colors",
              theme === 'dark' 
                ? "hover:bg-dark-card text-dark-text" 
                : "hover:bg-light-card text-light-text"
            )}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const IconComponent = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-500/10 text-primary-500'
                    : theme === 'dark' 
                      ? 'text-dark-text hover:bg-dark-card' 
                      : 'text-light-text hover:bg-light-card'
                )}
              >
                <IconComponent 
                  size={18} 
                  className={cn(
                    isActive ? 'text-primary-500' : theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                  )}
                />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-theme space-y-2">
          {/* Language Switcher */}
          <button
            onClick={() => {
              onSwitchLanguage()
              onClose()
            }}
            className={cn(
              "flex items-center justify-between w-full px-3 py-3 rounded-md text-sm font-medium transition-colors",
              theme === 'dark' 
                ? 'text-dark-text hover:bg-dark-card' 
                : 'text-light-text hover:bg-light-card'
            )}
          >
            <div className="flex items-center space-x-3">
              <Globe 
                size={18} 
                className={theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'}
              />
              <span>{locale === 'en' ? 'Cambiar a Español' : 'Switch to English'}</span>
            </div>
            <span className="text-xs text-primary-500">
              {locale === 'en' ? 'ES' : 'EN'}
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className={cn(
              "flex items-center justify-between w-full px-3 py-3 rounded-md text-sm font-medium transition-colors",
              theme === 'dark' 
                ? 'text-dark-text hover:bg-dark-card' 
                : 'text-light-text hover:bg-light-card'
            )}
          >
            <div className="flex items-center space-x-3">
              {theme === 'dark' ? (
                <Sun size={18} className="text-dark-muted" />
              ) : (
                <Moon size={18} className="text-light-muted" />
              )}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </div>
          </button>
        </div>
      </div>
    </>
  )
}