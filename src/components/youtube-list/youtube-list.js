import React from 'react'
import { Link, Grid, Box, Heading } from 'theme-ui'

import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

export const YouTubeList = () => {
  const {
    allYouTube: { nodes },
  } = useStaticQuery(graphql`
    query {
      allYouTube(sort: { fields: liveStreamingDetails___scheduledStartTime, order: DESC }) {
        nodes {
          id
          image {
            childImageSharp {
              gatsbyImageData
            }
          }
          snippet {
            title
            publishedAt(formatString: "MMMM DD YYYY")
          }
        }
      }
    }
  `)

  return (
    <Grid
      as="ul"
      sx={{
        p: 0,
        gap: 4,
      }}
    >
      {nodes.map((node, index) => {
        const {
          id,
          snippet: { title, publishedAt },
          image,
        } = node
        return (
          <Grid key={index} as="li">
            <Link
              sx={{
                display: 'grid',
                alignItems: 'center',
                gridTemplateColumns: ['1fr', '1fr 2fr'],
                backgroundColor: 'surface',
                transition: '.2s linear box-shadow, .2s ease-in-out transform',
                ':hover': {
                  transform: 'translateY(-0.25rem)',
                  boxShadow: 2,
                },
              }}
              href={`https://www.youtube.com/watch?v=${id}`}
              target="_blank"
              rel="noopener"
            >
              <Box
                sx={{
                  '.gatsby-image-wrapper': {
                    m: 0,
                  },
                }}
              >
                <GatsbyImage alt={title} image={getImage(image)} />
              </Box>
              <Box
                sx={{
                  p: 3,
                }}
              >
                <Heading as="h4" variant="styles.h3">
                  {title}
                </Heading>
                <Box as="div">{publishedAt}</Box>
              </Box>
            </Link>
          </Grid>
        )
      })}
    </Grid>
  )
}
