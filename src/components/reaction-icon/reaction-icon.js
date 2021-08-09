import React from 'react'
import PropTypes from 'prop-types'
import { SvgIcon } from 'react-svg-bubble-slider'

import { Flex } from 'theme-ui'

export const ReactionIcon = ({ name }) => {
  return (
    <Flex
      sx={{
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
      <SvgIcon name={name} />
    </Flex>
  )
}

ReactionIcon.propTypes = {
  /** Reaction icon name */
  name: PropTypes.string,
}
