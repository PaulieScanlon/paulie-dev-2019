import React, { Fragment, useRef, useEffect, useState } from 'react';

import ThreeScene from '../components/three-scene';
import Loading from './loading';

const ThreeFetch = () => {
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    const getLatLong = async () => {
      setIsLoading(true);
      try {
        const response = await (await fetch('/api/get-lat-long')).json();

        if (isMounted) {
          setLocations(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getLatLong();
  }, []);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loading />
        </div>
      ) : (
        <ThreeScene locations={locations} />
      )}
    </Fragment>
  );
};

export default ThreeFetch;
