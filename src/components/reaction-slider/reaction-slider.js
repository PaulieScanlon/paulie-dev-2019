import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Grid, Button, Heading, Text, Spinner, Box } from 'theme-ui'
import { SvgBubbleSlider } from 'react-svg-bubble-slider'
import Reward from 'react-rewards'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import { ReactionCount } from '../reaction-count'

const config = ['wondering', 'sad', 'happy', 'cool', 'confused', 'neutral', 'tongue']

export const ReactionSlider = ({ slug }) => {
  const ref = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [reactionMessage, setReactionMessage] = useState('')
  const [reactionEmoji, setReactionEmoji] = useState('')
  const [cookies, setCookie] = useCookies()

  const handleReaction = async (reaction) => {
    setIsSubmitting(true)

    try {
      await axios.post('/api/add-reaction', {
        slug: slug,
        reaction: reaction,
      })
      setCookie(`${slug}`, `${slug}`)
      ref.current.rewardMe()
      setReactionMessage('Lovely stuff, your reaction has been added!')
      setReactionEmoji('🎉')
      setIsSubmitting(false)
      setIsDisabled(true)
    } catch (error) {}
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
          gap: 4,
          mb: 4,
          '.svg-timeline': {
            ':focus': {
              outlineColor: 'surface',
              outlineWidth: '3px',
              outlineStyle: 'solid',
              boxShadow: 'none',
            },
          },
          '.speech-bubble-stroke': {
            stroke: 'primary',
          },
          '.speech-bubble-fill': {
            fill: 'text',
          },
          '.speech-bubble-text': {
            fill: 'primary',
            fontSize: 3,
            fontWeight: 'bold',
            textTransform: 'capitalize',
          },
          '.speech-bubble-pop-line': {
            stroke: 'primary',
          },
          '.reaction-icon': {
            fill: 'text',
          },
          '.reaction-dot': {
            fill: 'primary',
          },
          '.svg-bubble-action': {
            minHeight: 3,
            textAlign: 'center',
          },
        }}
      >
        {isDisabled ? null : (
          <SvgBubbleSlider icons={config} scale={0.9} isDisabled={isDisabled}>
            {({ reaction }) => (
              <Button
                type="button"
                onClick={() => handleReaction(reaction)}
                disabled={!reaction || isSubmitting || isDisabled}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  minWidth: 160,
                  minHeight: 52,
                  cursor: 'pointer',
                  backgroundColor: 'primary',
                  textTransform: 'capitalize',
                }}
              >
                {isSubmitting ? <Spinner sx={{ height: 30 }} /> : reaction ? `${reaction}` : '...'}
              </Button>
            )}
          </SvgBubbleSlider>
        )}
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
          <ReactionCount key={index} name={icon} count={0} />
        ))}
      </Grid>
    </Grid>
  )
}

ReactionSlider.propTypes = {
  /** Post title" */
  slug: PropTypes.string,
}
