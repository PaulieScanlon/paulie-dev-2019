import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Spinner, Grid, Text, Flex, Heading } from 'theme-ui'
import { Link } from 'gatsby'
import axios from 'axios'
import { SvgIcon } from 'react-svg-bubble-slider'

const ReactionRow = ({ reaction, slug, count }) => {
  return (
    <Grid
      sx={{
        py: 1,
        px: 2,
        alignItems: 'center',
        backgroundColor: 'surface',
        gridTemplateColumns: '32px 1fr auto',
        '.svg-icon': {
          color: 'text',
          borderWidth: '3px',
          borderColor: 'primary',
          borderStyle: 'solid',
          borderRadius: '50%',
        },
        a: {
          variant: 'styles.a',
        },
      }}
    >
      <SvgIcon name={reaction} />
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
                    Coolest Post
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
                    Happiest Post
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
              {reactions.sad ? (
                <Box>
                  <Heading as="h2" variant="styles.h2">
                    Saddest Post
                  </Heading>
                  <Grid>
                    {reactions.sad.map((reaction) => {
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
