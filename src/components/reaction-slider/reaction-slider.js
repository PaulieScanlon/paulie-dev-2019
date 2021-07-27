import React from 'react'
import { Grid, Button, Heading, Text } from 'theme-ui'
import { SvgBubbleSlider } from 'react-svg-bubble-slider'
import axios from 'axios'

import { ReactionCount } from '../reaction-count'

const config = ['wondering', 'sad', 'happy', 'cool', 'confused', 'neutral', 'tongue']

export const ReactionSlider = () => {
  const handleReaction = async () => {
    const response = await axios.post('/api/add-reaction', {
      reaction: '',
    })
  }

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
        <Heading as="h3" variant="styles.h3">
          Reactions
        </Heading>
        <Text>If you'd like to add a reaction to this post, please do.</Text>
      </Grid>

      <Grid
        sx={{
          gap: 4,

          '.svg-timeline': {
            ':focus': {
              outlineColor: 'surface',
              outlineWidth: '1px',
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
        <SvgBubbleSlider icons={config}>
          {({ reaction }) => (
            <Button
              onClick={handleReaction}
              disabled={!reaction}
              sx={{
                cursor: 'pointer',
                fontFamily: 'body',
                backgroundColor: 'primary',
              }}
            >
              {reaction ? `Add ${reaction} reaction` : '...'}
            </Button>
          )}
        </SvgBubbleSlider>
      </Grid>
      <Grid>
        {config.map((icon, index) => (
          <ReactionCount key={index} name={icon} count={0} />
        ))}
      </Grid>
    </Grid>
  )
}
