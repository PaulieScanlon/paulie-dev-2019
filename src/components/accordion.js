import React, { useState, memo, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import AccordionItem from './accordion-item';

const Accordion = memo(({ reactions }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <Fragment>
      {reactions.data
        .sort((a, b) => b.total - a.total)
        .map((item, index) => {
          const { title, total, posts } = item;

          const arrs = Object.values(posts);

          return (
            <AccordionItem
              key={index}
              title={title}
              total={total}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            >
              {arrs
                .sort((a, b) => b.length - a.length)
                .map((item, index) => {
                  const { slug } = item[0];
                  return (
                    <li key={index} className="p-0 m-0 grid grid-cols-1fr-auto gap-2 justify-between">
                      <Link to={slug} className="text-sm">
                        {slug}
                      </Link>
                      <div className="font-semibold text-sm ">{`x${item.length}`}</div>
                    </li>
                  );
                })}
            </AccordionItem>
          );
        })}
    </Fragment>
  );
});

Accordion.propTypes = {
  /** Reaction Data */
  reactions: PropTypes.any.isRequired
};

export default Accordion;
