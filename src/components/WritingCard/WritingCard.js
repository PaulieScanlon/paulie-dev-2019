import React from 'react'
import { format } from 'date-fns'
import { Flex, Box, Badge, Link, Card, Heading, Text, Divider, Image, Button } from 'theme-ui'
import { mix } from '@theme-ui/color'

import { useConfig } from '@pauliescanlon/gatsby-theme-terminal'

export const WritingCard = ({ title, tags, date, excerpt, url, misc }) => {
  const {
    site: {
      siteMetadata: { siteUrl },
    },
  } = useConfig()

  return (
    <Box
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        mb: 3,
        width: '100%',
      }}
    >
      <Link
        href={url}
        target="_blank"
        rel="noopener"
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          m: (theme) => `0px ${theme.space[2]}px`,
          minHeight: '1px',
          textDecoration: 'none',
        }}
      >
        <Card
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            minHeight: '1px',
            p: 3,
          }}
        >
          <Flex
            sx={{
              justifyContent: 'space-between',
            }}
          >
            <Flex
              sx={{
                alignItems: 'center',
              }}
            >
              <Image alt={`${misc}-logo`} src={`${siteUrl}/images/${misc}-logo.png`} sx={{ width: 16, height: 16 }} />
              <Text sx={{ color: 'secondary', ml: 2 }}>{misc}</Text>
            </Flex>
            <Text sx={{ color: 'success' }}>{format(new Date(date), 'd-MMM-u')}</Text>
          </Flex>
          <Divider />
          <Heading as="div" variant="styles.h3" sx={{ color: 'text' }}>
            {title}
          </Heading>
          <Text sx={{ color: 'text', wordBreak: 'break-word' }}>{excerpt}</Text>
          <Divider />
          <Box
            sx={{
              ml: '2px',
            }}
          >
            {tags.map((tag, index) => {
              return (
                <Badge
                  key={index}
                  variant="primary"
                  sx={{
                    mr: 2,
                    mb: 2,
                    color: mix('muted', 'primary', `${index / tags.length}`),
                    borderColor: mix('muted', 'primary', `${index / tags.length}`),
                  }}
                >
                  {tag}
                </Badge>
              )
            })}
          </Box>
          <Divider />
          <Button as="span" variant="ghost" sx={{ pointerEvents: 'none' }}>
            Read article {/* eslint-disable */}
            <Box as="span" role="img" aria-label="pencil">
              ✏️
            </Box>
          </Button>
        </Card>
      </Link>
    </Box>
  )
}
