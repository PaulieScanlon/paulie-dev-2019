import React from 'react';
import RootElement from './src/components/root-element';

import './src/styles/prism-shades-of-purple.css';
import './src/styles/global.css';

export const wrapRootElement = ({ element }) => {
  return <RootElement>{element}</RootElement>;
};
