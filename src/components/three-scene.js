import React from 'react';
import PropTypes from 'prop-types';

// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';

// import ThreeGeo from './three-geo';
// import ThreeGraticule from './three-graticlue';
// import ThreeLatLong from './three-lat-long';
// import ThreeSphere from './three-sphere';

const ThreeScene = ({ locations }) => {
  if (!locations) return null;
  return null;
  //   return (
  //     <Canvas
  //       camera={{
  //         fov: 75,
  //         position: [0, 0, 2]
  //       }}
  //     >
  //       {/* <OrbitControls enableRotate={true} enableZoom={false} enablePan={false} /> */}
  //       <ambientLight intensity={2} />
  //       {/* <ThreeLatLong locations={locations} /> */}
  //       {/* <ThreeGeo />
  //       <ThreeGraticule /> */}
  //       <ThreeSphere />
  //     </Canvas>
  //   );
};

ThreeScene.propTypes = {
  /** Geographical Locations */
  locations: PropTypes.any
};

export default ThreeScene;
