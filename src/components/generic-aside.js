import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

const GenericAside = () => {
  return (
    <div className="grid gap-4 rounded border border-outline bg-surface/50 px-4 sm:px-6 py-6">
      <StaticImage
        alt="Introducing Gatsby 4"
        src="../../static/images/aside-gatsby.png"
        className="block rounded-full border-2 border-white h-16 w-16 m-0 mx-auto"
      />
      <div className="mb-4">
        <h5 className="mb-0 text-base text-center leading-6 font-semibold uppercase text-secondary">The Gatsby Blog</h5>
        <p className="mb-0 text-slate-300 text-sm text-center m-0">
          More of my content can be found on the Gatsby Blog
        </p>
      </div>
      <a
        href="https://www.gatsbyjs.com/contributors/paul-scanlon"
        target="_blank"
        rel="noreferrer"
        className="no-underline text-sm text-center py-2 px-4 transition-all duration-300 rounded border border-outline bg-surface hover:text-white hover:bg-muted/20"
      >
        Visit Gatsby
      </a>
    </div>
  );
};

export default GenericAside;
