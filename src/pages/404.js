import React from 'react';

import LatestReaction from '../components/latest-reaction';

const Page = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <LatestReaction />
    </div>
  );
};

export default Page;

export const Head = () => {
  return <title>Page Not Found</title>;
};
