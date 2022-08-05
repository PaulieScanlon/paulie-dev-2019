module.exports = {
  content: [
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/templates/**/*.{js,jsx,ts,tsx}'
  ],
  safelist: [
    '!mb-0', // This is used by the h1 in index.mdx
    '!mt-0', // this is used by the p in index.mdx
    'my-20', // this is used in the grid in index.mdx
    'grid',
    'md:grid-cols-1fr-1fr', // this is useded in index.mdx
    'gap-8',
    'gap-32',
    // <!-- chart colors -->
    'fill-primary',
    'fill-secondary',
    'fill-salmon',
    'fill-violet',
    'fill-teal',
    'fill-bogey',
    'fill-yellow',
    'fill-purple',
    'fill-orange',
    'stroke-primary',
    'stroke-secondary',
    'stroke-salmon',
    'stroke-violet',
    'stroke-teal',
    'stroke-bogey',
    'stroke-yellow',
    'stroke-purple',
    'stroke-orange',
    'bg-primary',
    'bg-secondary',
    'bg-salmon',
    'bg-violet',
    'bg-teal',
    'bg-bogey',
    'bg-yellow',
    'bg-purple',
    'bg-orange',
    'border-primary',
    'border-secondary',
    'border-salmon',
    'border-violet',
    'border-teal',
    'border-bogey',
    'border-yellow',
    'border-purple',
    'border-orange',
    // <!-- chart colors -->
    {
      pattern: /text-(primary|secondary|tertiary|muted|salmon|violet|teal|bogey|yellow|purple|orange)/
    }
  ],
  theme: {
    extend: {
      colors: {
        text: '#e5e7eb',

        primary: '#f056c7',
        secondary: '#8b87ea',
        tertiary: '#58e6d9',
        muted: '#605c9d',

        // these are used for the chart
        salmon: '#ff6090',
        violet: '#3f51b5',
        teal: '#00bcd4',
        bogey: '#8bc34a',
        yellow: '#ffc107',
        purple: '#7B1FA2',
        orange: '#ff5722',

        background: '#131127',
        outline: '#232140',
        surface: '#1a182e'
      },
      keyframes: {
        bar: {
          '0%': { width: '100%' },
          '100%': { width: '0%' }
        }
      },
      animation: {
        'scaling-bar': 'bar 60s linear infinite'
      },
      fontFamily: {
        sans: ['Inconsolata', 'ui-sans-serif', 'system-ui'],
        mono: ['ui-monospace', 'monospace']
      },
      maxWidth: {
        '8xl': '90rem'
      },
      gridTemplateColumns: {
        ['auto-auto']: 'auto auto',
        ['auto-1fr']: 'auto 1fr',
        ['1fr-auto']: '1fr auto',
        ['1fr-1fr']: '1fr 1fr'
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text'),
            '*': {
              wordBreak: 'break-word'
            },
            h1: {
              color: theme('colors.text'),
              fontWieght: theme('font-bold'),
              a: {
                color: theme('colors.text')
              }
            },
            h2: {
              color: theme('colors.salmon'),
              fontWieght: theme('font-bold'),
              a: {
                color: theme('colors.salmon')
              }
            },
            h3: {
              color: theme('colors.salmon'),
              fontWieght: theme('font-bold'),
              a: {
                color: theme('colors.salmon')
              }
            },
            h4: {
              color: theme('colors.salmon'),
              fontWieght: theme('font-bold'),
              a: {
                color: theme('colors.salmon')
              }
            },
            h5: {
              color: theme('colors.salmon'),
              fontWieght: theme('font-bold'),
              a: {
                color: theme('colors.salmon')
              }
            },
            h6: {
              color: theme('colors.salmon'),
              fontWieght: theme('font-bold'),
              a: {
                color: theme('colors.salmon')
              }
            },
            strong: {
              color: theme('colors.text')
            },
            a: {
              color: theme('colors.secondary'),
              fontWieght: theme('font-bold'),
              '&:hover': {
                color: theme('colors.muted'),
                transition: 'all 0.2s ease'
              },
              '> p': {
                margin: 0
              }
            },
            code: {
              color: theme('colors.tertiary'),
              '&::before': {
                content: '"" !important'
              },
              '&::after': {
                content: '"" !important'
              }
            },
            blockquote: {
              color: theme('colors.secondary')
            }
          }
        }
      })
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
