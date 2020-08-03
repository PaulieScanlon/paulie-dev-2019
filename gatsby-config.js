module.exports = {
  siteMetadata: {
    name: "Paul Scanlon",
    description:
      "I'm a Front End Developer / UX Engineer based in Worthing | London / UK. React, Gatsby, JavaScript, TypeScript/Flow, StyledComponents, Theme UI, Storybook, TDD (Jest/Enzyme/React Testing Libary) and a tiny bit of Node and FaunaDB",
    keywords: [
      "React",
      "Gatsby",
      "JavaScript",
      "TypeScript",
      "Flow",
      "StyledComponents",
      "Theme UI",
      "Jest",
      "Enzyme",
      "React Testing Libary",
      "Node.js",
      "Fauna",
      "FaunaDB",
      "JAMStack",
      "Component Library",
    ],
    siteUrl: "https://paulie.dev",
    siteImage: "images/paulie-open-graph-image.jpg",
    profileImage: ``,
    lang: `en`,
    config: {
      sidebarWidth: 200,
    },
  },
  plugins: [
    `@pauliescanlon/gatsby-mdx-embed`,
    {
      resolve: "@pauliescanlon/gatsby-theme-terminal",
      options: {
        source: ["posts", "writing"],
      },
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
        icon: `src/manifesticon-512x512.png`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-76055934-4",
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        allPageHeaders: {
          "/public/**/*.html": [
            "cache-control: public",
            "cache-control:  max-age=0",
            "cache-control: must-revalidate",
          ],
        },
      },
    },
  ],
}

// https://content-security-policy.com/examples/google-fonts/
