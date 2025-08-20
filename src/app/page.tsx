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
    <div className="container py-12 sm:py-16 lg:py-20">
      {/* Hero Section */}
      <section className="mb-16 text-center sm:mb-20">
        <h1 className="mb-6 text-balance text-4xl font-bold text-theme-primary sm:text-5xl lg:text-6xl">
          {t.home.heroTitle.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="text-primary-500">
            {t.home.heroTitle.split(' ').slice(-1)}
          </span>
        </h1>
        <p className="mx-auto max-w-3xl text-balance text-xl leading-relaxed text-theme-secondary sm:text-2xl">
          {t.home.heroSubtitle}
        </p>
      </section>

      {/* Featured Essays */}
      {essaysToShow.length > 0 && (
        <section className="mb-16 sm:mb-20">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-theme-primary sm:text-3xl">
              {featuredEssays.length > 0 ? t.home.featuredEssays : t.home.recentEssays}
            </h2>
            <Link
              href={locale === 'es' ? '/es/essays' : '/essays'}
              className="text-sm font-medium text-primary-500 hover:text-primary-400 sm:text-base"
            >
              {t.home.viewAllEssays}
            </Link>
          </div>

          <div className="space-y-8">
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
      <section className="rounded-xl border border-theme bg-theme-card p-8 text-center sm:p-12">
        <h2 className="mb-4 text-2xl font-semibold text-theme-primary sm:text-3xl">
          {t.home.stayInLoop}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-theme-secondary">
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
      <section className="mt-16 text-center sm:mt-20">
        <h3 className="mb-4 text-xl font-semibold text-theme-primary sm:text-2xl">
          {t.home.aboutAuthor}
        </h3>
        <p className="mx-auto mb-6 max-w-2xl leading-relaxed text-theme-secondary">
          {t.home.aboutText}
        </p>
        <Link href={locale === 'es' ? '/es/about' : '/about'} className="btn-primary">
          {t.home.learnMore}
        </Link>
      </section>
    </div>
  )
}
