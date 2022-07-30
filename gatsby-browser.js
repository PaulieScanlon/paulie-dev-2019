import React from 'react';

import RootElement from './src/components/root-element';

import './src/styles/prism-shades-of-purple.css';
import './src/styles/global.css';

export const onRouteUpdate = ({ location }) => {
  console.log('onRouteUpdate: ', location);
  const element = document.getElementById(location.hash.split('#')[1]?.toLowerCase());
  console.log('element: ', element);

  if (element) {
    console.log('element.offsetTop: ', element.offsetTop);

    window.scrollTo({
      top: element.offsetTop - 80,
      left: 0
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  const pagePath = location ? location.pathname + location.search + location.hash : undefined;

  setTimeout(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', { page_path: pagePath });
    }
  }, 100);
};

export const wrapRootElement = ({ element }) => {
  return <RootElement>{element}</RootElement>;
};
