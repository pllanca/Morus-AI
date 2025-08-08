import type { SiteConfig } from '@/types/essay'

export const siteConfig: SiteConfig = {
  name: process.env.SITE_NAME || 'Pedro LLanca',
  author: process.env.AUTHOR_NAME || 'Pedro LLanca',
  description: 'Exploring ideas through thoughtful essays and personal reflections.',
  url: process.env.SITE_URL || 'https://your-domain.com',
  social: {
    twitter: process.env.TWITTER_URL,
    linkedin: process.env.LINKEDIN_URL,
    github: process.env.GITHUB_URL,
    email: process.env.AUTHOR_EMAIL,
  },
}

export const newsletterConfig = {
  // Mailchimp configuration
  mailchimp: {
    apiKey: process.env.MAILCHIMP_API_KEY,
    audienceId: process.env.MAILCHIMP_AUDIENCE_ID,
  },
  // ConvertKit configuration
  convertkit: {
    apiKey: process.env.CONVERTKIT_API_KEY,
    formId: process.env.CONVERTKIT_FORM_ID,
  },
  // Substack configuration
  substack: {
    url: process.env.SUBSTACK_URL,
  },
}