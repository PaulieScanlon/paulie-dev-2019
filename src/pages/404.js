import React from 'react';
import Seo from '../components/seo';

import AllDaysChart from '../components/all-days-chart';

const Page = () => {
  return (
    <div>
      <small className="mb-4 leading-6 font-semibold capitalize text-primary">404</small>
      <h1>Page Not Found</h1>
      <p>Blast! The page you're looking for can't be found.</p>
      <AllDaysChart />
    </div>
  );
};

export default Page;

export const Head = () => {
  return <Seo title="Page Not Found" description="Blast!" slug="/404" />;
};
