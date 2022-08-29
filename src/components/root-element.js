import React, { Fragment } from 'react';
import { Script } from 'gatsby';

const RootElement = ({ children }) => {
  return (
    <Fragment>
      {/* <Script src="https://plausible.io/js/script.manual.js" strategy="post-hydrate" data-domain="paulie.dev" />
      <Script
        id="plausible-config"
        dangerouslySetInnerHTML={{
          __html: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`
        }}
      /> */}

      <script defer data-domain="paulie.dev" src="https://plausible.io/js/script.manual.js" />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
              function prepareUrl(params) {
                const url = new URL(location.href)
                const queryParams = new URLSearchParams(location.search)
                let customUrl = url.protocol + "//" + url.hostname + url.pathname
                for (const paramName of params) {
                  const paramValue = queryParams.get(paramName)
                  if (paramValue) customUrl = customUrl + '/' + paramValue
                }
                return customUrl
              }
              plausible('pageview', { u: prepareUrl(["CUSTOM_PARAM_1", "CUSTOM_PARAM_2", ... ]) })`
        }}
      />
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
