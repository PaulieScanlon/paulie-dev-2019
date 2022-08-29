import React, { Fragment } from 'react';
import { Script } from 'gatsby';

const RootElement = ({ children }) => {
  return (
    <Fragment>
      {/* <Script
        data-domain="paulie.dev"
        src="https://plausible.io/js/script.js"
        strategy="off-main-thread"
        forward={['plausible']}
      />
      <Script
        id="plausible-config"
        strategy="off-main-thread"
        dangerouslySetInnerHTML={{
          __html: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`
        }}
      /> */}

      <Script src="https://plausible.io/js/script.manual.js" strategy="post-hydrate" data-domain="paulie.dev" />

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GATSBY_GA_MEASUREMENT_ID}`}
        strategy="off-main-thread"
        forward={['gtag']}
      />
      <Script
        id="gtag-config"
        strategy="off-main-thread"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
          window.gtag = function gtag(){ window.dataLayer.push(arguments);}
          gtag('js', new Date()); 
          gtag('config', '${process.env.GATSBY_GA_MEASUREMENT_ID}', { send_page_view: false })`
        }}
      />
      {children}
    </Fragment>
  );
};

export default RootElement;
