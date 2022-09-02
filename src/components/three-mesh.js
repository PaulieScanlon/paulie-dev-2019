import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

import ThreeGeo from './three-geo';
import ThreeGraticule from './three-graticule';
import ThreeLatLong from './three-lat-long';
import ThreeSphere from './three-sphere';

const ThreeMesh = () => {
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
      <ThreeLatLong />
      <ThreeGeo />
      <ThreeGraticule />
      <ThreeSphere />
    </mesh>
  );
};

export default ThreeMesh;
