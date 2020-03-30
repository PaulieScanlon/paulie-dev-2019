module.exports = {
  siteMetadata: {
    name: "Paul Scanlon",
    description:
      "I'm a React UI developer / UX Engineer (contract). React, Gatsby.js, JavaScript, TypeScript/Flow, StyledComponents, Theme UI, Storybook, TDD (Jest/Enzyme) and a tiny bit of Node.js.",
    keywords: [
      "React",
      "Gatsby.js",
      "JavaScript",
      "TypeScript",
      "Flow",
      "StyledComponents",
      "Theme UI",
      "Jest",
      "Enzyme",
      "Node.js",
      "Component Library"
    ],
    siteUrl: "https://paulie.dev",
    siteImage: "images/paulie-open-graph-image.jpg",
    profileImage: ``,
    lang: `en`,
    config: {
      sidebarWidth: 280
    }
  },
  plugins: [
    `@pauliescanlon/gatsby-mdx-embed`,
    {
      resolve: "@pauliescanlon/gatsby-theme-terminal",
      options: {
        source: ["posts"]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Paul Scanlon`,
        short_name: `Ps`,
        start_url: `/`,
        lang: `en`,
        background_color: `#282a36`,
        theme_color: `#ff79c6`,
        display: `standalone`,
        icon: `src/manifesticon-512x512.png`
      }
    },
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-76055934-4"
      }
    }
  ]
};
