import React, { Fragment, useState } from 'react'
import axios from 'axios'
import { Heading, Input, Button, Grid, Flex, Box, Text, Spinner } from 'theme-ui'
import { SvgIcon } from 'react-svg-bubble-slider'

import { useConfig } from '@pauliescanlon/gatsby-theme-terminal/src/data'

import { StripeLogo } from '../stripe-logo'

export const PayWhatYouWant = ({ slug }) => {
  const {
    site: {
      siteMetadata: { siteUrl },
    },
  } = useConfig()

  const [inputValue, setInputValue] = useState(3)
  const [response, setResponse] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasError, setHasError] = useState(false)
  const callback_url = `${siteUrl}${slug}`

  const handleChange = (event) => {
    const { value } = event.target
    if (value) {
      setInputValue(parseInt(value))
    } else {
      setInputValue(1)
    }
  }

  const makeStripePayment = async () => {
    setResponse('')

    setIsSubmitting(true)
    setHasError(false)

    try {
      const response = await axios.post('https://paulieapi.gatsbyjs.io/api/make-stripe-payment', {
        product: 'prod_KBkjqz2EoA4xXU',
        amount: inputValue,
        success_url: callback_url,
        cancel_url: callback_url,
      })

      setIsSubmitting(false)
      setResponse(response.data.message)
      window.open(response.data.url)
    } catch (error) {
      if (error.response) {
        setResponse(error.response.data.message)
      } else {
        setResponse(error.name)
      }
      setIsSubmitting(false)
      setHasError(true)
    }
  }

  return (
    <Fragment>
      <Grid>
        <Grid
          sx={{
            gap: 0,
            '.svg-icon': {
              mx: 'auto',
              color: 'text',
              mb: 3,
              borderRadius: '50%',
              borderWidth: '6px',
              borderStyle: 'solid',
              borderColor: 'primary',
            },
          }}
        >
          <SvgIcon name="tongue" size={64} />
          <Heading as="h3" variant="styles.h3" sx={{ textAlign: 'center' }}>
            Pay what you want
          </Heading>

          <Text
            as="div"
            sx={{
              display: 'grid',
              gap: 2,
              alignItems: 'center',
              gridTemplateColumns: ['1fr', 'auto auto'],
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            If you've enjoyed this post you can make a secure contribution
            <StripeLogo />
          </Text>
        </Grid>
      </Grid>
      {response ? null : (
        <Grid
          sx={{
            gap: 1,
            maxWidth: 240,
            mx: 'auto',
          }}
        >
          <Grid
            sx={{
              gridTemplateColumns: 'auto 1fr',
              gap: 1,
            }}
          >
            <Flex
              style={{
                position: 'relative',
              }}
            >
              <Box as="span" sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', marginLeft: 2 }}>
                $
              </Box>
              <Input
                type="number"
                min={1}
                max={100}
                value={inputValue}
                disabled={isSubmitting}
                onChange={handleChange}
                sx={{
                  paddingLeft: 3,
                }}
              />
            </Flex>
            <Button
              disabled={isSubmitting}
              onClick={makeStripePayment}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '130px' }}
            >
              {isSubmitting ? <Spinner sx={{ height: '24px' }} /> : 'Buy me a pint'}
            </Button>
          </Grid>
        </Grid>
      )}
      {hasError ? <Text sx={{ color: 'error', textAlign: 'center' }}>{response}</Text> : null}
    </Fragment>
  )
}
