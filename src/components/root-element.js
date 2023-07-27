import React from 'react';
import { Script } from 'gatsby';

import { AppProvider } from '../context/app-context';

const RootElement = ({ children }) => {
  return (
    <AppProvider>
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
      <Script src={`https://platform.twitter.com/widgets.js`} />
      {children}
    </AppProvider>
  );
};

export default RootElement;
