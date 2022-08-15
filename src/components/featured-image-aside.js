import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import NavigationIcon from './navigation-icon';

const FeaturedImageAside = ({ alt, thumbnail, shareText }) => {
  return (
    <div className="grid gap-4 rounded border border-outline bg-surface/50 px-4 sm:px-6 py-6">
      <div className="rounded shadow-lg overflow-hidden w-full">
        <GatsbyImage alt={alt} image={getImage(thumbnail)} />
      </div>
      <a
        href={`https://twitter.com/intent/tweet?text=${shareText}`}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-4 no-underline text-sm text-center py-2 px-4 transition-all duration-300 rounded border border-outline bg-surface hover:text-white hover:bg-muted/20"
      >
        <NavigationIcon icon="M19.3,4.2c-0.7,0.3-1.4,0.5-2.2,0.6c0.8-0.5,1.4-1.2,1.7-2.1c-0.7,0.4-1.6,0.8-2.4,0.9c-0.7-0.7-1.7-1.2-2.8-1.2c-2.1,0-3.8,1.7-3.8,3.8c0,0.3,0,0.6,0.1,0.9C6.7,7,3.9,5.4,2,3.1C1.7,3.7,1.5,4.4,1.5,5.1c0,1.3,0.7,2.5,1.7,3.2C2.5,8.2,2,8,1.4,7.8c0,0,0,0,0,0c0,1.9,1.3,3.4,3.1,3.7c-0.3,0.1-0.7,0.1-1,0.1c-0.2,0-0.5,0-0.7-0.1c0.5,1.5,1.9,2.6,3.6,2.7c-1.3,1-3,1.6-4.7,1.6c-0.3,0-0.6,0-0.9-0.1c1.7,1.1,3.7,1.7,5.9,1.7c7,0,10.9-5.8,10.9-10.9c0-0.2,0-0.3,0-0.5C18.1,5.7,18.8,5,19.3,4.2z" />
        Share on Twitter
      </a>
    </div>
  );
};

FeaturedImageAside.propTypes = {
  /** The image alt tag */
  alt: PropTypes.string.isRequired,
  /** Gatsby Image Data */
  thumbnail: PropTypes.any.isRequired,
  /** The text to populate the Tweet */
  shareText: PropTypes.string.isRequired
};

export default FeaturedImageAside;
