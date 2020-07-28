import React from "react"
import { Flex, Box, Heading, Text } from "@theme-ui/components"

import { SourceMonths } from "@pauliescanlon/gatsby-theme-terminal/src/components/SourceMonths"

export const PostsByMonthChart = ({ config }) => {
  const { color, year } = config

  return (
    <SourceMonths>
      {(sourceMonths) => {
        const currentYear = sourceMonths[sourceMonths.length - (1 - year)]
        return (
          <Box>
            <Heading variant="styles.h4" sx={{ color: color }}>
              {currentYear[0].year}
            </Heading>
            <Box
              sx={{
                backgroundColor: "surface",
                display: "flex",
                flex: "1 1 auto",
                p: 1,
                height: 240,
              }}
            >
              <Flex sx={{ flexWrap: "wrap", width: "100%" }}>
                {currentYear.map((month, index) => {
                  const { initial, count, percent } = month
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        width: `${100 / currentYear.length}%`,
                      }}
                    >
                      <Text
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        {`x${count}`}
                      </Text>
                      <Box
                        sx={{
                          backgroundColor: color,
                          height: `${percent}%`,
                          p: 1,
                          mx: 1,
                        }}
                      />
                      <Text
                        sx={{
                          textTransform: "uppercase",
                          textAlign: "center",
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
