import React, { memo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { publisherColors } from '../utils/color-class-names';

const AllPublisherChart = memo(() => {
  const {
    allMdx: { nodes }
  } = useStaticQuery(graphql`
    {
      allMdx(
        filter: { frontmatter: { status: { ne: "draft" }, type: { eq: "article" } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          frontmatter {
            publication
            logo
          }
        }
      }
    }
  `);

  const postsByPublication = nodes
    .reduce((items, item) => {
      const {
        frontmatter: { publication, logo }
      } = item;

      const existingItem = items.find((index) => index.label === publication);

      if (existingItem) {
        existingItem.total += 1;
      } else {
        items.push({
          label: publication,
          total: 1,
          logo: logo
        });
      }

      return items;
    }, [])
    .sort((a, b) => b.total - a.total);

  const chartWidth = 300;
  const chartHeight = 300;
  const barHeight = 10;
  const barGap = 12;
  const offsetLeft = 30;
  const offsetRight = 2;
  const paddingX = 60;
  const paddingY = 50;
  const imageSize = 16;
  const maxX = Math.max(...postsByPublication.map((data) => data.total));
  const guides = [...Array(8).keys()];

  const properties = postsByPublication.map((publisher, index) => {
    const { total, label, logo } = publisher;
    const width =
      chartWidth - offsetLeft - (total / maxX) * (chartWidth - (paddingX + offsetLeft)) - paddingX + offsetLeft;
    const y = (index / postsByPublication.length) * chartHeight + paddingY / 2;
    return {
      width: total > 0 ? chartWidth - width : 1,
      y: y,
      total: total,
      label: label,
      logo: logo
    };
  });

  return (
    <div className="grid gap-8  rounded border border-outline bg-surface py-3 px-4 sm:px-6">
      <div className="relative max-w-[300px] mx-auto">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
          {guides.map((_, index) => {
            const ratio = index / guides.length;
            const x = chartWidth - offsetRight - chartWidth * ratio;

            return (
              <polyline
                key={index}
                className="stroke-guide"
                fill="none"
                strokeWidth={0.6}
                points={`${x} ${chartWidth - paddingY / 2}, ${x} ${paddingY / 2}`}
              />
            );
          })}
          {properties.map((property, index) => {
            const { width, y, total, logo, label } = property;

            const color = publisherColors[label.toLowerCase().replace(' ', '-')];

            const barX = offsetLeft;
            const barY = y + (barHeight - barGap) * index;

            return (
              <g key={index}>
                <rect
                  x={barX}
                  y={barY}
                  width={width}
                  height={barHeight}
                  fill="transparent"
                  stroke={color}
                  className="fill-surface"
                  strokeWidth={1.2}
                />
                <text
                  x={barX}
                  y={barY - 8}
                  textAnchor="left"
                  fontSize={13}
                  className="fill-white font-semibold select-none"
                >
                  {`x${total}`}
                </text>
                <image
                  href={logo}
                  width={imageSize}
                  height={imageSize}
                  x={barX - imageSize * 1.9}
                  y={barY - imageSize / 4}
                />
              </g>
            );
          })}
        </svg>
      </div>
      <ul className="p-0 m-0">
        {postsByPublication
          .sort((a, b) => b.count - a.count)
          .map((item, index) => {
            const { label, total } = item;
            const color = publisherColors[label.toLowerCase().replace(' ', '-')];
            return (
              <li key={index} className="grid grid-cols-1fr-auto items-center p-0 m-0 leading-normal">
                <div className="grid grid-cols-auto-1fr gap-4 items-center">
                  <div className="rounded-full w-3 h-3" style={{ backgroundColor: color }} />
                  <small className="m-0">{label}</small>
                </div>
                <div className="font-semibold">{`x${total}`}</div>
              </li>
            );
          })}
      </ul>
    </div>
  );
});

export default AllPublisherChart;
