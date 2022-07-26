import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { groupBy } from '../utils/group-by';

import LineChart from './line-chart';

const data = [
  { label: 'S', x: 0, y: 0 },
  { label: 'M', x: 1, y: 400 },
  { label: 'T', x: 2, y: 300 },
  { label: 'W', x: 3, y: 100 },
  { label: 'TH', x: 4, y: 400 },
  { label: 'F', x: 5, y: 500 },
  { label: 'S', x: 6, y: 400 }
];

const abbreviatedMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];

const AllYearsChart = () => {
  const defaultValues = (year) =>
    abbreviatedMonths.map((month) => {
      return {
        slug: '',
        abbr: month,
        index: 0,
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

  //   const groupByYear = groupBy(allMdxYears, 'fullYear');
  console.log(allMdxYears);

  //   console.log(groupByYear);

  //   const posytsByMonth = Object.keys(groupByYear).map((year) => {
  //     const emptyMonths = defaultValues(year);
  //     const grouped = groupBy([...emptyMonths, ...groupByYear[year]], 'abbr');

  //     return {
  //       [year]: Object.keys(grouped).map((month, index) => {
  //         return grouped[month].reduce((rv, x) => {
  //           rv[index] = rv[index] || { label: x.abbr, x: index, y: 0 };
  //           rv[index].y += 1;

  //           return rv;
  //         }, {});
  //       })
  //     };
  //   });

  //   console.log(posytsByMonth[2][2021]);
  //   console.log(data);
  //   console.log(JSON.stringify(posytsByMonth, null, 2));
  return (
    <div>
      <LineChart width={500} height={300} data={data} horizontalGuides={5} precision={2} verticalGuides={1} />
    </div>
  );
};

export default AllYearsChart;
