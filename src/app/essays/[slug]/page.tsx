import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import { getEssayBySlug, getEssaySlugs, formatDate } from '@/lib/essays'
import { siteConfig } from '@/lib/config'
import { getBaseUrl, generateOgImageUrl } from '@/lib/utils'
import { MDXComponents } from '@/components/MDXComponents'
import { SocialShare } from '@/components/SocialShare'
import { NewsletterSignup } from '@/components/NewsletterSignup'

interface EssayPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = await getEssaySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: EssayPageProps): Promise<Metadata> {
  const essay = await getEssayBySlug(params.slug)

  if (!essay) {
    return {
      title: 'Essay Not Found',
    }
  }

  const url = `${getBaseUrl()}/essays/${params.slug}`
  const ogImage = generateOgImageUrl(
    essay.frontmatter.title,
    essay.frontmatter.summary
  )

  return {
    title: essay.frontmatter.title,
    description: essay.frontmatter.summary,
    authors: [{ name: essay.frontmatter.author || siteConfig.author }],
    openGraph: {
      title: essay.frontmatter.title,
      description: essay.frontmatter.summary,
      type: 'article',
      publishedTime: essay.frontmatter.date,
      authors: [essay.frontmatter.author || siteConfig.author],
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: essay.frontmatter.title,
        },
      ],
    },
    twitter: {
      title: essay.frontmatter.title,
      description: essay.frontmatter.summary,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function EssayPage({ params }: EssayPageProps) {
  const essay = await getEssayBySlug(params.slug)

  if (!essay) {
    notFound()
  }

  const essayUrl = `${getBaseUrl()}/essays/${params.slug}`

  return (
    <article className="container py-12 sm:py-16">
      {/* Essay Header */}
      <header className="mx-auto mb-12 max-w-4xl">
        <div className="mb-6">
          {essay.frontmatter.tags && essay.frontmatter.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {essay.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-dark-border bg-dark-card px-2 py-1 text-xs text-dark-text"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="mb-6 text-balance text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {essay.frontmatter.title}
          </h1>

          {essay.frontmatter.summary && (
            <p className="text-balance text-xl leading-relaxed text-dark-text sm:text-2xl">
              {essay.frontmatter.summary}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4 border-b border-t border-dark-border py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4 text-sm text-dark-muted">
            <span>By {essay.frontmatter.author || siteConfig.author}</span>
            <span>•</span>
            <time dateTime={essay.frontmatter.date}>
              {formatDate(essay.frontmatter.date)}
            </time>
            <span>•</span>
            <span>{essay.readingTime.text}</span>
          </div>

          <SocialShare
            title={essay.frontmatter.title}
            url={essayUrl}
            description={essay.frontmatter.summary}
          />
        </div>
      </header>

      {/* Essay Content */}
      <div className="mx-auto max-w-none">
        <div className="essay-content mx-auto max-w-70ch">
          <MDXRemote
            source={essay.content}
            components={MDXComponents as any}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeHighlight, rehypeSlug],
              },
            }}
          />
        </div>

        {/* Author Bio & Newsletter CTA */}
        <div className="mx-auto mt-16 max-w-70ch border-t border-dark-border pt-16">
          <div className="rounded-xl border border-dark-border bg-dark-card p-8">
            <div className="text-center">
              <h3 className="mb-4 text-xl font-semibold text-white">
                Thanks for reading!
              </h3>
              <p className="mb-6 leading-relaxed text-dark-text">
                I'm {siteConfig.author}, and I write about the intersection of
                technology, philosophy, and human experience. If you enjoyed
                this essay, you might like my other work.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="mb-4 text-sm text-dark-muted">
                    Get notified when I publish new essays:
                  </p>
                  <NewsletterSignup
                    placeholder="your@email.com"
                    buttonText="Subscribe"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: essay.frontmatter.title,
              description: essay.frontmatter.summary,
              image: generateOgImageUrl(
                essay.frontmatter.title,
                essay.frontmatter.summary
              ),
              datePublished: essay.frontmatter.date,
              dateModified: essay.frontmatter.date,
              author: {
                '@type': 'Person',
                name: essay.frontmatter.author || siteConfig.author,
              },
              publisher: {
                '@type': 'Person',
                name: siteConfig.author,
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': essayUrl,
              },
            }),
          }}
        />
      </div>
    </article>
  )
}
