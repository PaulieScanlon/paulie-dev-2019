import React, { useState } from 'react'
import { Box, Grid, Text, Heading, Button, Input, Link } from 'theme-ui'
import axios from 'axios'
import * as yup from 'yup'

export const NewsletterForm = () => {
  const [inputValue, setInputValue] = useState('')
  const [announce, setAnnounce] = useState({ hasError: false, hasSuccess: false, message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const schema = yup.object().shape({
    email: yup.string().required().email(),
  })

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const validate = await schema.validate({ email: inputValue })
      setAnnounce({
        hasSuccess: true,
        hasError: false,
        message: 'Submitting...',
      })
      submitToApi(validate.email)
    } catch (error) {
      setAnnounce({
        hasSuccess: false,
        hasError: true,
        message: error.message,
      })
    }
  }

  const submitToApi = async (email) => {
    setIsSubmitting(true)

    try {
      const response = await axios.post('/api/newsletter', {
        email: email,
      })
      setAnnounce({
        hasSuccess: true,
        hasError: false,
        message: response.data.message,
      })
    } catch (error) {
      setAnnounce({
        hasSuccess: false,
        hasError: true,
        message: error.message,
      })
    }
  }

  return (
    <Box
      sx={{
        py: 6,
      }}
    >
      <Grid
        sx={{
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: 'surface',
          p: 4,
        }}
      >
        <Grid
          sx={{
            gap: 0,
          }}
        >
          <Heading as="h3" variant="styles.h3">
            Newsletter
          </Heading>
          <Text as="p">
            This is a sign-up to{' '}
            <Link href="https://www.raae.codes/" target="_blank" rel="noopener">
              Queen Raae's
            </Link>{' '}
            Gatsby Newsletter because I don't really like people, or emails. She'll let you know when I have something
            new to share!
          </Text>
        </Grid>

        <Box
          sx={{
            form: {
              display: 'grid',
              gap: 3,
              gridTemplateColumns: ['1fr', '1fr auto'],
            },
          }}
        >
          <form onSubmit={handleSubmit} novalidate="novalidate">
            <Input
              placeholder="ahoy@shipmate.com"
              type="email"
              name="email"
              required={true}
              value={inputValue}
              onChange={handleChange}
              readOnly={isSubmitting}
            />

            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            <Box
              sx={{
                height: 20,
              }}
            >
              {announce.hasError || announce.hasSuccess ? (
                <Text sx={{ color: announce.hasError ? 'error' : 'success' }}>{announce.message}</Text>
              ) : null}
            </Box>
          </form>
        </Box>
      </Grid>
    </Box>
  )
}
