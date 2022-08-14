import React from 'react';
import { GeoJsonGeometry } from 'three-geojson-geometry';
import * as d3 from 'd3';

const ThreeGraticule = () => {
  return (
    <lineSegments geometry={new GeoJsonGeometry(d3.geoGraticule10(), 1.03)}>
      <lineBasicMaterial color="#343260" />
    </lineSegments>
  );
};

export default ThreeGraticule;
