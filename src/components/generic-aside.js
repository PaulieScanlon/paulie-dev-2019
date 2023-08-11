import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

import NavigationIcon from './navigation-icon';

const GenericAside = () => {
  return (
    <div className="grid gap-4 rounded border border-outline bg-surface/50 px-4 sm:px-6 py-6">
      <StaticImage
        alt="Introducing Gatsby 4"
        src="../../static/images/aside-paul.png"
        className="block rounded-full border-2 border-white h-16 w-16 m-0 mx-auto"
      />
      <div className="mb-4">
        <h5 className="mb-0 text-base text-center leading-6 font-semibold uppercase text-secondary">Paul Scanlon</h5>
        <p className="mb-0 text-slate-300 text-sm text-center m-0">...</p>
      </div>
      <a
        href="https://x.com/PaulieScanlon"
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-4 no-underline text-sm text-center py-2 px-2 transition-all duration-300 rounded border border-outline bg-surface hover:text-white hover:bg-muted/20"
      >
        <NavigationIcon icon="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        Follow on X
      </a>
    </div>
  );
};

export default GenericAside;
