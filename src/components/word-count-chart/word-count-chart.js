import React from 'react'
import { Flex, Box, Heading, Text, Donut } from 'theme-ui'
import { SourceWords } from '@pauliescanlon/gatsby-theme-terminal'

import { formatNumber } from '../../utils/formatNumber'

export const WordCountChart = ({ title, dimension, config }) => {
  const { color, year } = config

  const totalWordsByYear = (currentYear) => currentYear.reduce((years, year) => (years += year.words), 0)

  const averageWordsByYear = (currentYear) => Math.round(totalWordsByYear(currentYear) / currentYear.length)

  return (
    <SourceWords>
      {(sourceWords) => {
        const yearNow = new Date().getFullYear()
        const yearCalc = yearNow + year
        const currentYear = sourceWords.wordCountByMonth[yearCalc]

        return (
          <Box>
            <Heading variant="styles.h4" sx={{ color: color }}>
              {yearCalc}
            </Heading>
            <Box
              sx={{
                display: 'flex',
                flex: '1 1 auto',
                flexDirection: 'column',
              }}
            >
              <Flex
                sx={{
                  alignItems: 'center',
                  backgroundColor: 'surface',
                  flex: '1 1 auto',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  p: 3,
                  position: 'relative',
                }}
              >
                <Heading as="div" variant="styles.h4">
                  {title}
                </Heading>
                <Donut
                  role="img"
                  sx={{ mx: 3, mb: 2, color: color }}
                  value={(averageWordsByYear(currentYear) / totalWordsByYear(currentYear)) * 100}
                />
                <Box sx={{ position: 'absolute' }}>
                  <Text
                    sx={{
                      textAlign: 'center',
                      color: color,
                      fontSize: 3,
                      fontWeight: 'bold',
                      lineHeight: '1',
                    }}
                  >
                    {formatNumber(averageWordsByYear(currentYear))}
                  </Text>
                  <Text
                    sx={{
                      textAlign: 'center',
                      color: color,
                      lineHeight: '1',
                    }}
                  >
                    {dimension}
                  </Text>
                </Box>
                <Text sx={{ textAlign: 'center' }}>
                  {`Total ${dimension}: ${formatNumber(totalWordsByYear(currentYear))}`}
                </Text>
              </Flex>
            </Box>
          </Box>
        )
      }}
    </SourceWords>
  )
}
