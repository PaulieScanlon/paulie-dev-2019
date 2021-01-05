require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    name: "Paul Scanlon",
    description:
      "Front End UI Developer / UX Engineer / JAMStack: React, Gatsby, JavaScript, TypeScript, CSS-in-Js, Storybook, TDD & a tiny bit of Apollo/GraphQL/Node",
    keywords: [
      "React",
      "Gatsby",
      "JavaScript",
      "TypeScript",
      "Flow",
      "styled-components",
      "Theme UI",
      "Jest",
      "Enzyme",
      "React Testing Libary",
      "Node.js",
      "FaunaDB",
      "JAMStack",
      "Component Library",
      "Serverless Functions",
    ],
    siteUrl: "https://paulie.dev",
    siteImage: "https://paulie.dev/images/paulie-open-graph-image.jpg",
    profileImage: ``,
    lang: `en`,
    config: {
      sidebarWidth: 200,
    },
  },
  plugins: [
    `gatsby-plugin-mdx-embed`,
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
    `gatsby-plugin-remove-serviceworker`,
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-76055934-4",
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/dummy-page/`],
      },
    },
  ],
}
