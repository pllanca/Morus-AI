import Link from 'next/link'
import { getAllEssays, getFeaturedEssays } from '@/lib/essays'
import { siteConfig } from '@/lib/config'
import { EssayCard } from '@/components/EssayCard'
import { NewsletterSignup } from '@/components/NewsletterSignup'

export default async function HomePage() {
  const [featuredEssays, allEssays] = await Promise.all([
    getFeaturedEssays(),
    getAllEssays(),
  ])

  const recentEssays = allEssays.slice(0, 3)
  const essaysToShow = featuredEssays.length > 0 ? featuredEssays : recentEssays

  return (
    <div className="container py-12 sm:py-16 lg:py-20">
      {/* Hero Section */}
      <section className="mb-16 text-center sm:mb-20">
        <h1 className="mb-6 text-balance text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
          Exploring Ideas Through{' '}
          <span className="text-primary-500">Writing</span>
        </h1>
        <p className="mx-auto max-w-3xl text-balance text-xl leading-relaxed text-dark-text sm:text-2xl">
          Welcome to my digital space where I share thoughtful essays on
          technology, philosophy, and the intersection of ideas that shape our
          world.
        </p>
      </section>

      {/* Featured Essays */}
      {essaysToShow.length > 0 && (
        <section className="mb-16 sm:mb-20">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              {featuredEssays.length > 0 ? 'Featured Essays' : 'Recent Essays'}
            </h2>
            <Link
              href="/essays"
              className="text-sm font-medium text-primary-500 hover:text-primary-400 sm:text-base"
            >
              View all essays →
            </Link>
          </div>

          <div className="space-y-8">
            {essaysToShow.map((essay, index) => (
              <EssayCard
                key={essay.slug}
                essay={essay}
                featured={index === 0}
              />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="rounded-xl border border-dark-border bg-dark-card p-8 text-center sm:p-12">
        <h2 className="mb-4 text-2xl font-semibold text-white sm:text-3xl">
          Stay in the Loop
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-dark-text">
          Get notified when I publish new essays. Join a growing community of
          thoughtful readers.
        </p>
        <div className="mx-auto max-w-md">
          <NewsletterSignup
            placeholder="your@email.com"
            buttonText="Subscribe"
          />
        </div>
      </section>

      {/* About Teaser */}
      <section className="mt-16 text-center sm:mt-20">
        <h3 className="mb-4 text-xl font-semibold text-white sm:text-2xl">
          About {siteConfig.author}
        </h3>
        <p className="mx-auto mb-6 max-w-2xl leading-relaxed text-dark-text">
          I&apos;m a writer and thinker passionate about exploring complex ideas
          through clear, accessible prose. My work spans technology, philosophy,
          and the human experience.
        </p>
        <Link href="/about" className="btn-primary">
          Learn more about me
        </Link>
      </section>
    </div>
  )
}
