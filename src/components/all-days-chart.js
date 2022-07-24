import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import { groupBy } from '../utils/group-by';
import { colors } from '../utils/color-class-names';

const abbreviatedDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const AllDaysChart = ({ year }) => {
  const defaultValues = abbreviatedDays.map((day) => {
    return {
      abbr: day,
      slug: '',
      fullYear: year
    };
  });

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

  const allAbbreviatedMdxDays = mdx
    .map((node) => {
      const {
        slug,
        frontmatter: { date }
      } = node;

      const day = new Date(date).getDay();
      const fullYear = new Date(date).getFullYear();

      return {
        abbr: abbreviatedDays[day],
        slug: slug,
        fullYear: fullYear
      };
    })
    .filter((post) => post.fullYear === year);

  const combined = [...defaultValues, ...allAbbreviatedMdxDays];

  const groupByDay = groupBy(combined, 'abbr');

  const postsByDay = Object.keys(groupByDay)
    .map((day) => {
      const partialValue = groupByDay[day].length;
      // const totalValue = combined.length;
      const totalValue = 40;
      return {
        day,
        count: partialValue,
        percent: (100 * partialValue) / totalValue
      };
    })
    .sort((a, b) => abbreviatedDays.indexOf(a.day) - abbreviatedDays.indexOf(b.day));

  return (
    <div className="rounded border border-outline bg-surface p-4">
      <h2 className="m-0 flex justify-between font-normal items-center text-muted">
        <span className="text-xl font-bold">{year}</span>
        <span className="text-sm">{`Total: x${combined.length}`}</span>
      </h2>
      <ul className="list-none m-0 p-0 grid grid-cols-7">
        {postsByDay.map((post, index) => {
          const { day, count, percent } = post;
          return (
            <li className="m-0 p-1 text-center text-sm h-[200px] flex flex-col gap-1 justify-end" key={index}>
              <span className="font-semibold"> {`x${count}`}</span>
              <div className={`w-full mx-auto bg-${colors[index]}`} style={{ height: `${percent * 2}%` }}></div>
              <span className="uppercase text-muted">{day}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

AllDaysChart.propTypes = {
  /** The year to display data for */
  year: PropTypes.number.isRequired
};

export default AllDaysChart;
