import React, { memo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { groupBy } from '../utils/group-by';
import { colors } from '../utils/color-class-names';

const abbreviatedDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const years = ['2019', '2020', '2021', '2022', '2023'];

const AllDaysChart = memo(() => {
  const defaultValues = () =>
    years.map((year) => {
      return {
        total: 0,
        label: year
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
          total: groupedByYear[abbr].length,
          label: abbr
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
          const { total, label } = data;
          return {
            total: total,
            label: label
          };
        });

      return {
        day: day,
        data: unique
      };
    })
    .sort((a, b) => abbreviatedDays.indexOf(a.day) - abbreviatedDays.indexOf(b.day));

  const chartWidth = 600;
  const chartHeight = 300;
  const barWidth = 10;
  const barGap = 3;
  const offsetY = 40;
  const paddingX = 30;
  const paddingY = 50;
  const maxY = Math.max(...postsByDay.map((arr) => arr.data.map((data) => data.total * 1.2)).flat(1));
  const guides = [...Array(8).keys()];

  const properties = postsByDay.map((property, index) => {
    const { data } = property;

    const x = (index / abbreviatedDays.length) * chartWidth + paddingX / 2;

    const days = data.map((d) => {
      const { total, label } = d;
      const height = chartHeight - offsetY - (total / maxY) * (chartHeight - (paddingY + offsetY)) - paddingY + offsetY;
      return {
        total: total,
        label: label,
        height: total > 0 ? chartHeight - height : 1
      };
    });

    return {
      days: days,
      x: x
    };
  });

  const ticks = abbreviatedDays.map((abbr, index) => {
    const x = (index / abbreviatedDays.length) * chartWidth + paddingX / 2;
    return {
      abbr: abbr,
      x: x
    };
  });

  return (
    <div>
      <div className="border rounded border-outline bg-surface p-2 pb-4">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="presentation">
          {guides.map((_, index) => {
            const ratio = index / guides.length;
            const y = chartHeight - offsetY - chartHeight * ratio;

            return (
              <polyline
                key={index}
                className="stroke-guide"
                fill="none"
                strokeWidth={0.6}
                points={`${paddingX / 2},${y} ${chartWidth - paddingX / 2},${y}`}
              />
            );
          })}

          {properties.map((property, index) => {
            const { x, days } = property;

            return (
              <g key={index}>
                {days.map((d, i) => {
                  const { height, total } = d;

                  const barX = x + (barWidth + barGap) * i;
                  const barY = chartHeight - height - offsetY;

                  return (
                    <g key={i}>
                      <rect
                        x={barX}
                        y={barY}
                        width={barWidth}
                        height={height}
                        fill="transparent"
                        className={`stroke-${colors[i]} fill-surface`}
                        strokeWidth={1.2}
                      />
                      {total > 0 ? (
                        <text
                          x={barX + 5}
                          y={barY - 8}
                          textAnchor="middle"
                          fontSize={10}
                          className="fill-white font-semibold select-none"
                        >
                          {`x${total}`}
                        </text>
                      ) : null}
                    </g>
                  );
                })}
              </g>
            );
          })}

          {ticks.map((tick, index) => {
            const { abbr, x } = tick;

            return (
              <text
                key={index}
                x={x + barWidth * (properties[0].days.length / 2) + 4}
                y={chartHeight - (paddingY - offsetY)}
                textAnchor="middle"
                fontSize={10}
                className="fill-muted font-semibold uppercase select-none"
              >
                {abbr}
              </text>
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
});

export default AllDaysChart;
