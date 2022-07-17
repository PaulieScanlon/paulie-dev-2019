import React from 'react';
import PropTypes from 'prop-types';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';

import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { transformImages } from '../utils/transform-images';

const components = {
  a: ({ href, children }) => {
    // If it's an external url, use <a> and target _blank
    if (href.match(/^(http|https|mailto):/g)) {
      return (
        <a href={href} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    }
    // if it's a jumplink #, use Link which will fires an anchorScroll in gatsby-browser
    if (href.match(/#/gi)) {
      return <Link to={href}>{children}</Link>;
    }
    // if it's anything else, use Link
    return <Link to={href}>{children}</Link>;
  },
  GatsbyImage: (props) => <GatsbyImage alt={props.alt} image={getImage(props.image)} />
};

const MdxParser = ({ children, embedded }) => {
  return (
    <MDXProvider components={components}>
      <MDXRenderer embedded={transformImages(embedded)}>{children}</MDXRenderer>
    </MDXProvider>
  );
};

MdxParser.propTypes = {
  /** Embedded image dtails */
  embedded: PropTypes.any
};

export default MdxParser;