import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { groupBy } from '../utils/group-by';
import { colors } from '../utils/color-class-names';

const abbreviatedMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
const years = ['2019', '2020', '2021', '2022', '2023'];

const AllYearsChart = () => {
  const defaultValues = () =>
    abbreviatedMonths.map((abbr) => {
      return {
        total: 0,
        label: abbr
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

  const allMdxYears = mdx
    .map((node, index) => {
      const {
        fields: { slug },
        frontmatter: { date }
      } = node;

      const month = new Date(date).getMonth();
      const fullYear = new Date(date).getFullYear();

      return {
        slug: slug,
        abbr: abbreviatedMonths[month],
        fullYear: fullYear
      };
    })
    .reduce((rv, v) => {
      (rv[v.fullYear] = rv[v.fullYear] || []).push(v);

      return rv;
    }, {});

  const postsByYear = Object.keys(allMdxYears).map((year) => {
    const groupedByMonth = groupBy(allMdxYears[year], 'abbr');
    const emptyData = defaultValues();

    const realData = Object.keys(groupedByMonth).map((abbr) => {
      return {
        total: groupedByMonth[abbr].length,
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
      .sort((a, b) => abbreviatedMonths.indexOf(a.label) - abbreviatedMonths.indexOf(b.label))
      .map((data, index) => {
        const { total, label } = data;
        return {
          total: total,
          label: label
        };
      });

    return {
      year: year,
      data: unique
    };
  });

  const chartWidth = 600;
  const chartHeight = 300;
  const offsetY = 40;
  const paddingX = 50;
  const paddingY = 50;
  const maxY = Math.max(...postsByYear.map((arr) => arr.data.map((data) => data.total)).flat(1));
  const guides = [...Array(8).keys()];

  const properties = postsByYear.map((property) => {
    const { data } = property;

    return data.map((d, index) => {
      const { total, label } = d;
      const x = (index / data.length) * chartWidth + paddingX / 2;
      const y = chartHeight - offsetY - (total / maxY) * (chartHeight - (paddingY + offsetY)) - paddingY + offsetY;
      return {
        total: total,
        label: label,
        x: x,
        y: y
      };
    });
  });

  const points = properties.map((point) => {
    return point.map((p) => {
      const { x, y } = p;
      return `${x},${y}`;
    });
  });

  const ticks = abbreviatedMonths.map((abbr, index) => {
    const x = (index / abbreviatedMonths.length) * chartWidth + paddingX / 2;
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

          {points.map((point, index) => {
            return (
              <polyline key={index} fill="none" className={`stroke-${colors[index]}`} strokeWidth={1} points={point} />
            );
          })}

          {properties.map((property, index) => {
            return property.map((p, i) => {
              const { total, x, y } = p;

              return (
                <g key={i}>
                  <circle className={`stroke-${colors[index]} fill-surface`} cx={x} cy={y} r={3} strokeWidth={1} />
                  {total > 0 ? (
                    <text
                      x={x}
                      y={y - 8}
                      textAnchor="middle"
                      fontSize={10}
                      className="fill-white font-semibold select-none"
                    >
                      {`x${total}`}
                    </text>
                  ) : null}
                </g>
              );
            });
          })}

          {ticks.map((tick, index) => {
            const { abbr, x } = tick;

            return (
              <text
                key={index}
                x={x}
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
};

export default AllYearsChart;
