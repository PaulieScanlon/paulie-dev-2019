import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useFrame } from '@react-three/fiber';

import ThreeGeo from './three-geo';
import ThreeGraticule from './three-graticule';
import ThreeLatLong from './three-lat-long';
import ThreeSphere from './three-sphere';

const ThreeMesh = ({ locations }) => {
  const mesh = useRef(null);

  useFrame(() => {
    return (mesh.current.rotation.y += 0.004);
  });

  useEffect(() => {
    if (mesh) {
      mesh.current.rotation.x = 0.3;
    }
  }, []);

  return (
    <mesh ref={mesh}>
      <ThreeLatLong locations={locations} />
      <ThreeGeo />
      <ThreeGraticule />
      <ThreeSphere />
    </mesh>
  );
};

ThreeMesh.propTypes = {
  /** Geographical Locations */
  locations: PropTypes.any
};

export default ThreeMesh;
