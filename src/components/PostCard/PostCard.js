import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { format } from 'date-fns'
import { Flex, Box, Badge, Link, Card, Heading, Text } from 'theme-ui'
import { mix } from '@theme-ui/color'
import Img from 'gatsby-image'

export const PostCard = ({ title, featuredImageUrlSharp, tags, date, dateModified, excerpt, slug, pinned }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
      }}
    >
      <Link
        as={GatsbyLink}
        to={slug}
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
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
          }}
        >
          <Box sx={{ minHeight: '1px' }}>
            {featuredImageUrlSharp && <Img fluid={featuredImageUrlSharp.childImageSharp.fluid} alt={title} />}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              p: 3,
            }}
          >
            <Heading
              as="div"
              variant="styles.h3"
              sx={{
                color: 'text',
                mt: 3,
                span: { mr: 2 },
              }}
            >
              {pinned ? (
                <span as="span" role="img" aria-label="A thumbtack (drawing pin)">
                  📌
                </span>
              ) : null}
              {title}
            </Heading>
            <Flex
              sx={{
                justifyContent: 'space-between',
              }}
            >
              {dateModified ? (
                <Text
                  sx={{
                    mb: 1,
                    color: 'success',
                  }}
                >
                  {format(new Date(dateModified), 'd-MMM-u')}
                </Text>
              ) : null}

              <Text
                sx={{
                  mb: 1,
                  color: dateModified ? 'muted' : 'success',
                  textDecoration: dateModified ? 'line-through' : 'none',
                }}
              >
                {format(new Date(date), 'd-MMM-u')}
              </Text>
            </Flex>
            <Text sx={{ mb: 1, color: 'text', wordBreak: 'break-word' }}>{excerpt}</Text>
          </Box>
          <Box
            sx={{
              p: 3,
            }}
          >
            {tags
              ? tags.map((tag, index) => {
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
                })
              : null}
          </Box>
          <Box sx={{ p: 3 }}>
            <Text sx={{ color: 'secondary', textAlign: 'right' }}>View post</Text>
          </Box>
        </Card>
      </Link>
    </Box>
  )
}
