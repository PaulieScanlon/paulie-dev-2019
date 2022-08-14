import React, { useEffect, useState } from 'react';
import Seo from '../components/seo';

// import ThreeScene from '../components/three-scene';

const Page = () => {
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
      } catch (error) {
        console.log(error);
      }
    };

    getAnalytics();
  }, []);

  return (
    <div>
      <small className="mb-4 leading-6 font-semibold capitalize text-primary">404</small>
      <h1>Page Not Found</h1>
      <p>Blast! The page you're looking for can't be found.</p>
      <div className="w-full h-[36rem] rounded border border-outline">{/* <ThreeScene locations={locations} /> */}</div>
    </div>
  );
};

export default Page;

export const Head = () => {
  return <Seo title="Page Not Found" description="Blast!" slug="/404" />;
};
