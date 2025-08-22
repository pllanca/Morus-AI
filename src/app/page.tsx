import Link from 'next/link'
import { getAllEssays, getFeaturedEssays } from '@/lib/essays'
import { siteConfig } from '@/lib/config'
import { getTranslations, Locale } from '@/lib/translations'
import { EssayCard } from '@/components/EssayCard'
import { NewsletterSignup } from '@/components/NewsletterSignup'

interface HomePageProps {
  params: {
    locale?: string
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const locale = (params?.locale as Locale) || 'en'
  const t = getTranslations(locale)
  
  const [featuredEssays, allEssays] = await Promise.all([
    getFeaturedEssays(locale),
    getAllEssays(locale),
  ])

  const recentEssays = allEssays.slice(0, 3)
  const essaysToShow = featuredEssays.length > 0 ? featuredEssays : recentEssays

  return (
    <div className="container py-mobile">
      {/* Hero Section */}
      <section className="mb-mobile text-center">
        <h1 className="mb-4 sm:mb-6 text-balance text-hero font-bold text-theme-primary">
          {t.home.heroTitle.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="text-primary-500">
            {t.home.heroTitle.split(' ').slice(-1)}
          </span>
        </h1>
        <p className="mx-auto max-w-3xl text-balance text-hero-subtitle leading-relaxed text-theme-secondary">
          {t.home.heroSubtitle}
        </p>
      </section>

      {/* Featured Essays */}
      {essaysToShow.length > 0 && (
        <section className="mb-mobile">
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-section-title font-semibold text-theme-primary">
              {featuredEssays.length > 0 ? t.home.featuredEssays : t.home.recentEssays}
            </h2>
            <Link
              href={locale === 'es' ? '/es/essays' : '/essays'}
              className="text-sm font-medium text-primary-500 hover:text-primary-400 sm:text-base self-start sm:self-auto"
            >
              {t.home.viewAllEssays}
            </Link>
          </div>

          <div className="space-mobile">
            {essaysToShow.map((essay, index) => (
              <EssayCard
                key={essay.slug}
                essay={essay}
                featured={index === 0}
                locale={locale}
              />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="card-mobile text-center">
        <h2 className="mb-4 text-section-title font-semibold text-theme-primary">
          {t.home.stayInLoop}
        </h2>
        <p className="mx-auto mb-6 sm:mb-8 max-w-2xl text-card-content leading-relaxed text-theme-secondary">
          {t.home.stayInLoopText}
        </p>
        <div className="mx-auto max-w-md">
          <NewsletterSignup
            placeholder={t.newsletter.placeholder}
            buttonText={t.newsletter.subscribe}
          />
        </div>
      </section>

      {/* About Teaser */}
      <section className="mt-12 sm:mt-16 md:mt-20 text-center">
        <h3 className="mb-4 text-card-title font-semibold text-theme-primary">
          {t.home.aboutAuthor}
        </h3>
        <p className="mx-auto mb-6 max-w-2xl leading-relaxed text-card-content text-theme-secondary">
          {t.home.aboutText}
        </p>
        <Link href={locale === 'es' ? '/es/about' : '/about'} className="btn-mobile btn-primary">
          {t.home.learnMore}
        </Link>
      </section>
    </div>
  )
}
