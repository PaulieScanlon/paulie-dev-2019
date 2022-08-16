import React from 'react';
import { Link } from 'gatsby';

import Seo from '../components/seo';

const Page = () => {
  return (
    <div>
      <small className="mb-4 leading-6 font-semibold capitalize text-primary">404</small>
      <h1>Page Not Found</h1>
      <p>Blast! The page you're looking for can't be found.</p>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Page;

export const Head = () => {
  return <Seo title="Page Not Found" description="Blast!" slug="/404" />;
};
