import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncateText(text: string, length: number = 160): string {
  if (text.length <= length) return text
  return text.substring(0, length).replace(/\s+\S*$/, '') + '...'
}

export function getBaseUrl(): string {
  if (typeof window !== 'undefined') return ''
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  if (process.env.SITE_URL) return process.env.SITE_URL
  return 'http://localhost:3000'
}

export function generateOgImageUrl(title: string, description?: string): string {
  const params = new URLSearchParams({
    title,
    ...(description && { description }),
  })
  
  return `${getBaseUrl()}/api/og?${params.toString()}`
}