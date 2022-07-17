import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const Seo = ({ type, title, description, slug, image, tags }) => {
  const {
    site: {
      siteMetadata: { name, siteUrl, defaultImage, keywords, lang }
    }
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          name
          siteUrl
          defaultImage
          keywords
          lang
        }
      }
    }
  `);

  const htmlTitle = `${name} | ${title}`;
  const ogImage = image ? image : defaultImage;
  const seoKeywords = tags ? tags : keywords;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{htmlTitle}</title>
      <link rel="canonical" href={`${siteUrl}/${slug}`} />
      <meta name="description" content={description} />
      <meta name="image" content={ogImage} />
      <meta name="image:alt" content={description} />
      <meta name="keywords" content={seoKeywords.join(', ')} />

      {/* Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={htmlTitle} />
      <meta property="og:url" content={`${siteUrl}/${slug}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={description}></meta>

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={htmlTitle} />
      <meta name="twitter:url" content={`${siteUrl}/${slug}`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={description}></meta>

      {/* favicon */}
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${siteUrl}/images/favicon-16x16.png`}
        data-react-helmet="true"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${siteUrl}/images/favicon-32x32.png`}
        data-react-helmet="true"
      />
    </Helmet>
  );
};

Seo.propTypes = {
  /** The type of meta - useful for Facebook */
  type: PropTypes.oneOf(['website', 'article']),
  /** The site title */
  title: PropTypes.string.isRequired,
  /** The site description */
  description: PropTypes.string.isRequired,
  /** The slug URL */
  slug: PropTypes.string.isRequired,
  /** Image url to use for opengraph image */
  image: PropTypes.string,
  /** Keywords to use in meta keywords */
  tags: PropTypes.arrayOf(PropTypes.string)
};

Seo.defaultProps = {
  type: 'website'
};

export default Seo;