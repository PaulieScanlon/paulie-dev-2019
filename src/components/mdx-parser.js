import React from 'react';
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import MarkdownCtaLink from './markdown-cta-link';
import PrismSyntaxHighlight from './prism-syntax-highlight.js';

import { transformImages } from '../utils/transform-images';
import { stripLeadingSlash } from '../utils/strip-leading-slash';
import Tweet from '../components/tweet';
import YouTube from '../components/youtube';
import Vimeo from '../components/vimeo';

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
      return <a href={stripLeadingSlash(href)}>{children}</a>;
    }
    // if it's anything else, use Link
    return <Link to={href}>{children}</Link>;
  },
  code: ({ children, className }) => {
    return className ? (
      <PrismSyntaxHighlight className={className}>{children}</PrismSyntaxHighlight>
    ) : (
      <code>{children}</code>
    );
  },
  GatsbyImage: (props) => <GatsbyImage alt={props.alt} image={getImage(props.image)} className="my-16" />,
  MarkdownCtaLink,
  Tweet,
  YouTube,
  Vimeo
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
