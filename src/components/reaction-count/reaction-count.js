import React from 'react'
import PropTypes from 'prop-types'
import { SvgIcon } from 'react-svg-bubble-slider'

import { Grid, Text } from 'theme-ui'

export const ReactionCount = ({ name, count = 0 }) => {
  return (
    <Grid
      sx={{
        gap: 1,
        justifyContent: 'center',
        alignItems: 'center',
        '.svg-icon': {
          color: 'text',
          borderWidth: '3px',
          borderColor: 'primary',
          borderStyle: 'solid',
          borderRadius: '50%',
        },
      }}
    >
      <SvgIcon name={name} size={38} />
      <Text as="div" sx={{ textAlign: 'center' }}>
        {count}
      </Text>
    </Grid>
  )
}

ReactionCount.propTypes = {
  /** Name of reaction" */
  name: PropTypes.string,
  /** React count per post*/
  count: PropTypes.number,
}
