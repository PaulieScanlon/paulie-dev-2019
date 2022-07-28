import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { groupBy } from '../utils/group-by';

import LinePlot from './line-plot';
import LinePolyline from './line-polyline';

const abbreviatedMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];

const AllYearsChart = () => {
  const defaultValues = () =>
    abbreviatedMonths.map((abbr) => {
      return {
        label: abbr,
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

  const allMdxYears = mdx
    .map((node, index) => {
      const {
        slug,
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

  const posytsByYear = Object.keys(allMdxYears).map((year) => {
    const groupedByMonth = groupBy(allMdxYears[year], 'abbr');
    const emptyData = defaultValues();

    const realData = Object.keys(groupedByMonth).map((abbr) => {
      return {
        label: abbr,
        y: groupedByMonth[abbr].length
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
        const { label, y } = data;
        return {
          label: label,
          x: index,
          y: y
        };
      });

    return {
      year: year,
      data: unique
    };
  });

  return (
    <div>
      <div className="border rounded border-outline bg-surface pl-2 sm:pl-6 pb-3 sm:pb-8 pt-1 sm:pt-2">
        <LinePlot
          width={500}
          height={230}
          xPad={30}
          yPad={20}
          xLines={5}
          yLines={9}
          color="#2d2a58"
          labels={posytsByYear[0].data}
          maxX={11}
          maxY={13}
        >
          <LinePolyline data={posytsByYear[0].data} color="#f056c7" showAmt={true} />
          <LinePolyline data={posytsByYear[1].data} color="#8b87ea" showAmt={true} />
          <LinePolyline data={posytsByYear[2].data} color="#58e6d9" showAmt={true} />
          <LinePolyline data={posytsByYear[3].data} color="#ffc107" showAmt={true} />
        </LinePlot>
      </div>
      <ul className="list-none m-0 p-0 flex text-sm">
        <li className="text-primary">2019</li>
        <li className="text-secondary">2020</li>
        <li className="text-tertiary">2021</li>
        <li className="text-yellow">2022</li>
      </ul>
    </div>
  );
};

export default AllYearsChart;
