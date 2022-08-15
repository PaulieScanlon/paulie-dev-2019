import React, { Fragment, useEffect, useState } from 'react';
import { GeoJsonGeometry } from 'three-geojson-geometry';

const ThreeGeo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const getJsonGeomery = async () => {
      try {
        const response = await (
          await fetch('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson', {
            method: 'GET'
          })
        ).json();
        console.log(response);
        setIsLoading(false);
        setResponse(response.features);
      } catch (error) {
        console.log(error);
      }
    };

    getJsonGeomery();
  }, []);

  return (
    <Fragment>
      {/* {isLoading ? null : (
        <Fragment>
          {response.map(({ geometry }, index) => {
            return (
              <lineSegments key={index} geometry={new GeoJsonGeometry(geometry, 1)}>
                <lineBasicMaterial color="#4b4582" />
              </lineSegments>
            );
          })}
        </Fragment>
      )} */}
    </Fragment>
  );
};

export default ThreeGeo;
