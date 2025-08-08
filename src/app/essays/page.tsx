import { Metadata } from 'next'
import { getAllEssays, getAllTags } from '@/lib/essays'
import { siteConfig } from '@/lib/config'
import { EssaysList } from './EssaysList'

export const metadata: Metadata = {
  title: 'Essays',
  description: `All essays by ${siteConfig.author}. Explore thoughts on technology, philosophy, and life.`,
  openGraph: {
    title: `Essays | ${siteConfig.name}`,
    description: `All essays by ${siteConfig.author}. Explore thoughts on technology, philosophy, and life.`,
    url: `${siteConfig.url}/essays`,
  },
  twitter: {
    title: `Essays | ${siteConfig.name}`,
    description: `All essays by ${siteConfig.author}. Explore thoughts on technology, philosophy, and life.`,
  },
}

export default async function EssaysPage() {
  const [essays, allTags] = await Promise.all([getAllEssays(), getAllTags()])

  return (
    <div className="container py-12 sm:py-16">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
          All Essays
        </h1>
        <p className="max-w-2xl text-xl leading-relaxed text-dark-text">
          A collection of my thoughts, ideas, and reflections on the world
          around us. Each piece is crafted with care and intended to spark
          thoughtful conversation.
        </p>
      </div>

      <EssaysList essays={essays} allTags={allTags} locale="en" />
    </div>
  )
}
