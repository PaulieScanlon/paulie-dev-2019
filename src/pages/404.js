import React, { useEffect, useState } from 'react';
import Seo from '../components/seo';

const Page = () => {
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
      <small className="mb-4 leading-6 font-semibold capitalize text-primary">404</small>
      <h1>Page Not Found</h1>
      <p>Blast! The page you're looking for can't be found.</p>
      <pre>{JSON.stringify(locations, null, 2)}</pre>
    </div>
  );
};

export default Page;

export const Head = () => {
  return <Seo title="Page Not Found" description="Blast!" slug="/404" />;
};
