import codeTheme from "@theme-ui/prism/presets/shades-of-purple.json";
import baseTheme from "@pauliescanlon/gatsby-theme-terminal/src/gatsby-plugin-theme-ui";

export default {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    text: "#ffffff",
    muted: "#4b4882",
    primary: "#a92aeb",
    secondary: "#688ce0",
    error: "#da456f",
    success: "#2bc3f1",
    background: "#131127",
    surface: "#1a1832"
  },

  styles: {
    ...baseTheme.styles,
    // h1: {
    //   ...baseTheme.styles.h1,
    //   fontSize: `40px !important`
    // },
    h2: {
      ...baseTheme.styles.h2,
      fontSize: 24
    },
    h5: {
      ...baseTheme.styles.h5,
      fontSize: 14
    },
    p: {
      a: {
        ...baseTheme.styles.p.a,
        color: "primary"
      },
      code: {
        ...baseTheme.styles.p.code,
        color: "inherit"
      }
    },
    pre: {
      ...baseTheme.styles.pre,
      ...codeTheme
    },
    a: {
      ...baseTheme.styles.a,
      color: "primary"
    }
  }
};
