import React, { Fragment } from 'react';
import { colors } from '../utils/color-class-names';

const LinePolyline = ({ data, index = 0, width, height, xPad, yPad, maxX, maxY, showAmt = false }) => {
  const chartWidth = width - xPad * 2;
  const chartHeight = height - yPad * 2;

  const fontSize = 7;

  const points = data.map((element) => {
    const x = (element.x / maxX) * chartWidth + xPad;
    const y = chartHeight - (element.y / maxY) * chartHeight + yPad;
    return `${x},${y}`;
  });

  return (
    <g>
      {showAmt
        ? data.map((element, index) => {
            const { y } = element;
            const data = points[index].split(',');
            const xPos = data[0] - fontSize / 2;
            const yPos = data[1] - fontSize / 2;

            return (
              <Fragment key={index}>
                {y > 0 ? (
                  <text
                    x={xPos}
                    y={yPos}
                    className="fill-white font-semibold"
                    style={{ fontSize: fontSize }}
                  >{`x${y}`}</text>
                ) : null}
              </Fragment>
            );
          })
        : null}
      <polyline fill="none" className={`stroke-${colors[index]}`} strokeWidth={1} points={points.join(' ')} />;
    </g>
  );
};

export default LinePolyline;
