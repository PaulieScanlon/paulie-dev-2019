import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { groupBy } from '../utils/group-by';
import { colors } from '../utils/color-class-names';

const abbreviatedDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const years = ['2019', '2020', '2021', '2022'];

const AllDaysChart = () => {
  const defaultValues = () =>
    years.map((year) => {
      return {
        label: year,
        y: 0
      };
    });

  const {
    allMdx: { nodes: mdx }
  } = useStaticQuery(graphql`
    {
      allMdx(filter: { frontmatter: { status: { ne: "draft" }, type: { ne: "page" } } }) {
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

  const allMdxDays = mdx
    .map((node, index) => {
      const {
        slug,
        frontmatter: { date }
      } = node;

      const day = new Date(date).getDay();
      const fullYear = new Date(date).getFullYear();

      return {
        slug: slug,
        abbr: abbreviatedDays[day],
        fullYear: fullYear
      };
    })
    .reduce((rv, v) => {
      (rv[v.abbr] = rv[v.abbr] || []).push(v);

      return rv;
    }, {});

  const postsByDay = Object.keys(allMdxDays)
    .map((day) => {
      const groupedByYear = groupBy(allMdxDays[day], 'fullYear');
      const emptyData = defaultValues();

      const realData = Object.keys(groupedByYear).map((abbr) => {
        return {
          label: abbr,
          y: groupedByYear[abbr].length
        };
      });

      const uniqueItems = [];
      const combined = [...realData, ...emptyData];

      const unique = combined
        .filter((element) => {
          const isDuplicate = uniqueItems.includes(element.label);
          if (!isDuplicate) {
            uniqueItems.push(element.label);
            return true;
          }
          return false;
        })
        .sort((a, b) => years.indexOf(a.label) - years.indexOf(b.label))
        .map((data, index) => {
          const { label, y } = data;
          return {
            label: label,
            x: index,
            y: y
          };
        });

      return {
        day: day,
        data: unique
      };
    })
    .sort((a, b) => abbreviatedDays.indexOf(a.day) - abbreviatedDays.indexOf(b.day));

  return (
    <div>
      <div className="rounded border border-outline bg-surface p-4">
        <ul className="list-none m-0 p-0 grid gap-1 grid-cols-7 items-end">
          {postsByDay.map((item, index) => {
            const { day, data } = item;

            return (
              <li key={index} className="m-0 p-0 flex flex-col gap-3 items-center text-ceter">
                <div className="flex flex-col sm:flex-row gap-1 items-end">
                  {data.map((year, index) => {
                    const { y } = year;
                    const height = y * 25;
                    return (
                      <div key={index}>
                        <span className="text-sm font-semibold">{`x${y}`}</span>
                        <div className={`w-4 border-2 border-${colors[index]}`} style={{ height }} />
                      </div>
                    );
                  })}
                </div>
                <span className="uppercase text-muted text-sm font-semibold">{day}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <ul className="list-none m-0 p-0 flex text-sm">
        {years.map((year, index) => {
          return (
            <li key={index} className={`text-${colors[index]}`}>
              {year}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AllDaysChart;
