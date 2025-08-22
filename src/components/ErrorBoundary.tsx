'use client'

import React, { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  showDetails?: boolean
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: string
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service in production
    console.error('Error Boundary caught an error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    })

    this.setState({
      error,
      errorInfo: errorInfo.componentStack || '',
    })

    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { contexts: { react: errorInfo } })
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-[300px] flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="mb-4 flex justify-center">
              <AlertTriangle className="h-12 w-12 text-orange-500" />
            </div>
            
            <h2 className="text-xl font-semibold text-theme-primary mb-2">
              Something went wrong
            </h2>
            
            <p className="text-theme-secondary mb-6">
              We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
            </p>

            <button
              onClick={this.handleRetry}
              className="inline-flex items-center gap-2 btn-primary"
            >
              <RefreshCw className="h-4 w-4" />
              Try again
            </button>

            {this.props.showDetails && process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-theme-muted hover:text-theme-secondary">
                  Show error details (Development)
                </summary>
                <div className="mt-2 p-4 bg-theme-card border border-theme rounded-md">
                  <pre className="text-xs text-red-400 whitespace-pre-wrap overflow-x-auto">
                    {this.state.error?.message}
                    {this.state.error?.stack}
                    {this.state.errorInfo}
                  </pre>
                </div>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Simple error boundary wrapper for components
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundaryComponent(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
}

// Hook for functional components to throw errors to boundary
export function useErrorHandler() {
  return (error: Error, errorInfo?: string) => {
    console.error('Error caught by useErrorHandler:', error)
    throw error
  }
}