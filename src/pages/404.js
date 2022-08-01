import React from 'react';

import AllDaysChart from '../components/all-days-chart';

const Page = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <AllDaysChart />{' '}
    </div>
  );
};

export default Page;

export const Head = () => {
  return <title>Page Not Found</title>;
};
