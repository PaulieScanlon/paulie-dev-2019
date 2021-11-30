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
    `gatsby-plugin-gatsby-cloud`,
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
        source: [
          {
            name: 'posts',
            dir: process.env.NODE_ENV === 'development' ? 'posts/2021' : 'posts',
          },
          {
            name: 'writing',
            dir: 'writing',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-76055934-4',
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: '@raae/gatsby-plugin-let-it-snow',
      options: {
        colors: ['#58e6d9', '#8b87ea', '#f056c7'],
      },
    },
  ],
}
