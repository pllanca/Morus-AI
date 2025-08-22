import Link from 'next/link'
import { format } from 'date-fns'
import type { EssayWithoutContent } from '@/types/essay'
import type { Locale } from '@/lib/translations'

interface EssayCardProps {
  essay: EssayWithoutContent
  featured?: boolean
  locale?: Locale
}

export function EssayCard({ essay, featured = false, locale = 'en' }: EssayCardProps) {
  return (
    <article className="group">
      <Link href={locale === 'es' ? `/es/essays/${essay.slug}` : `/essays/${essay.slug}`} className="block touch-target">
        <div className="space-y-2 sm:space-y-3 p-4 sm:p-6 md:p-8 rounded-lg border border-theme bg-theme-card transition-all duration-200 group-hover:shadow-md group-hover:border-opacity-80">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm text-theme-muted">
            <time dateTime={essay.frontmatter.date}>
              {format(new Date(essay.frontmatter.date), 'MMMM d, yyyy')}
            </time>
            <span className="hidden sm:inline">•</span>
            <span>
              {essay.frontmatter.readingTime || essay.readingTime.text}
            </span>
          </div>

          <h2
            className={`font-semibold text-theme-primary transition-colors group-hover:text-primary-500 ${
              featured ? 'text-card-title sm:text-2xl md:text-3xl' : 'text-card-title'
            }`}
          >
            {essay.frontmatter.title}
          </h2>

          {essay.frontmatter.summary && (
            <p
              className={`leading-relaxed text-theme-secondary ${
                featured ? 'text-card-content sm:text-base md:text-lg' : 'text-card-content'
              }`}
            >
              {essay.frontmatter.summary}
            </p>
          )}

          {essay.frontmatter.tags && essay.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
              {essay.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-theme bg-theme-card px-2 py-1 text-xs text-theme-secondary"
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
