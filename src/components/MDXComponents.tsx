import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

interface CustomImageProps {
  src?: string
  alt?: string
  width?: number
  height?: number
  [key: string]: any
}

function CustomImage({ src, alt, width, height, ...props }: CustomImageProps) {
  if (!src || !alt) return <img src={src} alt={alt} {...props} />

  return (
    <div className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width || 800}
        height={height || 400}
        className="rounded-lg border-theme"
        style={{ width: '100%', height: 'auto' }}
        {...props}
      />
    </div>
  )
}

function CustomLink({
  href,
  children,
  ...props
}: {
  href?: string
  children?: ReactNode
  [key: string]: any
}) {
  if (!href) return <a {...props}>{children}</a>

  const isExternal = href.startsWith('http')

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-500 underline underline-offset-2 hover:text-primary-400"
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className="text-primary-500 underline underline-offset-2 hover:text-primary-400"
      {...props}
    >
      {children}
    </Link>
  )
}

function CustomBlockquote({
  children,
  ...props
}: {
  children?: ReactNode
  [key: string]: any
}) {
  return (
    <blockquote
      className="my-6 border-l-4 border-primary-500 bg-theme-card py-4 pl-6 italic text-theme-secondary"
      {...props}
    >
      {children}
    </blockquote>
  )
}

function CustomCode({
  children,
  ...props
}: {
  children?: ReactNode
  [key: string]: any
}) {
  return (
    <code
      className="rounded bg-theme-card px-1.5 py-0.5 font-mono text-sm text-primary-400"
      {...props}
    >
      {children}
    </code>
  )
}

function CustomPre({
  children,
  ...props
}: {
  children?: ReactNode
  [key: string]: any
}) {
  return (
    <pre
      className="my-6 overflow-x-auto rounded-lg border-theme bg-theme-card p-4"
      {...props}
    >
      {children}
    </pre>
  )
}

export const MDXComponents = {
  img: CustomImage,
  Image: CustomImage,
  a: CustomLink,
  Link: CustomLink,
  blockquote: CustomBlockquote,
  code: CustomCode,
  pre: CustomPre,
  h1: ({
    children,
    ...props
  }: {
    children?: ReactNode
    [key: string]: any
  }) => (
    <h1
      className="mb-6 mt-8 text-3xl font-bold text-theme-primary sm:text-4xl"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({
    children,
    ...props
  }: {
    children?: ReactNode
    [key: string]: any
  }) => (
    <h2
      className="mb-4 mt-8 text-2xl font-semibold text-theme-primary sm:text-3xl"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({
    children,
    ...props
  }: {
    children?: ReactNode
    [key: string]: any
  }) => (
    <h3
      className="mb-3 mt-6 text-xl font-semibold text-theme-primary sm:text-2xl"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }: { children?: ReactNode; [key: string]: any }) => (
    <p className="mb-6 leading-relaxed text-theme-secondary" {...props}>
      {children}
    </p>
  ),
  ul: ({
    children,
    ...props
  }: {
    children?: ReactNode
    [key: string]: any
  }) => (
    <ul
      className="mb-6 list-inside list-disc space-y-2 text-theme-secondary"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({
    children,
    ...props
  }: {
    children?: ReactNode
    [key: string]: any
  }) => (
    <ol
      className="mb-6 list-inside list-decimal space-y-2 text-theme-secondary"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({
    children,
    ...props
  }: {
    children?: ReactNode
    [key: string]: any
  }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
}
