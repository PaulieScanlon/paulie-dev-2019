import React, { useEffect, useState } from 'react';
import Loading from '../components/loading';
import Seo from '../components/seo';

const Page = () => {
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [isSubmittig, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (success) => {
          console.log(success);
        },
        (error) => {
          console.log(error);
        },
        {
          maximumAge: 60000,
          timeout: 5000,
          enableHighAccuracy: true
        }
      );
    }
  }, []);

  useEffect(() => {
    setIsSubmitting(true);

    const addLocation = async () => {
      try {
        const response = await (
          await fetch('/api/add-user-location', {
            method: 'POST',
            body: JSON.stringify({
              lat: 51.507351,
              long: -0.127758,
              date: new Date()
            })
          })
        ).json();

        setResponse(response);
        setIsSubmitting(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setIsSubmitting(false);
      }
    };
    addLocation();
  }, []);

  return (
    <div>
      <small className="mb-4 leading-6 font-semibold capitalize text-primary">test</small>
      <h1>Cocky Wocky Test Page</h1>
      <p>Response</p>
      {isSubmittig ? (
        <Loading />
      ) : (
        <pre className="border border-outline bg-surface p-3">{JSON.stringify(response, null, 2)}</pre>
      )}

      <p>Error</p>
      <pre className="border border-outline bg-surface p-3">{JSON.stringify(error, null, 2)}</pre>
    </div>
  );
};

export default Page;

export const Head = () => {
  return <Seo title="Page Not Found" description="Blast!" slug="/404" />;
};
