import React from 'react';
import RootElement from './src/components/root-element';

export const wrapRootElement = ({ element }) => {
  return <RootElement>{element}</RootElement>;
};

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: 'en-GB' });
  setHeadComponents([
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
