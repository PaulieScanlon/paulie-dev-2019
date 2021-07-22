import React from 'react'
import { Flex, Box, Heading, Text } from 'theme-ui'

import { SourceDays } from '@pauliescanlon/gatsby-theme-terminal'

export const PostsByDayChart = ({ config }) => {
  const { color, year } = config

  return (
    <SourceDays>
      {(sourceDays) => {
        const currentYear = sourceDays[sourceDays.length - (1 - year)]
        return (
          <Box>
            <Heading variant="styles.h4" sx={{ color: color }}>
              {currentYear[0].year}
            </Heading>
            <Box>
              {currentYear
                .sort((a, b) => a.number - b.number)
                .map((day, index) => {
                  const { name, count, percent } = day
                  return (
                    <Flex
                      key={index}
                      sx={{
                        backgroundColor: 'surface',
                        flexDirection: 'column',
                        mb: 2,
                        position: 'relative',
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: color,
                          height: '100%',
                          position: 'absolute',
                          width: `${percent}%`,
                        }}
                      />
                      <Box
                        sx={{
                          position: 'relative',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text sx={{ textTransform: 'capitalize', pl: 2 }}>{name}</Text>
                        <Text sx={{ pr: 2 }}>{`x${count}`}</Text>
                      </Box>
                    </Flex>
                  )
                })}
            </Box>
          </Box>
        )
      }}
    </SourceDays>
  )
}
