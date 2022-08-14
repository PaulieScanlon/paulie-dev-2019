import React, { Fragment } from 'react';
import { GeoJsonGeometry } from 'three-geojson-geometry';

import { data } from './three-ne_110m_admin_0_countries';

const ThreeGeo = () => {
  return (
    <Fragment>
      {data.features.map(({ geometry }, index) => {
        return (
          <lineSegments key={index} geometry={new GeoJsonGeometry(geometry, 1)}>
            <lineBasicMaterial color="#4b4582" />
          </lineSegments>
        );
      })}
    </Fragment>
  );
};

export default ThreeGeo;
