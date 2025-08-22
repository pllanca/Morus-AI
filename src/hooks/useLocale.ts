'use client'

import { usePathname } from 'next/navigation'
import { Locale } from '@/lib/translations'

export function useLocale(): Locale {
  const pathname = usePathname()
  
  // Calculate locale directly from pathname without state
  // This ensures consistent server/client rendering
  // Only check if path STARTS with /es (not contains 'es')
  const locale = pathname.startsWith('/es/') || pathname === '/es' ? 'es' : 'en'
  
  // Debug logging to trace the issue (development only)
  if (process.env.NODE_ENV === 'development') {
    console.log('useLocale - pathname:', pathname, 'detected:', locale)
  }
  
  return locale
}

// Helper function to get navigation URLs for a given locale
export function getNavigationUrls(locale: Locale) {
  const baseUrls = {
    home: '/',
    essays: '/essays',
    about: '/about',
  }

  if (locale === 'es') {
    return {
      home: '/es',
      essays: '/es/essays',
      about: '/es/about',
    }
  }

  return baseUrls
}

// Helper function to switch between locales for a given pathname
export function switchLocaleForPath(currentPath: string, targetLocale: Locale): string {
  // Debug logging (development only)
  if (process.env.NODE_ENV === 'development') {
    console.log('switchLocaleForPath - currentPath:', currentPath, 'targetLocale:', targetLocale)
  }
  
  if (targetLocale === 'es') {
    // Add /es prefix if not already there
    if (currentPath.startsWith('/es/') || currentPath === '/es') {
      return currentPath // Already in Spanish
    }
    return '/es' + (currentPath === '/' ? '' : currentPath)
  } else {
    // Remove /es prefix for English
    if (currentPath.startsWith('/es/')) {
      const newPath = currentPath.replace('/es', '') || '/'
      return newPath
    } else if (currentPath === '/es') {
      return '/'
    }
    return currentPath // Already in English
  }
}