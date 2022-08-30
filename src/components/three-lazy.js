import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

import Loading from './loading';

const ThreeScene = lazy(() => import('./three-scene'));

const ThreeLazy = ({ locations }) => {
  return (
    <Suspense fallback={<Loading />}>
      <ThreeScene locations={locations} />
    </Suspense>
  );
};

ThreeLazy.propTypes = {
  /** Geographical Locations */
  locations: PropTypes.any.isRequired
};

export default ThreeLazy;
