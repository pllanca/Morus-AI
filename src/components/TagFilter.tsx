'use client'

import { cn } from '@/lib/utils'
import { useTranslations, Locale } from '@/lib/translations'

interface TagFilterProps {
  tags: string[]
  selectedTag: string | null
  onTagSelect: (tag: string | null) => void
  locale?: Locale
}

export function TagFilter({ tags, selectedTag, onTagSelect, locale = 'en' }: TagFilterProps) {
  const t = useTranslations(locale)
  if (tags.length === 0) return null

  return (
    <div className="mb-8">
      <h3 className="mb-4 text-sm font-medium text-dark-text">
        {t.essays.filterByTopic}
      </h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTagSelect(null)}
          className={cn(
            'rounded-full border px-3 py-1.5 text-sm transition-all duration-200',
            selectedTag === null
              ? 'border-primary-500 bg-primary-500 text-white'
              : 'border-dark-border bg-dark-card text-dark-text hover:border-primary-500 hover:text-primary-500'
          )}
        >
          {t.essays.allEssays}
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-sm transition-all duration-200',
              selectedTag === tag
                ? 'border-primary-500 bg-primary-500 text-white'
                : 'border-dark-border bg-dark-card text-dark-text hover:border-primary-500 hover:text-primary-500'
            )}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}
