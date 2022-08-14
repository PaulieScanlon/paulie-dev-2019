import React, { useEffect, useState } from 'react';

import ThreeScene from '../components/three-scene';
import Loading from '../components/loading';

const Analytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    const getAnalytics = async () => {
      try {
        const response = await (
          await fetch('/api/get-lat-long-google-ua', {
            method: 'GET'
          })
        ).json();

        setLocations(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getAnalytics();
  }, []);

  return (
    <div>
      <h1>Analytics</h1>
      <div className="flex items-center justify-center w-full h-[36rem] rounded border border-outline">
        <ThreeScene locations={locations} />
        {isLoading ? <Loading /> : null}
      </div>
    </div>
  );
};

export default Analytics;
