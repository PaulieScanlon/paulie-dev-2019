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
  // flags: {
  //   FAST_DEV: true
  // },
  trailingSlash: 'always',
  siteMetadata: {
    name: 'Georgi Marokov',
    description: 'Senior Software Engineer / JavaScript and .NET Ecosystem',
    keywords: [
      'React',
      'Gatsby',
      'JavaScript',
      'TypeScript',
      'Flow',
      'Styled Components',
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
    siteUrl: process.env.URL,
    defaultImage: '/static/images/aside-georgi.png'
  },
  plugins: [
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-mdx-embed',
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-postcss',
    'gatsby-transformer-json',
    'gatsby-plugin-netlify',
    'gatsby-plugin-sitemap',
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
        path: `${__dirname}/content/blogs/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/projects/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/hobbies/`
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-76055934-4'
      }
    }
  ],
  partytownProxiedURLs: [`https://www.googletagmanager.com/gtag/js?id=${process.env.GATSBY_GA_MEASUREMENT_ID}`]
};
