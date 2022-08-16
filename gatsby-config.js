require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'production'}`
});

const wrapESMPlugin = (name) =>
  function wrapESM(opts) {
    return async (...args) => {
      const mod = await import(name);
      const plugin = mod.default(opts);
      return plugin(...args);
    };
  };

module.exports = {
  trailingSlash: 'always',
  siteMetadata: {
    name: 'Paul Scanlon',
    description: 'Senior Software Engineer / Developer Relations',
    keywords: [
      'React',
      'Gatsby',
      'JavaScript',
      'TypeScript',
      'Flow',
      'styled-components',
      'Theme UI',
      'Tailwind',
      'Jest',
      'Enzyme',
      'React Testing Libary',
      'Node.js',
      'Fauna',
      'Jamstack',
      'Component Library',
      'Serverless Functions'
    ],
    siteUrl: 'https://paulie.dev',
    defaultImage: 'https://paulie.dev/images/paulie-open-graph-image-2022.jpg'
  },
  plugins: [
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-mdx-embed',
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-postcss',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        rehypePlugins: [wrapESMPlugin('rehype-slug'), [wrapESMPlugin('rehype-autolink-headings'), { behavior: 'wrap' }]]
      }
    },
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          quality: 70,
          formats: ['auto', 'webp'],
          placeholder: 'blurred'
        }
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/pages/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/posts/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/articles/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/demos/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/streams/`
      }
    }
  ],
  partytownProxiedURLs: [`https://www.googletagmanager.com/gtag/js?id=${process.env.GATSBY_GA_MEASUREMENT_ID}`]
};
