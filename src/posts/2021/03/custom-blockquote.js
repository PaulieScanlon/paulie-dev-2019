import React from 'react'
import { Box, Text } from 'theme-ui'

export const Icon = ({ path, sx }) => {
  return (
    <Box
      as="svg"
      aria-hidden="true"
      version="1.0"
      fill="currentcolor"
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      x="0"
      y="0"
      sx={{
        color: 'text',
        width: '24px',
        path: {
          fill: 'inherit',
        },
        ...sx,
      }}
    >
      <path d={path} />
    </Box>
  )
}

const CustomBlockquote = ({ children }) => {
  return (
    <Box as="blockquote" variant="styles.blockquote">
      <Text
        as="p"
        sx={{
          display: 'flex',
        }}
      >
        <Icon
          path="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"
          sx={{
            alignSelf: 'flex-start',
            mr: 2,
            transform: 'rotate(180deg)',
          }}
        />
        {children}
        <Icon
          path="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"
          sx={{
            alignSelf: 'flex-end',
            ml: 2,
            mt: '8px',
          }}
        />
      </Text>
    </Box>
  )
}

export default CustomBlockquote
