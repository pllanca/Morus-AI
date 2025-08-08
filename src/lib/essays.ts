import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { format } from 'date-fns'
import type { Essay, EssayWithoutContent, EssayFrontmatter } from '@/types/essay'
import type { Locale } from './translations'

function getEssaysDirectory(locale: Locale = 'en'): string {
  return path.join(process.cwd(), `content/essays${locale === 'es' ? '-es' : ''}`)
}

export async function getAllEssays(locale: Locale = 'en'): Promise<EssayWithoutContent[]> {
  try {
    const essaysDirectory = getEssaysDirectory(locale)
    if (!fs.existsSync(essaysDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(essaysDirectory)
    const mdxFiles = fileNames.filter((name) => name.endsWith('.mdx'))

    const allEssaysData = await Promise.all(
      mdxFiles.map(async (fileName) => {
        const fullPath = path.join(essaysDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        const stats = readingTime(content)

        const slug = fileName.replace(/\.mdx$/, '')

        const frontmatter: EssayFrontmatter = {
          title: data.title || 'Untitled',
          date: data.date ? format(new Date(data.date), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
          summary: data.summary || '',
          tags: Array.isArray(data.tags) ? data.tags : [],
          featured: Boolean(data.featured),
          published: data.published !== false,
          author: data.author,
          readingTime: stats.text,
        }

        return {
          slug,
          frontmatter,
          readingTime: stats,
        }
      })
    )

    // Filter out unpublished essays in production
    const publishedEssays = allEssaysData.filter(essay => 
      process.env.NODE_ENV === 'development' || essay.frontmatter.published
    )

    // Sort essays by date (newest first)
    return publishedEssays.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date)
      const dateB = new Date(b.frontmatter.date)
      return dateB.getTime() - dateA.getTime()
    })
  } catch (error) {
    console.error('Error reading essays:', error)
    return []
  }
}

export async function getEssayBySlug(slug: string, locale: Locale = 'en'): Promise<Essay | null> {
  try {
    const essaysDirectory = getEssaysDirectory(locale)
    const fullPath = path.join(essaysDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const stats = readingTime(content)

    const frontmatter: EssayFrontmatter = {
      title: data.title || 'Untitled',
      date: data.date ? format(new Date(data.date), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
      summary: data.summary || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      featured: Boolean(data.featured),
      published: data.published !== false,
      author: data.author,
      readingTime: stats.text,
    }

    // Check if essay should be visible
    if (process.env.NODE_ENV === 'production' && !frontmatter.published) {
      return null
    }

    return {
      slug,
      frontmatter,
      content,
      readingTime: stats,
    }
  } catch (error) {
    console.error(`Error reading essay ${slug}:`, error)
    return null
  }
}

export async function getFeaturedEssays(locale: Locale = 'en'): Promise<EssayWithoutContent[]> {
  const allEssays = await getAllEssays(locale)
  return allEssays.filter(essay => essay.frontmatter.featured).slice(0, 3)
}

export async function getEssaysByTag(tag: string, locale: Locale = 'en'): Promise<EssayWithoutContent[]> {
  const allEssays = await getAllEssays(locale)
  return allEssays.filter(essay => 
    essay.frontmatter.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

export async function getAllTags(locale: Locale = 'en'): Promise<string[]> {
  const allEssays = await getAllEssays(locale)
  const tags = new Set<string>()
  
  allEssays.forEach(essay => {
    essay.frontmatter.tags.forEach(tag => tags.add(tag))
  })
  
  return Array.from(tags).sort()
}

export async function getEssaySlugs(locale: Locale = 'en'): Promise<string[]> {
  try {
    const essaysDirectory = getEssaysDirectory(locale)
    if (!fs.existsSync(essaysDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(essaysDirectory)
    return fileNames
      .filter((name) => name.endsWith('.mdx'))
      .map((name) => name.replace(/\.mdx$/, ''))
  } catch (error) {
    console.error('Error reading essay slugs:', error)
    return []
  }
}

export function formatDate(date: string): string {
  try {
    return format(new Date(date), 'MMMM d, yyyy')
  } catch (error) {
    console.error('Error formatting date:', error)
    return date
  }
}