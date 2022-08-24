import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'gatsby';

import Seo from '../components/seo';
import ThreeScene from '../components/three-scene';

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
    <Fragment>
      <small className="mb-4 leading-6 font-semibold capitalize text-primary">404</small>
      <h1>Page Not Found</h1>
      <p>Blast! The page you're looking for can't be found.</p>
      <Link to="/" className="block mb-16">
        Home
      </Link>

      <div className="grid gap-24 min-w-full">
        <section className="grid sm:grid-cols-2 gap-8">
          <div className="block overflow-x-scroll">
            <div className="flex justify-center w-full h-[405px] rounded border border-outline bg-surface" />
          </div>
          <div className="block overflow-x-scroll">
            <div className="flex justify-center w-full h-[405px] rounded border border-outline bg-surface cursor-move">
              {isLoading ? null : <ThreeScene locations={locations} />}
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Page;

export const Head = () => {
  return <Seo title="Page Not Found" description="Blast!" slug="/404" />;
};
