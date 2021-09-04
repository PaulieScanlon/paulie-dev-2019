import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Flex, Heading, Text, Spinner } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'

export const ProfileInfo = () => {
  const [response, setResponse] = useState({ user: null })
  const [isMounted, setIsMounted] = useState(null)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const profileData = useStaticQuery(graphql`
    query ProfileQuery {
      site {
        siteMetadata {
          name
          description
        }
      }
    }
  `).site.siteMetadata

  // useEffect(() => {
  //   // // fetch(`${process.env.GATSBY_API_URL}/twitter-user`)
  //   // fetch('https://paulieapi.gatsbyjs.io/api/get-twitter-user', {
  //   //   method: 'POST',
  //   //   body: JSON.stringify({ username: 'PaulieScanlon' }),
  //   // })
  //   //   .then((response) => {
  //   //     if (response.status >= 200 && response.status <= 299) {
  //   //       return response.json()
  //   //     } else {
  //   //       throw Error(response.message)
  //   //     }
  //   //   })
  //   //   .then((response) => {
  //   //     setIsLoading(false)
  //   //     if (isMounted) {
  //   //       setResponse({ user: response.user })
  //   //     }
  //   //   })
  //   //   .catch((error) => {
  //   //     setIsLoading(false)
  //   //     setHasError(true)
  //   //   })
  // }, [isMounted])

  const getTwitterUser = async () => {
    try {
      const response = await axios('https://paulieapi.gatsbyjs.io/api/get-twitter-user', {
        method: 'POST',
        data: {
          username: 'PaulieScanlon',
        },
      })
      setIsLoading(false)
      if (isMounted) {
        setResponse(response.data)
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 2))
      setIsLoading(false)
      setHasError(true)
      // setResponse(error.response.message)
    }
  }

  useEffect(() => {
    setIsMounted(true)
    getTwitterUser()
    return () => {
      setIsMounted(false)
    }
  }, [getTwitterUser])

  return (
    <>
      {hasError ? <Text sx={{ color: 'error' }}>API Error</Text> : null}
      {!hasError && isLoading ? (
        <Flex sx={{ justifyContent: 'center', minHeight: '150px' }}>
          <Grid sx={{ gap: 2, display: 'none', height: '0px' }}>
            <Heading as="h1" variant="styles.h1">
              {profileData.name}
            </Heading>
            <Text>{profileData.description}</Text>
          </Grid>
          <Spinner />
        </Flex>
      ) : null}
      {!hasError && !isLoading && response.user ? (
        <Grid sx={{ gap: 2 }}>
          <Heading as="h1" variant="styles.h1">
            {response.user.name.toLowerCase().replace(' ', '-')}
          </Heading>
          <Text>{response.user.description}</Text>
          <Text>Location: {response.user.location}</Text>
        </Grid>
      ) : null}
    </>
  )
}
