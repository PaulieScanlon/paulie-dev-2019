import React from 'react';
import PageElement from './src/components/page/page-element';
import RootElement from './src/components/page/root-element';

export const wrapPageElement = ({ element, props }) => {
  return <PageElement {...props}>{element}</PageElement>;
};

export const wrapRootElement = ({ element }) => {
  return <RootElement>{element}</RootElement>;
};

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: 'en-GB' });
  setHeadComponents([
    <link key="x-icon" rel="icon" type="image/x-icon" href="/images/favicon.ico" />,
    <link key="webmtion" rel="webmention" href="https://webmention.io/worldwildweb.dev/webmention" />,
    <link key="pingback" rel="pingback" href="https://webmention.io/worldwildweb.dev/xmlrpc" />,
    <link
      key="16x16"
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/images/favicon-16x16.png"
      data-react-helmet="true"
    />,
    <link
      key="32x32"
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/images/favicon-32x32.png"
      data-react-helmet="true"
    />,
    <link
      key="inconsolata-regular"
      rel="preload"
      href="/fonts/Inconsolata-Regular.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    <link
      key="inconsolata-medium"
      rel="preload"
      href="/fonts/Inconsolata-Medium.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    <link
      key="inconsolata-black"
      rel="preload"
      href="/fonts/Inconsolata-Black.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    <style
      key="inline-style"
      dangerouslySetInnerHTML={{
        __html: `
        @font-face {
          font-family: 'Inconsolata';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url(/fonts/Inconsolata-Regular.woff2) format('woff2');
        }
        @font-face {
          font-family: 'Inconsolata';
          font-style: normal;
          font-weight: 500;
          font-display: swap;
          src: url(/fonts/Inconsolata-Medium.woff2) format('woff2');
        }
        @font-face {
          font-family: 'Inconsolata';
          font-style: normal;
          font-weight: 900;
          font-display: swap;
          src: url(/fonts/Inconsolata-Black.woff2) format('woff2');
        }
        `
      }}
    />
  ]);
};
