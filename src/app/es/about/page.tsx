import { Metadata } from 'next'
import { siteConfig } from '@/lib/config'
import { getTranslations } from '@/lib/translations'
import { NewsletterSignup } from '@/components/NewsletterSignup'

export const metadata: Metadata = {
  title: 'Acerca de',
  description: `Conoce más sobre ${siteConfig.author} y la inspiración detrás de estos ensayos.`,
  openGraph: {
    title: `Acerca de | ${siteConfig.name}`,
    description: `Conoce más sobre ${siteConfig.author} y la inspiración detrás de estos ensayos.`,
    url: `${siteConfig.url}/es/about`,
    locale: 'es_ES',
  },
  twitter: {
    title: `Acerca de | ${siteConfig.name}`,
    description: `Conoce más sobre ${siteConfig.author} y la inspiración detrás de estos ensayos.`,
  },
}

export default function SpanishAboutPage() {
  const locale = 'es'
  const t = getTranslations(locale)
  const socialLinks = Object.entries(siteConfig.social).filter(([, url]) => url)

  return (
    <div className="container py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 grid gap-12 lg:grid-cols-3">
          {/* Author Photo */}
          <div className="lg:col-span-1">
            <div className="aspect-square overflow-hidden rounded-xl border border-dark-border bg-dark-card">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-500/20 to-primary-600/20">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-500/30">
                  <span className="text-4xl text-primary-300">
                    {siteConfig.author.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Content */}
          <div className="space-y-6 lg:col-span-2">
            <div>
              <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
                {t.about.title}
              </h1>
              <p className="text-xl leading-relaxed text-dark-text">
                {t.about.subtitle}
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="mb-6 leading-relaxed text-dark-text">
                {t.about.bio1}
              </p>

              <p className="mb-6 leading-relaxed text-dark-text">
                {t.about.bio2}
              </p>

              <p className="mb-6 leading-relaxed text-dark-text">
                {t.about.bio3}
              </p>
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="pt-6">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  {t.about.connectWith}
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
                      {platform === 'email' ? t.footer.contact : platform}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="rounded-xl border border-dark-border bg-dark-card p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-semibold text-white sm:text-3xl">
            {t.about.stayConnected}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-dark-text">
            {t.about.stayConnectedText}
          </p>
          <div className="mx-auto max-w-md">
            <NewsletterSignup locale={locale} />
          </div>
        </div>

        {/* Philosophy/Approach */}
        <div className="mt-16">
          <h2 className="mb-8 text-center text-2xl font-semibold text-white sm:text-3xl">
            {t.about.philosophy}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500/20">
                <span className="text-2xl">💭</span>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-white">
                {t.about.thoughtful}
              </h3>
              <p className="text-dark-text">
                {t.about.thoughtfulText}
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500/20">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-white">{t.about.focused}</h3>
              <p className="text-dark-text">
                {t.about.focusedText}
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500/20">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-white">{t.about.growing}</h3>
              <p className="text-dark-text">
                {t.about.growingText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}