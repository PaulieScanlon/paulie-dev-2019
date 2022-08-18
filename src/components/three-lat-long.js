import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Points, Point } from '@react-three/drei';

import * as THREE from 'three';

const getVertex = (lat, lng, radius) => {
  const vector = new THREE.Vector3().setFromSpherical(
    new THREE.Spherical(radius, THREE.MathUtils.degToRad(90 - lat), THREE.MathUtils.degToRad(lng))
  );
  return vector;
};

const Cylinder = ({ lat, lng, cap, radius }) => {
  if (lat === 0.0 && lng === 0.0) return null;

  const look = getVertex(Math.PI, lng, radius);

  return (
    <mesh
      position={getVertex(lat, lng, radius)}
      scale={0.01}
      onUpdate={(self) => (self.geometry.translate(0, cap / 2, 0), self.lookAt(look))}
      // onUpdate={(self) => self.lookAt(look)}
    >
      <cylinderGeometry args={[0.5, 0.5, cap, 10, 1, false]} />
      <meshBasicMaterial color="#fd417a" />
    </mesh>
  );
};

const ThreeLatLong = ({ locations }) => {
  const maxCount = 65;
  return (
    <group>
      {locations
        ? locations.map((data, index) => {
            const { lat, lng, count } = data;
            const cap = count > maxCount ? maxCount : count;

            return <Cylinder key={index} lat={lat} lng={lng} cap={cap} radius={1.06} />;
          })
        : null}
    </group>
    // <group>
    //   <Points>
    //     <pointsMaterial vertexColors size={0.013} />
    //     {locations
    //       ? locations.map((data, index) => {
    //           const { lat, lng, count } = data;
    //           return <Point key={index} position={getVertex(lat, lng, 1.06)} color="#fd417a" />;
    //         })
    //       : null}
    //   </Points>
    // </group>
  );
};

ThreeLatLong.propTypes = {
  /** Geographical Locations */
  locations: PropTypes.any.isRequired
};

export default ThreeLatLong;
