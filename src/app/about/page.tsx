import { Metadata } from 'next'
import Image from 'next/image'
import { siteConfig } from '@/lib/config'
import { NewsletterSignup } from '@/components/NewsletterSignup'

export const metadata: Metadata = {
  title: 'About',
  description: `Learn more about ${siteConfig.author} and the inspiration behind these essays.`,
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description: `Learn more about ${siteConfig.author} and the inspiration behind these essays.`,
    url: `${siteConfig.url}/about`,
  },
  twitter: {
    title: `About | ${siteConfig.name}`,
    description: `Learn more about ${siteConfig.author} and the inspiration behind these essays.`,
  },
}

export default function AboutPage() {
  const socialLinks = Object.entries(siteConfig.social).filter(([, url]) => url)

  return (
    <div className="container py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 grid gap-12 lg:grid-cols-3">
          {/* Author Photo */}
          <div className="lg:col-span-1">
            <div className="aspect-square overflow-hidden rounded-xl border border-theme bg-theme-card">
              {/* Placeholder for author photo - replace with actual image */}
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-500/20 to-primary-600/20">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-500/30">
                  <span className="text-4xl text-primary-300">
                    {siteConfig.author.charAt(0)}
                  </span>
                </div>
              </div>
              {/* Uncomment and update when you have an actual photo:
              <Image
                src="/images/author-photo.jpg"
                alt={siteConfig.author}
                width={400}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
              */}
            </div>
          </div>

          {/* Bio Content */}
          <div className="space-y-6 lg:col-span-2">
            <div>
              <h1 className="mb-4 text-4xl font-bold text-theme-primary sm:text-5xl">
                About {siteConfig.author}
              </h1>
              <p className="text-xl leading-relaxed text-theme-secondary">
                Writer, thinker, and explorer of ideas at the intersection of
                technology and humanity.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="mb-6 leading-relaxed text-theme-secondary">
                Hello! I'm {siteConfig.author}, and I'm passionate about
                exploring complex ideas through clear, thoughtful writing. My
                work spans technology, philosophy, and the human experience,
                always seeking to find clarity in complexity and meaning in the
                everyday.
              </p>

              <p className="mb-6 leading-relaxed text-theme-secondary">
                I believe that writing is thinking made visible. Each essay is
                an opportunity to wrestle with questions that matter, to
                challenge assumptions, and to share the insights that emerge
                from deep reflection. Whether I'm examining the latest
                technological trends, philosophical puzzles, or personal
                experiences, my goal is always the same: to write something
                worth reading.
              </p>

              <p className="mb-6 leading-relaxed text-theme-secondary">
                When I'm not writing, you can find me reading voraciously,
                taking long walks to think through ideas, and having
                conversations with curious people who share my love of learning
                and discovery.
              </p>
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="pt-6">
                <h3 className="mb-4 text-lg font-semibold text-theme-primary">
                  Connect with me
                </h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary capitalize"
                    >
                      {platform === 'email' ? 'Contact' : platform}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="rounded-xl border border-theme bg-theme-card p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-semibold text-theme-primary sm:text-3xl">
            Let's stay connected
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-theme-secondary">
            I send occasional essays to a small group of thoughtful readers. No
            spam, no sales pitches— just ideas worth sharing when they're ready.
          </p>
          <div className="mx-auto max-w-md">
            <NewsletterSignup
              placeholder="your@email.com"
              buttonText="Subscribe"
            />
          </div>
        </div>

        {/* Philosophy/Approach */}
        <div className="mt-16">
          <h2 className="mb-8 text-center text-2xl font-semibold text-theme-primary sm:text-3xl">
            My Writing Philosophy
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500/20">
                <span className="text-2xl">💭</span>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-theme-primary">
                Thoughtful
              </h3>
              <p className="text-theme-secondary">
                Every essay is carefully crafted, with ideas developed through
                research, reflection, and genuine curiosity.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500/20">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-theme-primary">Focused</h3>
              <p className="text-theme-secondary">
                Clear ideas, clearly expressed. I believe in the power of
                precision and the beauty of well-chosen words.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500/20">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-theme-primary">Growing</h3>
              <p className="text-theme-secondary">
                Writing is learning in public. I share what I'm discovering as I
                discover it, embracing growth and change.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
