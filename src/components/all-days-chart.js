import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { groupBy } from '../utils/group-by';
import { colors } from '../utils/color-class-names';

const abbreviatedDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const AllDaysChart = () => {
  const {
    allMdx: { nodes: mdx }
  } = useStaticQuery(graphql`
    {
      allMdx(filter: { frontmatter: { type: { ne: "page" } } }) {
        nodes {
          slug
          frontmatter {
            title
            date
          }
        }
      }
    }
  `);

  const allAbbreviatedMdxDays = mdx.map((node) => {
    const {
      slug,
      frontmatter: { date }
    } = node;

    const index = new Date(date).getDay();

    return {
      abbr: abbreviatedDays[index],
      slug: slug
    };
  });

  const groupByDay = groupBy(allAbbreviatedMdxDays, 'abbr');

  const postsByDay = Object.keys(groupByDay)
    .map((day) => {
      const partialValue = groupByDay[day].length;
      const totalValue = allAbbreviatedMdxDays.length;
      return {
        day,
        count: partialValue,
        percent: (100 * partialValue) / totalValue
      };
    })
    .sort((a, b) => abbreviatedDays.indexOf(a.day) - abbreviatedDays.indexOf(b.day));

  return (
    <div className="rounded border border-outline bg-surface">
      <ul className="list-none m-0 p-0 grid grid-cols-7">
        {postsByDay.map((post, index) => {
          const { day, count, percent } = post;
          return (
            <li className="m-0 p-0 text-center text-sm p-2 h-[300px] flex flex-col gap-2 justify-end" key={index}>
              <span className="font-semibold"> {`x${count}`}</span>
              <div className={`w-full bg-${colors[index]}`} style={{ height: `${percent * 2}%` }}></div>
              <span className="uppercase">{day}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AllDaysChart;
