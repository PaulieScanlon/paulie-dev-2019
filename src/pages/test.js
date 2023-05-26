import React, { useEffect, useState } from 'react';
import faunaAllReactionsUtil from '../utils/fauna-all-reactions-util';

const Page = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getReactions = async () => {
      try {
        const response = await faunaAllReactionsUtil();

        setData(response);
      } catch (error) {
        console.error(error);
      }
    };

    getReactions();
  }, []);

  return (
    <div className="">
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <div />
    </div>
  );
};

export default Page;
