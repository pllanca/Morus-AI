'use client'

import { useState, useMemo } from 'react'
import { EssayCard } from '@/components/EssayCard'
import { TagFilter } from '@/components/TagFilter'
import { useTranslations, Locale } from '@/lib/translations'
import type { EssayWithoutContent } from '@/types/essay'

interface EssaysListProps {
  essays: EssayWithoutContent[]
  allTags: string[]
  locale?: Locale
}

export function EssaysList({ essays, allTags, locale = 'en' }: EssaysListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const t = useTranslations(locale)

  const filteredEssays = useMemo(() => {
    if (!selectedTag) return essays
    return essays.filter((essay) =>
      essay.frontmatter.tags.some(
        (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
      )
    )
  }, [essays, selectedTag])

  const essayCount = filteredEssays.length
  const totalCount = essays.length

  return (
    <div>
      <TagFilter
        tags={allTags}
        selectedTag={selectedTag}
        onTagSelect={setSelectedTag}
        locale={locale}
      />

      <div className="mb-6">
        <p className="text-sm text-dark-muted">
          {selectedTag
            ? `${essayCount} ${t.essays.essaysTaggedWith} "${selectedTag}"`
            : `${totalCount} ${t.essays.totalEssays}${totalCount !== 1 ? 's' : ''}`}
        </p>
      </div>

      {filteredEssays.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-dark-text">
            {selectedTag
              ? `${t.essays.noEssaysFound} "${selectedTag}".`
              : 'No essays published yet.'}
          </p>
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="mt-4 text-primary-500 hover:text-primary-400"
            >
              {t.essays.showAllEssays}
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {filteredEssays.map((essay) => (
            <EssayCard key={essay.slug} essay={essay} locale={locale} />
          ))}
        </div>
      )}
    </div>
  )
}
