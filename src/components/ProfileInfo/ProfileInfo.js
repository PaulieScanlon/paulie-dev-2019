import React, { useEffect, useState } from "react"
import { Grid, Heading, Text, Spinner } from "theme-ui"

export const ProfileInfo = () => {
  const [res, setRes] = useState({ user: null })
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.GATSBY_API_URL}/twitter-user`)
      .then((res) => res.text())
      .then((res) => {
        setIsLoading(false)
        setRes(JSON.parse(res))
      })
      .catch((err) => {
        setIsLoading(false)
        setHasError(true)
      })
  }, [])

  return (
    <>
      {hasError ? <Text sx={{ color: "error" }}>API Error</Text> : null}
      {!hasError && isLoading ? <Spinner /> : null}
      {!hasError && !isLoading && res.user ? (
        <Grid sx={{ gap: 2 }}>
          <Heading as="h1" variant="styles.h1">
            {res.user.name.toLowerCase().replace(" ", "-")}
          </Heading>
          <Text>{res.user.description}</Text>
          <Text>Location: {res.user.location}</Text>
        </Grid>
      ) : null}
    </>
  )
}
