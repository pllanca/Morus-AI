import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container py-20 text-center">
      <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
        404 - Page Not Found
      </h1>
      <p className="mx-auto mb-8 max-w-2xl text-xl text-dark-text">
        The page you're looking for doesn't exist. It may have been moved or
        deleted.
      </p>
      <div className="space-y-4 sm:flex sm:justify-center sm:space-x-4 sm:space-y-0">
        <Link href="/" className="btn-primary">
          Go Home
        </Link>
        <Link href="/essays" className="btn-secondary">
          Browse Essays
        </Link>
      </div>
    </div>
  )
}
