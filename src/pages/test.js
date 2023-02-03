import React from 'react';
import AllPublishersChart from '../components/all-publisher-chart';

const Page = () => {
  return (
    <div className="grid grid-cols-2 gap-8">
      <AllPublishersChart />
      <div />
    </div>
  );
};

export default Page;
