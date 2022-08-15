import React from 'react';
import PropTypes from 'prop-types';
import { Points, Point } from '@react-three/drei';

import * as THREE from 'three';

const getVertex = (lat, lng, radius) => {
  const vector = new THREE.Vector3().setFromSpherical(
    new THREE.Spherical(radius, THREE.MathUtils.degToRad(90 - lat), THREE.MathUtils.degToRad(lng))
  );
  return vector;
};

const ThreeLatLong = ({ locations }) => {
  return (
    <group>
      <Points>
        <pointsMaterial vertexColors size={0.013} />
        {locations.map((data, index) => {
          const { lat, lng } = data;
          return <Point key={index} position={getVertex(lat, lng, 1.06)} color="#fd417a" />;
        })}
      </Points>
    </group>
  );
};

ThreeLatLong.propTypes = {
  /** Geographical Locations */
  locations: PropTypes.any.isRequired
};

export default ThreeLatLong;
