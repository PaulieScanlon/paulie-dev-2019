import codeTheme from '@theme-ui/prism/presets/shades-of-purple.json'
import baseTheme from '@pauliescanlon/gatsby-theme-terminal/src/gatsby-plugin-theme-ui'

export default {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    text: '#FFFFFF',
    muted: '#8b87ea',
    primary: '#f056c7',
    secondary: '#c39eff',
    error: '#ff4343',
    success: '#58e6d9',
    background: '#131127',
    surface: '#232140',
    highlight: '#ffeb3b',
    placeholder: '#4e4b85',
  },

  styles: {
    ...baseTheme.styles,
    root: {
      ...baseTheme.styles.root,
      '.mdx-embed': {
        '.twitter-tweet-mdx-embed': {
          minHeight: 500,
        },
      },
    },
    p: {
      ...baseTheme.styles.p,
      a: {
        ...baseTheme.styles.p.a,
        color: 'secondary',
        wordBreak: 'break-word',
      },
      code: {
        ...baseTheme.styles.p.code,
        color: 'inherit',
        fontSize: '14px',
        wordBreak: 'break-word',
        backgroundColor: 'surface',
      },
      mark: {
        color: 'background',
        backgroundColor: 'highlight',
      },
    },
    pre: {
      ...baseTheme.styles.pre,
      ...codeTheme,
    },
    a: {
      ...baseTheme.styles.a,
      color: 'secondary',
      button: {
        cursor: 'pointer',
      },
    },
  },

  buttons: {
    ...baseTheme.buttons,
    success: {
      ...baseTheme.buttons.success,
    },
    primary: {
      ...baseTheme.buttons.primary,
      ':disabled': {
        cursor: 'not-allowed',
        backgroundColor: 'surface',
      },
    },
    ghost: {
      ...baseTheme.buttons.primary,
      color: 'muted',
      backgroundColor: 'background',
      transition: '.2s linear background-color',
      ':hover': {
        backgroundColor: 'surface',
      },
    },
  },

  forms: {
    ...baseTheme.forms,
    label: {
      ...baseTheme.forms.label,
      color: 'primary',
    },
    input: {
      ...baseTheme.forms.input,
      '::placeholder': {
        color: 'placeholder',
      },
    },
  },

  cards: {
    primary: {
      ...baseTheme.cards.primary,
      transition: '.2s linear box-shadow, .2s ease-in-out transform',
      ':hover': {
        transform: 'translateY(-0.25rem)',
        boxShadow: 2,
      },
    },
  },
}
