import React from 'react';
import PropTypes from 'prop-types';

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

  const height = cap / 2;
  const y = Math.sign(lat) > 0 ? height : -height;

  return (
    <mesh
      position={getVertex(lat, lng, radius)}
      scale={0.009}
      onUpdate={(self) => [self.geometry.translate(0, y, 0), self.lookAt(look)]}
    >
      <cylinderGeometry args={[0.5, 0.5, cap, 10, 1, false]} />
      <meshBasicMaterial color="#fd417a" />
    </mesh>
  );
};

const ThreeLatLong = ({ locations }) => {
  const maxY = 1; // > 1 make the cylinder scale on the y
  return (
    <group>
      {locations
        ? locations.map((data, index) => {
            const { lat, lng, count } = data;
            const cap = count > maxY ? maxY : count;
            return <Cylinder key={index} lat={lat} lng={lng} cap={cap} radius={1.06} />;
          })
        : null}
    </group>
  );
};

ThreeLatLong.propTypes = {
  /** Geographical Locations */
  locations: PropTypes.any.isRequired
};

export default ThreeLatLong;
