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
              {reactions.cool ? (
                <Box>
                  <Heading as="h2" variant="styles.h2">
                    most cool reactions
                  </Heading>
                  <Grid>
                    {reactions.cool.map((reaction) => {
                      return reaction.slice(0, 1).map((item, index) => {
                        const { reaction, slug, count } = item

                        return <ReactionRow key={index} reaction={reaction} slug={slug} count={count} />
                      })
                    })}
                  </Grid>
                </Box>
              ) : null}
              {reactions.happy ? (
                <Box>
                  <Heading as="h2" variant="styles.h2">
                    most happy reactions
                  </Heading>
                  <Grid>
                    {reactions.happy.map((reaction) => {
                      return reaction.slice(0, 1).map((item, index) => {
                        const { reaction, slug, count } = item

                        return <ReactionRow key={index} reaction={reaction} slug={slug} count={count} />
                      })
                    })}
                  </Grid>
                </Box>
              ) : null}
              {reactions.wondering ? (
                <Box>
                  <Heading as="h2" variant="styles.h2">
                    most wondering reactions
                  </Heading>
                  <Grid>
                    {reactions.wondering.map((reaction) => {
                      return reaction.slice(0, 1).map((item, index) => {
                        const { reaction, slug, count } = item

                        return <ReactionRow key={index} reaction={reaction} slug={slug} count={count} />
                      })
                    })}
                  </Grid>
                </Box>
              ) : null}
            </Grid>
          )}
        </Fragment>
      )}
    </Box>
  )
}
