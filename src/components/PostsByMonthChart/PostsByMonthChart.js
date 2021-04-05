import React from 'react'
import { Grid, Flex, Box, Heading, Text } from 'theme-ui'

import { SourceMonths } from '@pauliescanlon/gatsby-theme-terminal'

export const PostsByMonthChart = ({ config }) => {
  const { color, year } = config

  return (
    <SourceMonths>
      {(sourceMonths) => {
        const currentYear = sourceMonths[sourceMonths.length - (1 - year)]

        return (
          <Box>
            <Grid
              sx={{
                alignItems: 'center',
                gridTemplateColumns: '1fr auto',
                mb: 3,
              }}
            >
              <Heading variant="styles.h4" sx={{ color: color, mb: 0 }}>
                {currentYear[0].year}
              </Heading>
              <Text sx={{ lineHeight: 'heading' }}>{`Total posts: x${currentYear.reduce(
                (items, item) => items + item.count,
                0,
              )}`}</Text>
            </Grid>
            <Box
              sx={{
                backgroundColor: 'surface',
                display: 'flex',
                flex: '1 1 auto',
                p: 1,
                height: 240,
              }}
            >
              <Flex sx={{ flexWrap: 'wrap', width: '100%' }}>
                {currentYear.map((month, index) => {
                  const { initial, count, percent } = month
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        width: `${100 / currentYear.length}%`,
                      }}
                    >
                      <Text
                        sx={{
                          textAlign: 'center',
                          color: percent > 0 ? 'inherit' : 'placeholder',
                        }}
                      >
                        {`x${count}`}
                      </Text>
                      <Box
                        sx={{
                          backgroundColor: percent > 0 ? color : 'placeholder',
                          height: `${percent}%`,
                          p: 1,
                          mx: 1,
                        }}
                      />
                      <Text
                        sx={{
                          textTransform: 'uppercase',
                          textAlign: 'center',
                        }}
                      >
                        {initial}
                      </Text>
                    </Box>
                  )
                })}
              </Flex>
            </Box>
          </Box>
        )
      }}
    </SourceMonths>
  )
}
