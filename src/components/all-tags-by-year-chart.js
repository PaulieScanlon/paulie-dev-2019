import React, { useMemo } from 'react';

// https://medium.com/@brianfoody/jogging-your-geometry-memory-by-building-an-svg-radar-chart-in-react-native-4aeee555809f

const radarData = [
  { label: 'Acceleration', value: 86 },
  { label: 'Agility', value: 58 },
  { label: 'Clutch', value: 60 },
  { label: 'Speed', value: 85 },
  { label: 'Stamina', value: 60 },
  { label: 'Strength', value: 90 }
];

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

const AllTagsByYear = ({ size }) => {
  const viewBoxSize = size || 120;
  const viewBoxCenter = viewBoxSize * 0.5;
  const radius = viewBoxSize * 0.4;

  const rings = new Array(3).fill(null);

  const calculateEdgePoint = useMemo(() => calculateEdgePointFn(viewBoxCenter, radius), [radius]);

  return (
    <div className="rounded border border-outline bg-surface">
      <svg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
        <circle
          cx={viewBoxCenter}
          cy={viewBoxCenter}
          r={radius}
          className="stroke-muted"
          strokeOpacity="0.3"
          strokeWidth="0.2"
          fill="transparent"
        />
        {rings.map((_, index) => {
          return (
            <g key={index}>
              <circle
                cx={viewBoxCenter}
                cy={viewBoxCenter}
                r={(index + 1) * radius * 0.25}
                className="stroke-muted"
                strokeOpacity="0.3"
                strokeWidth="0.2"
                fill="transparent"
              />
              <line
                x1={calculateEdgePoint(index * 60)[0]}
                y1={calculateEdgePoint(index * 60)[1]}
                x2={calculateEdgePoint(index * 60 + 180)[0]}
                y2={calculateEdgePoint(index * 60 + 180)[1]}
                className="stroke-muted"
                strokeOpacity="0.3"
                strokeWidth="0.2"
                fill="transparent"
              />
            </g>
          );
        })}
        <polygon
          className="stroke-muted"
          strokeOpacity="0.9"
          strokeWidth="0.5"
          fill="transparent"
          points={`${radarData.map((data, index) => {
            const { value } = data;
            const edgePoint = calculateEdgePoint(index * 60, value / 100);
            return `${edgePoint[0]},${edgePoint[1]}`;
          })}`}
        />
        {radarData.map((data, index) => {
          const { label, value } = data;
          const edgePoint = calculateEdgePoint(index * 60, value / 100);
          const labelSize = 3;
          return (
            <text
              key={index}
              className="fill-white font-semibold"
              style={{ fontSize: labelSize }}
              x={edgePoint[0] - labelSize * 2}
              y={edgePoint[1]}
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default AllTagsByYear;
