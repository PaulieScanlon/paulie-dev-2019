import React from 'react';
import PropTypes from 'prop-types';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import ThreeMesh from './three-mesh';

const ThreeScene = ({ locations }) => {
  return (
    <Canvas
      camera={{
        fov: 75,
        position: [0, 0, 2.1]
      }}
      className="max-w-[300px]"
    >
      <OrbitControls enableRotate={true} enableZoom={false} enablePan={false} />
      <ambientLight intensity={2} />
      <ThreeMesh locations={locations} />
    </Canvas>
  );
};

ThreeScene.propTypes = {
  /** Geographical Locations */
  locations: PropTypes.any.isRequired
};

export default ThreeScene;
