import Link from 'next/link'
import { format } from 'date-fns'
import type { EssayWithoutContent } from '@/types/essay'

interface EssayCardProps {
  essay: EssayWithoutContent
  featured?: boolean
}

export function EssayCard({ essay, featured = false }: EssayCardProps) {
  return (
    <article className={`group ${featured ? 'mb-8' : 'mb-6'}`}>
      <Link href={`/essays/${essay.slug}`} className="block">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-dark-muted">
            <time dateTime={essay.frontmatter.date}>
              {format(new Date(essay.frontmatter.date), 'MMMM d, yyyy')}
            </time>
            <span>•</span>
            <span>
              {essay.frontmatter.readingTime || essay.readingTime.text}
            </span>
          </div>

          <h2
            className={`font-semibold text-white transition-colors group-hover:text-primary-500 ${
              featured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
            }`}
          >
            {essay.frontmatter.title}
          </h2>

          {essay.frontmatter.summary && (
            <p
              className={`leading-relaxed text-dark-text ${
                featured ? 'text-lg' : 'text-base'
              }`}
            >
              {essay.frontmatter.summary}
            </p>
          )}

          {essay.frontmatter.tags && essay.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {essay.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-dark-border bg-dark-card px-2 py-1 text-xs text-dark-text"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}
