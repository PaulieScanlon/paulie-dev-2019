import React from 'react';

export const Icon = ({ path, style }) => {
  return (
    <svg
      version="1.0"
      fill="currentcolor"
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      x="0"
      y="0"
      style={{
        color: 'inherit',
        width: 24,
        ...style
      }}
    >
      <path d={path} style={{ fill: 'inherit' }} />
    </svg>
  );
};

const CustomBlockquote = ({ children }) => {
  return (
    <blockquote
      style={{
        padding: 16,
        margin: 0
      }}
    >
      <p
        style={{
          display: 'flex'
        }}
      >
        <Icon
          path="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"
          style={{
            alignSelf: 'flex-start',
            marginRight: '8px',
            transform: 'rotate(180deg)'
          }}
        />
        {children}
        <Icon
          path="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"
          style={{
            alignSelf: 'flex-end',
            marginLeft: '8px',
            marginTop: '4px'
          }}
        />
      </p>
    </blockquote>
  );
};

export default CustomBlockquote;
