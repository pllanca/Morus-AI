import { Metadata } from 'next'
import { getAllEssays, getAllTags } from '@/lib/essays'
import { siteConfig } from '@/lib/config'
import { getTranslations } from '@/lib/translations'
import { EssaysList } from '../../essays/EssaysList'

export const metadata: Metadata = {
  title: 'Ensayos',
  description: `Todos los ensayos de ${siteConfig.author}. Explora pensamientos sobre tecnología, filosofía, y vida.`,
  openGraph: {
    title: `Ensayos | ${siteConfig.name}`,
    description: `Todos los ensayos de ${siteConfig.author}. Explora pensamientos sobre tecnología, filosofía, y vida.`,
    url: `${siteConfig.url}/es/essays`,
    locale: 'es_ES',
  },
  twitter: {
    title: `Ensayos | ${siteConfig.name}`,
    description: `Todos los ensayos de ${siteConfig.author}. Explora pensamientos sobre tecnología, filosofía, y vida.`,
  },
}

export default async function SpanishEssaysPage() {
  const locale = 'es'
  const t = getTranslations(locale)
  const [essays, allTags] = await Promise.all([getAllEssays(locale), getAllTags(locale)])

  return (
    <div className="container py-12 sm:py-16">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
          {t.essays.title}
        </h1>
        <p className="max-w-2xl text-xl leading-relaxed text-dark-text">
          {t.essays.description}
        </p>
      </div>

      <EssaysList essays={essays} allTags={allTags} locale={locale} />
    </div>
  )
}