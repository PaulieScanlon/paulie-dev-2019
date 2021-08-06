import React, { Fragment, useEffect, useState } from 'react'
import { Box, Spinner, Grid, Text, Flex } from 'theme-ui'
import { Link } from 'gatsby'
import axios from 'axios'
import { SvgIcon } from 'react-svg-bubble-slider'

export const ReactionsByAmount = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [reactions, setReactions] = useState([])

  useEffect(() => {
    const getAllReactions = async () => {
      try {
        const response = await axios.get('/api/get-all-reactions')
        setReactions(response.data.reactions.slice(0, 5))
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
            <Box as="ol">
              {reactions.map((reaction, index) => {
                const { slug, reactions } = reaction

                return (
                  <Box
                    key={index}
                    as="li"
                    sx={{
                      mb: 3,
                      a: {
                        display: 'grid',
                        gap: 3,
                        alignItems: 'center',
                        gridTemplateColumns: ['1fr', '1fr', '1fr auto'],
                        variant: 'styles.a',
                        textDecoration: 'none',
                      },
                    }}
                  >
                    <Link to={slug}>
                      <Box
                        as="span"
                        sx={{
                          textDecoration: 'underline',
                        }}
                      >
                        {slug}
                      </Box>

                      <Grid
                        sx={{
                          gridTemplateColumns: [`repeat(${reactions.length}, 48px)`],
                        }}
                      >
                        {reactions.map((reaction, index) => {
                          const { count, name } = reaction
                          return (
                            <Grid
                              sx={{
                                justifyContent: 'center',
                                gap: 0,
                                '.svg-icon': {
                                  color: 'text',
                                  borderWidth: '3px',
                                  borderColor: 'primary',
                                  borderStyle: 'solid',
                                  borderRadius: '50%',
                                },
                              }}
                            >
                              <SvgIcon name={name} />
                              <Text as="div" sx={{ color: 'text', textAlign: 'center' }}>
                                {`x${count}`}
                              </Text>
                            </Grid>
                          )
                        })}
                      </Grid>
                    </Link>
                  </Box>
                )
              })}
            </Box>
          )}
        </Fragment>
      )}
    </Box>
  )
}
