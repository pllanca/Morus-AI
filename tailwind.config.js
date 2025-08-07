/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf4f2',
          100: '#fce7e1',
          200: '#f9d3c8',
          300: '#f4b5a3',
          400: '#ec8b6e',
          500: '#da7756', // Main accent color from claudelog.com
          600: '#c8603f',
          700: '#a64f34',
          800: '#88432f',
          900: '#713a2b',
          950: '#3d1d14',
        },
        dark: {
          bg: '#262624', // Main background from claudelog.com
          card: '#2a2a28',
          border: '#333331',
          text: '#bfbfbc', // Main text color from claudelog.com
          muted: '#8a8a87',
        },
      },
      fontFamily: {
        sans: [
          'TWKLausanne',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'system-ui',
          'sans-serif',
        ],
        mono: ['SF Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      maxWidth: {
        '70ch': '70ch',
        '65ch': '65ch',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '70ch',
            color: theme('colors.dark.text'),
            fontSize: '1.125rem',
            lineHeight: '1.75',
            fontFamily: theme('fontFamily.sans').join(', '),
            h1: {
              color: theme('colors.white'),
              fontSize: '2.5rem',
              fontWeight: '700',
              lineHeight: '1.2',
              marginBottom: '1.5rem',
            },
            h2: {
              color: theme('colors.white'),
              fontSize: '2rem',
              fontWeight: '600',
              lineHeight: '1.3',
              marginTop: '3rem',
              marginBottom: '1.5rem',
            },
            h3: {
              color: theme('colors.white'),
              fontSize: '1.5rem',
              fontWeight: '600',
              lineHeight: '1.4',
              marginTop: '2.5rem',
              marginBottom: '1rem',
            },
            p: {
              marginBottom: '1.5rem',
            },
            a: {
              color: theme('colors.primary.500'),
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: theme('colors.primary.400'),
                textDecoration: 'underline',
              },
            },
            strong: {
              color: theme('colors.white'),
              fontWeight: '600',
            },
            blockquote: {
              borderLeftColor: theme('colors.primary.500'),
              color: theme('colors.dark.text'),
              fontStyle: 'italic',
              backgroundColor: theme('colors.dark.card'),
              padding: '1.5rem',
              borderRadius: '0.5rem',
            },
            code: {
              backgroundColor: theme('colors.dark.card'),
              color: theme('colors.primary.400'),
              fontWeight: '500',
              fontSize: '0.875rem',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              '&::before': { content: '""' },
              '&::after': { content: '""' },
            },
            pre: {
              backgroundColor: theme('colors.dark.card'),
              border: `1px solid ${theme('colors.dark.border')}`,
              borderRadius: '0.5rem',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: 0,
              color: theme('colors.dark.text'),
            },
            ul: {
              listStyleType: 'disc',
              paddingLeft: '1.5rem',
            },
            ol: {
              listStyleType: 'decimal',
              paddingLeft: '1.5rem',
            },
            li: {
              marginBottom: '0.5rem',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
