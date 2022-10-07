import React, { Fragment, useRef, useEffect, useState } from 'react';
import { GeoJsonGeometry } from 'three-geojson-geometry';

const ThreeGeo = () => {
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const getJsonGeomery = async () => {
      try {
        const response = await fetch(
          'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson',
          {
            method: 'GET'
          }
        );
        const results = await response.json();

        if (isMounted) {
          setIsLoading(false);
          setResponse(results.features);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getJsonGeomery();
  }, []);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <Fragment>
      {isLoading ? null : (
        <Fragment>
          {response.map((data, index) => {
            const { geometry } = data;
            return (
              <lineSegments key={index} geometry={new GeoJsonGeometry(geometry, 1.03)}>
                <lineBasicMaterial color="#59519f" />
              </lineSegments>
            );
          })}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ThreeGeo;
