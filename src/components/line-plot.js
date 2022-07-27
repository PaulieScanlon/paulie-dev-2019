import React, { Fragment, cloneElement } from 'react';

const LinePlot = ({
  width,
  height,
  xPad,
  yPad,
  xLines,
  yLines,
  color,
  labels,
  fontSize = 10,
  maxX,
  maxY,
  ...props
}) => {
  const XLabel = () => {
    const y = height - yPad + 20;
    return labels.map((element, index) => {
      const x = (element.x / 13) * width + xPad;
      return (
        <text
          key={index}
          x={x}
          y={y}
          className="fill-muted font-semibold"
          style={{
            fontSize: fontSize
          }}
        >
          {element.label.toUpperCase()}
        </text>
      );
    });
  };

  const XGuides = () => {
    const startX = xPad;
    const endX = width - xPad;

    return new Array(xLines + 1).fill(null).map((_, index) => {
      const ratio = index / xLines;

      const yCoordinate = height * ratio + yPad;

      return (
        <Fragment key={index}>
          <polyline
            fill="none"
            stroke={color}
            strokeWidth=".5"
            points={`${startX},${yCoordinate} ${endX},${yCoordinate}`}
          />
        </Fragment>
      );
    });
  };

  const YLabel = () => {
    const yInc = ['0', '2', '4', '6', '8', '10', '12'];

    return yInc.map((inc, index) => {
      const ratio = index / (yInc.length + 1);
      const yCoordinate = height - height * ratio - yPad - 4;

      return (
        <text
          key={index}
          x={2}
          y={yCoordinate}
          className="fill-muted font-semibold"
          style={{
            fontSize: fontSize
          }}
        >
          {inc}
        </text>
      );
    });
  };

  const YGuides = () => {
    const startY = yPad;
    const endY = height - xPad / 2;

    return new Array(yLines + 1).fill(null).map((_, index) => {
      const ratio = index / yLines;

      const xCoordinate = xPad + ratio * (width - xPad * 2);

      return (
        <Fragment key={index}>
          <polyline
            fill="none"
            stroke={color}
            strokeWidth=".5"
            points={`${xCoordinate},${startY} ${xCoordinate},${endY}`}
          />
        </Fragment>
      );
    });
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <XGuides />
      <YGuides />
      <XLabel />
      <YLabel />
      {Array.isArray(props.children)
        ? props.children.map((child, index) => (
            <Fragment key={index}>{cloneElement(child, { width, height, xPad, yPad, maxX, maxY })}</Fragment>
          ))
        : null}
    </svg>
  );
};

export default LinePlot;
