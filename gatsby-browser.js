import React from 'react';
import PageElement from './src/components/page-element';
import RootElement from './src/components/root-element';

import './src/styles/global.css';

export const onRouteUpdate = ({ location }) => {
  const element = document.getElementById(location.hash.split('#')[1]?.toLowerCase());

  if (element) {
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

export const wrapPageElement = ({ element, props }) => {
  return <PageElement {...props}>{element}</PageElement>;
};

export const wrapRootElement = ({ element }) => {
  return <RootElement>{element}</RootElement>;
};
