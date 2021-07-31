import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Grid, Button, Heading, Text, Spinner, Box } from 'theme-ui'
import { SvgIcon } from 'react-svg-bubble-slider'
import Reward from 'react-rewards'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const config = ['wondering', 'sad', 'happy', 'cool', 'confused', 'neutral', 'tongue']

export const Reactions = ({ slug }) => {
  const ref = useRef(null)
  const [reaction, setReaction] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [reactionMessage, setReactionMessage] = useState('')
  const [reactionEmoji, setReactionEmoji] = useState('')
  const [cookies, setCookie] = useCookies()

  const handleReaction = async (reaction) => {
    setIsSubmitting(true)
    setReaction(reaction)

    try {
      const response = await axios.post('/api/add-reaction', {
        slug: slug,
        reaction: reaction,
      })
      setCookie(`${slug}`, `${slug}`)
      ref.current.rewardMe()
      setReactionMessage(response.data.message)
      setReactionEmoji('🎉')
      setIsSubmitting(false)
      setIsDisabled(true)
    } catch (error) {
      setReactionMessage(error.message)
      setReactionEmoji('🚨')
      setIsSubmitting(false)
      setIsDisabled(true)
    }
  }

  useEffect(() => {
    if (cookies[slug] === slug) {
      setIsDisabled(true)
      setReactionMessage("You've already reacted to this post!")
      setReactionEmoji('⚠️')
    } else {
      setReactionMessage("If you'd like to add a reaction to this post, please do!")
      setReactionEmoji('👇')
    }
  }, [cookies, slug])

  return (
    <Grid
      sx={{
        mt: 6,
      }}
    >
      <Grid
        sx={{
          gap: 0,
        }}
      >
        <Heading as="h3" variant="styles.h3" sx={{ textAlign: 'center' }}>
          Reactions
        </Heading>
        <Text
          as="div"
          sx={{
            display: 'grid',
            gap: 1,
            alignItems: 'center',
            gridTemplateColumns: 'auto auto',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {reactionMessage}

          <Box>
            <Reward
              ref={ref}
              type="confetti"
              config={{
                lifetime: 300,
                springAnimation: false,
              }}
            >
              <Box as="span" role="image">
                {reactionEmoji}
              </Box>
            </Reward>
          </Box>
        </Text>
      </Grid>

      <Grid
        sx={{
          gap: 0,
          gridTemplateColumns: [`repeat(${config.length}, 1fr)`],
          width: ['100%', '50%'],
          mx: 'auto',
        }}
      >
        {config.map((icon, index) => (
          <Grid
            sx={{
              gap: 0,
              justifyContent: 'center',
            }}
          >
            <Button
              aria-label={`${icon}-reaction-button`}
              key={index}
              variant="ghost"
              type="button"
              onClick={() => handleReaction(icon)}
              disabled={isSubmitting || isDisabled}
              sx={{
                alignItems: 'center',
                cursor: isSubmitting || isDisabled ? 'not-allowed' : 'pointer',
                display: 'flex',
                justifyContent: 'center',
                p: 1,
                minWidth: 0,
                width: 48,
                '.svg-icon': {
                  color: isSubmitting || isDisabled ? 'placeholder' : 'text',
                  borderWidth: '3px',
                  borderColor: isSubmitting || isDisabled ? 'surface' : 'primary',
                  borderStyle: 'solid',
                  borderRadius: '50%',
                },
              }}
            >
              {reaction === icon && isSubmitting ? <Spinner sx={{ width: 30, height: 30 }} /> : <SvgIcon name={icon} />}
            </Button>
            {/* <Text as="div" sx={{ textAlign: 'center' }}>
              0
            </Text> */}
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

Reactions.propTypes = {
  /** Post title" */
  slug: PropTypes.string,
}
