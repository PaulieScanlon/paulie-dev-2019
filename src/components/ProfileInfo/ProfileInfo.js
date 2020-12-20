import React, { useEffect, useState } from "react"
import { Grid, Flex, Heading, Text, Spinner } from "theme-ui"

export const ProfileInfo = () => {
  const [response, setResponse] = useState({ user: null })
  const [isMounted, setIsMounted] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.GATSBY_API_URL}/twitter-user`)
      .then((response) => response.text())
      .then((response) => {
        setIsLoading(false)
        if (isMounted) {
          setResponse(JSON.parse(response))
        }
      })
      .catch((err) => {
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
      {hasError ? <Text sx={{ color: "error" }}>API Error</Text> : null}
      {!hasError && isLoading ? (
        <Flex sx={{ justifyContent: "center" }}>
          <Spinner />
        </Flex>
      ) : null}
      {!hasError && !isLoading && response.user ? (
        <Grid sx={{ gap: 2 }}>
          <Heading as="h1" variant="styles.h1">
            {response.user.name.toLowerCase().replace(" ", "-")}
          </Heading>
          <Text>{response.user.description}</Text>
          <Text>Location: {response.user.location}</Text>
        </Grid>
      ) : null}
    </>
  )
}
