import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Spinner, Grid, Text, Flex, Heading } from 'theme-ui'
import { Link } from 'gatsby'
import axios from 'axios'

import { ReactionIcon } from '../reaction-icon'

const ReactionRow = ({ reaction, slug, count }) => {
  return (
    <Grid
      sx={{
        py: 1,
        px: 2,
        alignItems: 'center',
        backgroundColor: 'surface',
        gridTemplateColumns: '32px 1fr auto',
        a: {
          variant: 'styles.a',
        },
      }}
    >
      <ReactionIcon name={reaction} />
      <Link to={slug}>{slug}</Link>
      <Text as="div" sx={{ textAlign: 'center' }}>{`x${count}`}</Text>
    </Grid>
  )
}

ReactionRow.propTypes = {
  /** Reaction icon name */
  reaction: PropTypes.string,
  /** Slug */
  slug: PropTypes.string,
  /** Count */
  count: PropTypes.number,
}

export const ReactionsByAmount = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [reactions, setReactions] = useState([])

  useEffect(() => {
    const getAllReactions = async () => {
      try {
        const response = await axios.get('/api/get-all-reactions')
        setReactions(response.data.reactions)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        setHasError(true)
      }
    }
    getAllReactions()
  }, [])

  return (
    <Box>
      {isLoading ? (
        <Flex sx={{ justifyContent: 'center' }}>
          <Spinner />
        </Flex>
      ) : (
        <Fragment>
          {hasError ? (
            <Text
              as="div"
              sx={{
                display: 'grid',
                gap: 1,
                alignItems: 'center',
                gridTemplateColumns: 'auto 1fr',
              }}
            >
              <Box as="span" role="img" aria-label="Police Car Light">
                🚨
              </Box>
              Blast, There's been an error!
            </Text>
          ) : (
            <Grid
              sx={{
                gap: 4,
              }}
            >
              {Object.entries(reactions).map(([title, data], index) => {
                // console.log(reaction)
                const { reaction, slug, count } = data[0][0]
                // console.log(reaction, slug, count)

                return (
                  <Box key={index}>
                    <Heading as="h2" variant="styles.h2">
                      most {title} reactions
                    </Heading>
                    <Grid>
                      <ReactionRow reaction={reaction} slug={slug} count={count} />
                    </Grid>
                  </Box>
                )
              })}
            </Grid>
          )}
        </Fragment>
      )}
    </Box>
  )
}
