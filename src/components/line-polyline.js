import React from 'react';

const LinePolyline = ({ data, color, width, height, xPad, yPad, maxX, maxY }) => {
  const chartWidth = width - xPad * 2;
  const chartHeight = height - yPad * 2;

  const points = data
    .map((element) => {
      const x = (element.x / maxX) * chartWidth + xPad;
      const y = chartHeight - (element.y / maxY) * chartHeight + yPad;
      return `${x},${y}`;
    })
    .join(' ');

  return <polyline fill="none" stroke={color} strokeWidth={1} points={points} />;
};

export default LinePolyline;
