require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    name: 'Paul Scanlon',
    description:
      'Jamstack Developer: React, Gatsby, JavaScript, TypeScript, CSS-in-Js, Storybook, TDD & a tiny bit of Apollo/GraphQL/Node',
    keywords: [
      'React',
      'Gatsby',
      'JavaScript',
      'TypeScript',
      'Flow',
      'styled-components',
      'Theme UI',
      'Jest',
      'Enzyme',
      'React Testing Libary',
      'Node.js',
      'Fauna',
      'Jamstack',
      'Component Library',
      'Serverless Functions',
    ],
    siteUrl: 'https://paulie.dev',
    siteImage: 'https://paulie.dev/images/paulie-open-graph-image.jpg',
    profileImage: ``,
    lang: `en`,
    config: {
      sidebarWidth: 200,
    },
  },
  plugins: [
    `gatsby-plugin-mdx-embed`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          quality: 70,
          formats: ['auto', 'webp', 'avif'],
          placeholder: 'blurred',
        },
      },
    },
    {
      resolve: '@pauliescanlon/gatsby-theme-terminal',
      options: {
        source: ['posts', 'writing'],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-76055934-4',
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
