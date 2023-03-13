import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

import NavigationIcon from '../nav/navigation-icon';

const GenericAside = () => {
  return (
    <div className="grid gap-4 rounded border border-outline bg-surface/50 px-4 sm:px-6 py-6">
      <StaticImage
        alt="Introducing Gatsby 4"
        src="../../static/images/aside-georgi.png"
        className="block rounded-full border-2 border-white h-16 w-16 m-0 mx-auto"
      />
      <div className="mb-4">
        <h5 className="mb-0 text-base text-center leading-6 font-semibold uppercase text-secondary">Georgi Marokov</h5>
        <p className="mb-0 text-slate-300 text-sm text-center m-0">
          Software Engineer{' '}
          <a href="https://twitter.com/GoModeshift" target="_blank" rel="noreferrer">
            @Modeshift
          </a>
        </p>
      </div>
      <a
        href="https://twitter.com/MarokovGeorgi"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-4 no-underline text-sm text-center py-2 px-4 transition-all duration-300 rounded border border-outline bg-surface hover:text-white hover:bg-muted/20"
      >
        <NavigationIcon icon="M19.3,4.2c-0.7,0.3-1.4,0.5-2.2,0.6c0.8-0.5,1.4-1.2,1.7-2.1c-0.7,0.4-1.6,0.8-2.4,0.9c-0.7-0.7-1.7-1.2-2.8-1.2c-2.1,0-3.8,1.7-3.8,3.8c0,0.3,0,0.6,0.1,0.9C6.7,7,3.9,5.4,2,3.1C1.7,3.7,1.5,4.4,1.5,5.1c0,1.3,0.7,2.5,1.7,3.2C2.5,8.2,2,8,1.4,7.8c0,0,0,0,0,0c0,1.9,1.3,3.4,3.1,3.7c-0.3,0.1-0.7,0.1-1,0.1c-0.2,0-0.5,0-0.7-0.1c0.5,1.5,1.9,2.6,3.6,2.7c-1.3,1-3,1.6-4.7,1.6c-0.3,0-0.6,0-0.9-0.1c1.7,1.1,3.7,1.7,5.9,1.7c7,0,10.9-5.8,10.9-10.9c0-0.2,0-0.3,0-0.5C18.1,5.7,18.8,5,19.3,4.2z" />
        Follow on Twitter
      </a>
    </div>
  );
};

export default GenericAside;
