import React, { useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

// https://medium.com/@brianfoody/jogging-your-geometry-memory-by-building-an-svg-radar-chart-in-react-native-4aeee555809f

const degToRadians = (degrees) => {
  const pi = Math.PI;
  return degrees * (pi / 180);
};

const svgY = (degrees) => degrees + 180;

const calculateEdgePointFn =
  (center, radius) =>
  (degree, scale = 1) => {
    const degreeInRadians = degToRadians(degree);
    const degreeInRadiansY = degToRadians(svgY(degree));
    return [center + Math.cos(degreeInRadians) * radius * scale, center + Math.sin(degreeInRadiansY) * radius * scale];
  };

const AllPublisherChart = ({ size }) => {
  const {
    allMdx: { nodes }
  } = useStaticQuery(graphql`{
  allMdx(
    filter: {frontmatter: {status: {ne: "draft"}, type: {eq: "article"}}}
    sort: {frontmatter: {date: DESC}}
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

  const publisherData = nodes
    .reduce((items, item) => {
      const {
        frontmatter: { publication, logo }
      } = item;

      const existingItem = items.find((index) => index.label === publication);

      if (existingItem) {
        existingItem.count += 1;
      } else {
        items.push({
          label: publication,
          count: 1,
          logo: logo
        });
      }

      return items;
    }, [])
    .sort((a, b) => b.count - a.count)
    .slice(1)
    .sort((a, b) => a.count - b.count);

  const viewBoxSize = size || 180;
  const viewBoxCenter = viewBoxSize * 0.5;
  const radius = viewBoxSize / 2;
  const guides = [...Array(5).keys()];

  const calculateEdgePoint = useMemo(() => calculateEdgePointFn(viewBoxCenter, radius), [viewBoxCenter, radius]);

  return (
    <div className="grid gap-8 rounded border border-outline bg-surface py-3 px-4 sm:px-6">
      <div className="relative mx-auto">
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        >
          {guides.map((_, index) => {
            return (
              <g key={index}>
                <circle
                  cx={viewBoxCenter}
                  cy={viewBoxCenter}
                  r={index * radius * 0.25}
                  className="stroke-guide"
                  strokeWidth="0.5"
                  fill="transparent"
                />
                <line
                  x1={calculateEdgePoint(index * 60)[0]}
                  y1={calculateEdgePoint(index * 60)[1]}
                  x2={calculateEdgePoint(index * 60 + 180)[0]}
                  y2={calculateEdgePoint(index * 60 + 180)[1]}
                  className="stroke-guide"
                  strokeWidth="0.5"
                  fill="transparent"
                />
              </g>
            );
          })}
          <polygon
            className="stroke-muted"
            strokeWidth="1"
            fill="transparent"
            points={`${publisherData.map((data, index) => {
              const { count } = data;
              const edgePoint = calculateEdgePoint(index * 60, count / publisherData.length);
              return `${edgePoint[0]},${edgePoint[1]}`;
            })}`}
          />
          {publisherData.map((data, index) => {
            const { count, logo } = data;
            const edgePoint = calculateEdgePoint(index * 60, count / publisherData.length);
            const xPos = edgePoint[0];
            const yPos = edgePoint[1];
            const imageSize = 12;

            return (
              <image
                key={index}
                href={logo}
                width={imageSize}
                height={imageSize}
                x={xPos - imageSize / 2}
                y={yPos - imageSize / 2}
              />
            );
          })}
        </svg>
      </div>
      <ul className="p-0 m-0">
        {publisherData
          .sort((a, b) => b.count - a.count)
          .map((item, index) => {
            const { label, count, logo } = item;
            return (
              <li key={index} className="grid grid-cols-1fr-auto items-center p-0 m-0 leading-normal">
                <div className="grid grid-cols-auto-1fr gap-4 items-center">
                  <img src={logo} className="m-0 w-4 h-4" alt={label} />
                  <small className="m-0">{label}</small>
                </div>
                <div className="font-semibold">{`x${count}`}</div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default AllPublisherChart;
