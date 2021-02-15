import React from 'react'
import { Box, Grid } from 'theme-ui'
import { keyframes } from '@emotion/react'

export const MrKeyframes = () => {
  const size = '8px'
  const dots = new Array(10).fill(null)

  return (
    <Grid
      sx={{
        gap: 1,
        p: 5,
        textAlign: 'center',
        justifyContent: 'center',
      }}
    >
      Loading
      <Grid
        sx={{
          gridAutoFlow: 'column',
          gap: 2,
        }}
      >
        {dots.map((dot, index) => (
          <Box
            key={index}
            sx={{
              animationDelay: `${index / 10}s`,
              animationDuration: '1.2s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationName: keyframes({
                '0%': {
                  opacity: 1,
                },
                '20%': {
                  opacity: 0,
                },
                '100%': {
                  opacity: 1,
                },
              }),
              backgroundColor: 'primary',
              borderRadius: `${size}`,
              height: `${size}`,
              width: `${size}`,
              opacity: 0,
            }}
          />
        ))}
      </Grid>
    </Grid>
  )
}
