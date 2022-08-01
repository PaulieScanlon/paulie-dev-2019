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
          fields {
            slug
          }
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
        fields: { slug },
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

  const width = 500;
  const height = 230;
  const fontSize = 9;

  return (
    <div>
      <div className="rounded border border-outline bg-surface p-4">
        <svg viewBox={`0,0,${width},${height}`}>
          {postsByDay.map((item, g) => {
            const { day, data } = item;
            const xPad = postsByDay.length;
            const yPad = 16;
            const barWidth = width / (data.length * postsByDay.length) - xPad;
            const groupWidth = width / postsByDay.length;

            return (
              <g key={g}>
                <text
                  x={groupWidth * g + xPad + barWidth * 2 + fontSize / 2}
                  y={height}
                  className="fill-muted font-semibold"
                  style={{ fontSize: fontSize }}
                >
                  {day.toUpperCase()}
                </text>
                {data.map((year, i) => {
                  const { y } = year;
                  const inc = i + 1;
                  const barHeight = (y + 0.05) * 15;
                  const xPos = groupWidth * g + barWidth * inc + (xPad / 2) * inc;
                  const yPos = height - barHeight - yPad;
                  const labelSize = 7;
                  return (
                    <g>
                      {y > 0 ? (
                        <text
                          x={xPos + labelSize / 4}
                          y={yPos - 7}
                          className="fill-white font-semibold"
                          style={{ fontSize: labelSize }}
                        >{`x${y}`}</text>
                      ) : null}
                      <rect
                        key={i}
                        x={xPos}
                        y={yPos}
                        width={barWidth}
                        height={barHeight}
                        fill="transparent"
                        className={`stroke-${colors[i]}`}
                        strokeWidth={1.2}
                      />
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
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
