import React from 'react';
import { GeoJsonGeometry } from 'three-geojson-geometry';
import { geoGraticule10 } from 'd3-geo';

const ThreeGraticule = () => {
  return (
    <lineSegments geometry={new GeoJsonGeometry(geoGraticule10(), 1.03)}>
      <lineBasicMaterial color="#3c3a5a" />
    </lineSegments>
  );
};

export default ThreeGraticule;
