import React from 'react';
import { useEffect } from 'react';

const Analytics = () => {
  useEffect(() => {
    const getAnalytics = async () => {
      try {
        const response = await (
          await fetch('/api/get-lat-long-google-ua', {
            method: 'GET'
          })
        ).json();

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    getAnalytics();
  }, []);

  return <div>Analytics</div>;
};

export default Analytics;
