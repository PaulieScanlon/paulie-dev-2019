/** @jsx jsx */
import { jsx, Box, Heading, Text, Grid } from 'theme-ui'
import { shade } from '@theme-ui/color'
import { keyframes } from '@emotion/react'
import { useAllMdx } from '@pauliescanlon/gatsby-theme-terminal'

const RADIUS = '15.91549430918954'
const VIEW_BOX = 42
const FIRST_OFFSET = 25
const CIRCUMERANCE = 100

export const TagPercentChart = ({ year, color }) => {
  const currentYear = new Date().getFullYear()

  const tags = useAllMdx()
    .filter((item) => {
      const { date } = item.node.frontmatter
      if (new Date(date).getFullYear() === currentYear - -year) {
        return item
      }
      return null
    })
    .reduce((items, item) => {
      const { tags } = item.node.frontmatter
      if (tags) {
        tags.map((tag) => items.push(tag))
      }
      return items
    }, [])
    .reduce((items, item) => {
      const existingItem = items.find((index) => index.tag === item)

      if (existingItem) {
        existingItem.count += 1
      } else {
        items.push({
          tag: item,
          count: 1,
        })
      }

      return items
    }, [])
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map((item, index, array) => {
      const { count } = item
      const countTotal = array.reduce((a, b) => a + b.count, 0)
      const percentage = (count / countTotal) * 100
      const remainder = 100 - percentage
      return {
        ...item,
        percentage: percentage,
        remainder: remainder,
      }
    })

  return (
    <Box>
      <Heading variant="styles.h4" sx={{ color: color }}>
        {currentYear - -year}
      </Heading>
      <Box
        sx={{
          backgroundColor: 'surface',
          py: 2,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            mx: 'auto',
            width: ['100%', '100%', '70%'],
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              transform: 'translate(-49%, -50%)',
              top: '49%',
              left: '50%',
            }}
          >
            <Text
              sx={{
                textAlign: 'center',
                color: color,
                fontSize: 3,
                fontWeight: 'bold',
                lineHeight: '1',
              }}
            >
              {currentYear - -year}
            </Text>
            <Text
              sx={{
                textAlign: 'center',
                color: color,
                lineHeight: '1',
              }}
            >
              Top 5 tags
            </Text>
          </Box>
          <svg id="donut-chart" width="100%" height="100%" viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`}>
            <title>Doughnut chart of popular tags</title>
            {tags.map((statistic, index) => {
              const { tag, percentage, remainder } = statistic

              return (
                <circle
                  key={index}
                  id={tag}
                  role="presentation"
                  sx={{
                    stroke: shade(color, index / 7),
                    fill: 'transparent',
                    animationTimingFunction: 'cubic-bezier',
                    animationFillMode: 'forwards',
                    animationDuration: '1s',
                    animationName: keyframes({
                      '0%': {
                        strokeDashoffset: '0',
                      },
                      '100%': {
                        strokeDashoffset: `${
                          CIRCUMERANCE - tags.slice(0, index).reduce((a, b) => a + b.percentage, 0) + FIRST_OFFSET
                        }`,
                      },
                    }).toString(),
                  }}
                  cx={`${VIEW_BOX / 2}`}
                  cy={`${VIEW_BOX / 2}`}
                  r={RADIUS}
                  strokeWidth="4"
                  strokeDasharray={`${percentage} ${remainder}`}
                />
              )
            })}
          </svg>
        </Box>
        <Grid
          sx={{
            rowGap: 2,
            px: 4,
            pb: 2,
          }}
        >
          {tags
            ? tags.map((statistic, index) => {
                const { tag, count } = statistic

                return (
                  <Grid
                    key={index}
                    sx={{
                      alignItems: 'center',
                      gridTemplateColumns: '1fr auto',
                    }}
                  >
                    <Grid
                      sx={{
                        alignItems: 'center',
                        gap: 2,
                        gridTemplateColumns: '12px auto',
                      }}
                    >
                      <Box
                        sx={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: shade(color, index / 7),
                          borderRadius: '100%',
                        }}
                      />
                      <Text>{tag}</Text>
                    </Grid>
                    <Text sx={{ fontWeight: 'bold' }}>{`x${count}`}</Text>
                  </Grid>
                )
              })
            : null}
        </Grid>
      </Box>
    </Box>
  )
}
