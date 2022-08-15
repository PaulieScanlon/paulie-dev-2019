import React from 'react';
import { GeoJsonGeometry } from 'three-geojson-geometry';
import { geoGraticule10 } from 'd3-geo';

const ThreeGraticule = () => {
  return (
    <lineSegments geometry={new GeoJsonGeometry(geoGraticule10(), 1)}>
      <lineBasicMaterial color="#423c77" />
    </lineSegments>
  );
};

export default ThreeGraticule;
