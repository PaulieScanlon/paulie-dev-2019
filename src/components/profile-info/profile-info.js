import React, { Fragment, useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { Grid, Flex, Box, Heading, Text, Spinner } from 'theme-ui'

export const ProfileInfo = () => {
  const [response, setResponse] = useState(null)
  const [isMounted, setIsMounted] = useState(true)

  const getTwitterUser = useCallback(async () => {
    try {
      const response = await axios('https://paulieapi.gatsbyjs.io/api/get-twitter-user', {
        // const response = await axios('http://localhost:8001/api/get-twitter-user', {
        method: 'POST',
        data: {
          username: 'PaulieScanlon',
        },
      })

      if (isMounted) {
        setResponse(response.data)
        console.log(response.data)
      }
    } catch (error) {
      if (error.response) {
        setResponse(error.response.data.message)
      } else {
        setResponse(error.name)
      }
    }
  }, [isMounted])

  useEffect(() => {
    getTwitterUser()
    return () => {
      setIsMounted(false)
    }
  }, [getTwitterUser])

  return (
    <Box
      sx={{
        minHeight: '120px',
        my: 5,
      }}
    >
      {response ? (
        <Fragment>
          <Grid sx={{ gap: 1 }}>
            {response.user ? (
              <Fragment>
                <Heading as="h1" variant="styles.h1" sx={{ mb: 0 }}>
                  {response.user.name}
                </Heading>
                <Grid
                  dangerouslySetInnerHTML={{ __html: response.markdown }}
                  sx={{
                    gap: 0,
                    h3: {
                      m: 0,
                    },
                    p: {
                      m: 0,
                      fontWeight: 'bold',
                      fontSize: 2,
                    },
                  }}
                />
              </Fragment>
            ) : (
              <Text sx={{ color: 'error' }}>{response}</Text>
            )}
          </Grid>
        </Fragment>
      ) : (
        <Flex sx={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Spinner />
        </Flex>
      )}
    </Box>
  )
}
