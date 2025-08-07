import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { siteConfig } from '@/lib/config'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || siteConfig.name
    const description = searchParams.get('description')

    return new ImageResponse(
      (
        <div
          style={{
            background: '#262624',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, sans-serif',
            padding: '60px',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `radial-gradient(circle at 25px 25px, rgba(218, 119, 86, 0.1) 2%, transparent 0%), 
                               radial-gradient(circle at 75px 75px, rgba(218, 119, 86, 0.05) 2%, transparent 0%)`,
              backgroundSize: '100px 100px',
            }}
          />

          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              zIndex: 1,
              maxWidth: '900px',
            }}
          >
            {/* Site Name */}
            <div
              style={{
                fontSize: '32px',
                fontWeight: '600',
                color: '#da7756',
                marginBottom: '40px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              {siteConfig.name}
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: title.length > 60 ? '48px' : '64px',
                fontWeight: '700',
                color: '#ffffff',
                lineHeight: '1.2',
                marginBottom: description ? '30px' : '0',
                textAlign: 'center',
              }}
            >
              {title}
            </div>

            {/* Description */}
            {description && (
              <div
                style={{
                  fontSize: '28px',
                  color: '#bfbfbc',
                  lineHeight: '1.4',
                  textAlign: 'center',
                  maxWidth: '800px',
                }}
              >
                {description}
              </div>
            )}
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '8px',
              background: '#da7756',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    return new Response('Failed to generate image', { status: 500 })
  }
}
