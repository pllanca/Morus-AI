export interface EssayFrontmatter {
  title: string
  date: string
  summary: string
  tags: string[]
  featured?: boolean
  published?: boolean
  author?: string
  readingTime?: string
}

export interface Essay {
  slug: string
  frontmatter: EssayFrontmatter
  content: string
  readingTime: {
    text: string
    minutes: number
    time: number
    words: number
  }
}

export interface EssayWithoutContent extends Omit<Essay, 'content'> {}

export interface SocialLinks {
  twitter?: string
  linkedin?: string
  github?: string
  email?: string
}

export interface SiteConfig {
  name: string
  author: string
  description: string
  url: string
  social: SocialLinks
}
