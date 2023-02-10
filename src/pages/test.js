import React, { useEffect, useState } from 'react';

const Page = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/api/ga-analytics');

        if (!response.ok) {
          throw new Error('Error');
        }

        const json = await response.json();
        console.log(json.data);

        setData(json.data);
      } catch (error) {
        setData(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <pre>{JSON.stringify(data.rows, null, 2)}</pre>
      <div />
    </div>
  );
};

export default Page;
