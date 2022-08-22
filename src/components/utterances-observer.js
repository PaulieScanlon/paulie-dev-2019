import React, { useState, useEffect, useRef } from 'react';

import UtterancesComments from '../components/utterances-comments';

const UtterancesObserver = () => {
  const ref = useRef(null);
  const [isChildVisible, setIsChildVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0) {
          setIsChildVisible(true);
        }
      },
      {
        root: null,
        rootMargin: '400px',
        threshold: 0
      }
    );
    if (ref && ref.current) {
      observer.observe(ref.current);
    }
  }, [ref]);

  return (
    <section ref={ref}>
      {isChildVisible ? (
        <UtterancesComments repo="PaulieScanlon/paulie-dev-2019-comments-repo" />
      ) : (
        <blockquote>Loading</blockquote>
      )}
    </section>
  );
};

export default UtterancesObserver;
