import React from "react"
import { Flex, Box, Heading, Text, Donut } from "@theme-ui/components"
import { SourceWords } from "@pauliescanlon/gatsby-theme-terminal/src/components/SourceWords"

import { formatNumber } from "../../utils/formatNumber"
// wordCountHighest,
// wordCountLowest,
// timeToReadTotal,
// timeToReadAverage,

export const DonutChart = ({ title, dimension, config }) => {
  const { color, calculation } = config

  const getCalculation = (type, source) => {
    const config = {
      averageWords: {
        average: source.wordCountAverage,
        value: source.wordCountAverage / 100,
        total: source.wordCountTotal,
      },
      averageTime: {
        average: source.timeToReadAverage,
        value: source.timeToReadAverage / 100,
        total: source.timeToReadTotal,
      },
    }

    return config[type]
  }

  return (
    <SourceWords>
      {(source) => {
        return (
          <Box
            sx={{
              display: "flex",
              flex: "1 1 auto",
              flexDirection: "column",
            }}
          >
            <Flex
              sx={{
                alignItems: "center",
                backgroundColor: "surface",
                flex: "1 1 auto",
                flexDirection: "column",
                justifyContent: "center",
                p: 3,
                position: "relative",
              }}
            >
              <Heading as="h4" variant="styles.h4">
                {title}
              </Heading>
              <Donut
                sx={{ mx: 3, mb: 2, color: color }}
                value={formatNumber(getCalculation(calculation, source).value)}
              />
              <Box sx={{ position: "absolute" }}>
                <Text
                  sx={{
                    textAlign: "center",
                    color: color,
                    fontSize: "22px",
                    fontWeight: "bold",
                    lineHeight: "1",
                  }}
                >
                  {formatNumber(getCalculation(calculation, source).average)}
                </Text>
                <Text
                  sx={{
                    textAlign: "center",
                    color: color,
                    lineHeight: "1",
                  }}
                >
                  {dimension}
                </Text>
              </Box>
              <Text sx={{ textAlign: "center" }}>
                {`Total ${dimension}: ${formatNumber(
                  getCalculation(calculation, source).total
                )}`}
              </Text>
            </Flex>
          </Box>
        )
      }}
    </SourceWords>
  )
}
