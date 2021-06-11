import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Grid, Flex, Heading, Text, Spinner } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'

export const ProfileInfo = () => {
  const [response, setResponse] = useState({ user: null })
  const [isMounted, setIsMounted] = useState(true)
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

  useEffect(() => {
    fetch(`${process.env.GATSBY_API_URL}/twitter-user`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json()
        } else {
          throw Error(response.message)
        }
      })
      .then((response) => {
        setIsLoading(false)
        if (isMounted) {
          setResponse({ user: response.user })
        }
      })
      .catch((error) => {
        setIsLoading(false)
        setHasError(true)
      })
  }, [isMounted])

  useEffect(() => {
    return () => {
      setIsMounted(false)
    }
  })

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
