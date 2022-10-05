import React, { useEffect, useState, useRef } from 'react';

import LatestReactionDom from '../components/latest-reaction-dom';
import { useInterval } from '../hooks/use-interval';

const LatestReaction = () => {
  const isMounted = useRef(false);

  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState({ title: '', reaction: '', slug: '', date: null });

  const getLatestReaction = async () => {
    isMounted.current = true;
    setIsLoading(true);
    try {
      const response = await (await fetch('/api/fauna-latest-reaction')).json();
      if (isMounted) {
        setResponse(response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 250);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useInterval(async () => {
    await getLatestReaction();
  }, 60000);

  useEffect(() => {
    getLatestReaction();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const { title, reaction, slug, date } = response;

  return (
    <LatestReactionDom
      hasJavascript={true}
      isLoading={isLoading}
      title={title}
      reaction={reaction}
      slug={slug}
      date={date}
    />
  );
};

export default LatestReaction;
