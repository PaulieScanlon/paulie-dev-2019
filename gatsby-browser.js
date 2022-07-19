import React from 'react';
import RootElement from './src/components/root-element';

import './src/styles/prism-shades-of-purple.css';
import './src/styles/global.css';

export const onRouteUpdate = ({ location }) => {
  const element = document.getElementById(location.hash.split('#')[1]?.toLowerCase());

  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80
    });
  }
  return true;
};

export const wrapRootElement = ({ element }) => {
  return <RootElement>{element}</RootElement>;
};
