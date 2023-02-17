import React, { memo } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';

import { colors } from '../utils/color-class-names';

const AllTagsChart = memo(() => {
  const {
    allMdx: { nodes: tags }
  } = useStaticQuery(graphql`
    {
      allMdx(filter: { frontmatter: { tags: { ne: null } } }) {
        nodes {
          frontmatter {
            tags
          }
        }
      }
    }
  `);

  const tagData = tags
    .reduce((items, item) => {
      const {
        frontmatter: { tags }
      } = item;
      tags.map((tag) => items.push(tag));
      return items;
    }, [])
    .reduce((items, item) => {
      const existingItem = items.find((index) => index.tag === item);

      if (existingItem) {
        existingItem.count += 1;
      } else {
        items.push({
          tag: item,
          count: 1
        });
      }

      return items;
    }, [])
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
    .map((item, _, array) => {
      const { count } = item;
      const countTotal = array.reduce((a, b) => a + b.count, 0);
      const percentage = (count / countTotal) * 100;
      const remainder = 100 - percentage;
      return {
        ...item,
        percentage: percentage,
        remainder: remainder
      };
    });

  return (
    <div className="grid gap-8 rounded border border-outline bg-surface py-3 px-4 sm:px-6">
      <div className="relative max-w-[300px] mx-auto">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
          {tagData.map((tag, index) => {
            const { percentage, remainder } = tag;

            return (
              <circle
                className={`stroke-${colors[index]}`}
                key={index}
                cx="20"
                cy="20"
                r="15.91549430918954"
                strokeDasharray={`${percentage} ${remainder}`}
                strokeDashoffset={100 - tagData.slice(0, index).reduce((a, b) => a + b.percentage, 0) + 25}
                strokeWidth="6"
                fill="transparent"
              />
            );
          })}
        </svg>
        <div
          style={{
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%',
            textAlign: 'center'
          }}
        >
          <p className="m-0 leading-none font-semibold">Tags Analytics</p>
          <Link className="text-sm text-salmon" to="/dashboard">
            /dashboard
          </Link>
        </div>
      </div>
      <ul className="p-0 m-0">
        {tagData.map((item, index) => {
          const { tag, count } = item;
          return (
            <li key={index} className="grid grid-cols-1fr-auto items-center p-0 m-0 leading-normal">
              <div className="grid grid-cols-auto-1fr gap-4 items-center">
                <div className={`bg-${colors[index]} rounded-full w-3 h-3`} />
                <small className="m-0">{tag}</small>
              </div>
              <div className="font-semibold">{`x${count}`}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default AllTagsChart;
