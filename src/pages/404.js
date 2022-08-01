import React from 'react';
import Seo from '../components/seo';

import AllTagsByYear from '../components/all-tags-by-year-chart';

const Page = () => {
  return (
    <div>
      <div className="grid grid-cols-2">
        <AllTagsByYear />
        <div />
      </div>
      <small className="mb-4 leading-6 font-semibold capitalize text-primary">404</small>
      <h1>Page Not Found</h1>
      <p>Blast! Thhe page you're looking for can't be found.</p>
    </div>
  );
};

export default Page;

export const Head = () => {
  return <Seo title="Page Not Found" description="Blast!" slug="/404" />;
};
