import React from 'react'
import { Flex, Box, Heading, Text } from 'theme-ui'
import { SourceWords } from '@pauliescanlon/gatsby-theme-terminal'

import { formatNumber } from '../../utils/formatNumber'

export const WordsByMonthChart = ({ config }) => {
  const { color, year } = config

  return (
    <SourceWords>
      {(sourceWords) => {
        const currentYear = sourceWords.wordCountByMonth[sourceWords.wordCountByMonth.length - (1 - year)]
        const { wordCountTotal } = sourceWords
        return (
          <Box>
            <Heading variant="styles.h4" sx={{ color: color }}>
              {currentYear[0].year}
            </Heading>
            <Box>
              {currentYear.map((month, index) => {
                const { name, words } = month
                const percent = Math.round((words / wordCountTotal) * 100)

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
                      <Text
                        sx={{
                          color: words > 0 ? 'inherit' : 'placeholder',
                          pr: 2,
                        }}
                      >
                        {formatNumber(words)}
                      </Text>
                    </Box>
                  </Flex>
                )
              })}
            </Box>
          </Box>
        )
      }}
    </SourceWords>
  )
}
