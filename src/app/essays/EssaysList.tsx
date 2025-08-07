'use client'

import { useState, useMemo } from 'react'
import { EssayCard } from '@/components/EssayCard'
import { TagFilter } from '@/components/TagFilter'
import type { EssayWithoutContent } from '@/types/essay'

interface EssaysListProps {
  essays: EssayWithoutContent[]
  allTags: string[]
}

export function EssaysList({ essays, allTags }: EssaysListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

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
      />

      <div className="mb-6">
        <p className="text-sm text-dark-muted">
          {selectedTag
            ? `${essayCount} essay${essayCount !== 1 ? 's' : ''} tagged with "${selectedTag}"`
            : `${totalCount} total essay${totalCount !== 1 ? 's' : ''}`}
        </p>
      </div>

      {filteredEssays.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-dark-text">
            {selectedTag
              ? `No essays found with the tag "${selectedTag}".`
              : 'No essays published yet.'}
          </p>
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="mt-4 text-primary-500 hover:text-primary-400"
            >
              Show all essays
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {filteredEssays.map((essay) => (
            <EssayCard key={essay.slug} essay={essay} />
          ))}
        </div>
      )}
    </div>
  )
}
