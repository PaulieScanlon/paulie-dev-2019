import React, { useEffect, useState, useRef, Fragment } from 'react';
import PropTypes from 'prop-types';

const SiteViewChart = ({ error, data }) => {
  const svgRef = useRef();
  const [tooltip, setTooltip] = useState(null);

  const chartWidth = 600;
  const chartHeight = 300;
  const offsetY = 40;
  const paddingX = 50;
  const paddingY = 50;
  const maxY = data ? Math.max(...data.map((item) => item.value)) : null;
  const guides = [...Array(8).keys()];
  const barWidth = 12;
  const tooltipWidth = 120;
  const tooltipHeight = 70;

  const properties = data.map((property, index) => {
    const { value, date, tooltip_date, tick_date } = property;
    const x = (index / data.length) * (chartWidth - paddingX) + paddingX / 2;
    const y = chartHeight - offsetY - (value / maxY) * (chartHeight - (paddingY + offsetY)) - paddingY + offsetY;
    return {
      value: value,
      date: date,
      tooltip_date: tooltip_date,
      tick_date: tick_date,
      x: x,
      y: y
    };
  });

  const points = properties.map((point) => {
    const { x, y } = point;
    return `${x},${y}`;
  });

  const handleClick = ({ value, tooltip_date, x, y }) => {
    const bcr = svgRef.current.getBoundingClientRect();
    const safe_x = x > bcr.width / 2 ? x - tooltipWidth : x;
    const safe_y = y < bcr.height / 2 ? y : y - tooltipHeight;

    setTooltip({
      value: value,
      tooltip_date: tooltip_date,
      x: safe_x,
      y: safe_y
    });
  };

  const handleClose = () => {
    setTooltip(null);
  };

  useEffect(() => {
    setTooltip(null);
  }, [data]);

  return (
    <div className="border rounded border-outline bg-surface p-2 pb-4">
      {error ? (
        <div className="h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-red-400 text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            {error}
          </div>
        </div>
      ) : null}

      <svg ref={svgRef} viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="presentation">
        {data ? (
          <Fragment>
            {guides.map((_, index) => {
              const ratio = index / guides.length;
              const y = chartHeight - paddingY - chartHeight * ratio;

              return (
                <polyline
                  key={index}
                  className="stroke-guide"
                  fill="none"
                  strokeWidth={1}
                  points={`${paddingX / 2},${y} ${chartWidth - paddingX / 2},${y}`}
                />
              );
            })}

            <polyline fill="none" className="stroke-salmon" strokeWidth={1} points={points} />

            {properties.map((property, index) => {
              const { value, tooltip_date, tick_date, x, y } = property;

              return (
                <Fragment key={index}>
                  <rect
                    x={x - barWidth / 2}
                    y={0}
                    width={barWidth}
                    height={chartHeight - paddingY}
                    className="fill-transparent hover:fill-muted/10 cursor-pointer"
                    onClick={() => handleClick({ value, tooltip_date, x, y })}
                  />

                  <circle
                    cx={x}
                    cy={y}
                    r={4}
                    className="stroke-salmon fill-surface pointer-events-none"
                    strokeWidth={1.6}
                  />

                  <g transform={`translate(${x} ${chartHeight - (paddingY - offsetY / 1.7)})`}>
                    <text
                      transform="rotate(45)"
                      textAnchor="start"
                      transformorigin="50% 50%"
                      fontSize={10}
                      className="fill-muted select-none"
                    >
                      {tick_date}
                    </text>
                  </g>
                </Fragment>
              );
            })}
          </Fragment>
        ) : null}

        {tooltip ? (
          <g className="transition-all duration-300 ease-in-out" transform={`translate(${tooltip.x}, ${tooltip.y})`}>
            <rect width={tooltipWidth} height={tooltipHeight} className="fill-surface/90 stroke-guide" rx={3} ry={3} />
            <circle
              cx={tooltipWidth}
              width={10}
              height={10}
              className="fill-guide cursor-pointer transition-all duration-200 hover:fill-muted"
              r={10}
              onClick={handleClose}
            />
            <circle
              cx={tooltipWidth}
              width={10}
              height={10}
              style={{
                transformOrigin: 'center',
                transformBox: 'fill-box'
              }}
              className="fill-secondary/60 select-none pointer-events-none motion-safe:animate-ping opacity-30"
              r={10}
            />
            <text x={tooltipWidth - 3.2} y={3.4} className="fill-white text-[14px] select-none pointer-events-none">
              x
            </text>
            <text
              x={tooltipWidth / 2}
              y={18}
              textAnchor="middle"
              className="uppercase font-bold tracking-widest text-[10px] fill-slate-300"
            >
              Site Visits
            </text>
            <text x={tooltipWidth / 2} y={40} textAnchor="middle" className="fill-salmon font-bold">
              {tooltip.value}
            </text>
            <text x={tooltipWidth / 2} y={58} textAnchor="middle" className="fill-slate-300 text-[10px]">
              {tooltip.tooltip_date}
            </text>
          </g>
        ) : null}
      </svg>
    </div>
  );
};

SiteViewChart.propTypes = {
  /** The Error message */
  error: PropTypes.string,
  /** The data returned Google Analytics */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      tooltip_date: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  )
};

export default SiteViewChart;
