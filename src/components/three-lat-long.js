import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import * as THREE from 'three';

const getVertex = (lat, lng, radius) => {
  const vector = new THREE.Vector3().setFromSpherical(
    new THREE.Spherical(radius, THREE.MathUtils.degToRad(90 - lat), THREE.MathUtils.degToRad(lng))
  );
  return vector;
};

const ThreeLatLong = ({ locations }) => {
  return (
    <Fragment>
      {locations
        ? locations.map((data, index) => {
            const { lat, lng } = data;
            return (
              <mesh key={index} position={getVertex(lat, lng, 1.05)}>
                <sphereGeometry args={[0.005, 32]} />
                <meshBasicMaterial color="#fd417a" />
              </mesh>
            );
          })
        : null}
    </Fragment>
  );
};

ThreeLatLong.propTypes = {
  /** Geographical Locations */
  locations: PropTypes.any
};

export default ThreeLatLong;
