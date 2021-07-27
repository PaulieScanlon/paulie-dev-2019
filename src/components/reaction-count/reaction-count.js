import React from 'react'
import { SvgIcon } from 'react-svg-bubble-slider'

import { Flex, Box, Text } from 'theme-ui'

export const ReactionCount = ({ name, count }) => {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: '38px',
          bottom: '-6px',
        }}
      >
        <Flex
          sx={{
            alignItems: 'center',
            borderColor: 'primary',
            borderStyle: 'solid',
            borderWidth: '3px',
            backgroundColor: 'white',
            borderRadius: '50%',
            height: 38,
            justifyContent: 'center',
            textAlign: 'center',
            width: 38,
          }}
        >
          <Text as="small" variant="small" sx={{ m: 0, textAlign: 'center' }}>
            {count}
          </Text>
        </Flex>
      </Box>
      <Flex
        sx={{
          alignItems: 'center',
          p: 1,
          backgroundColor: 'primary',
          borderRadius: '50%',
          '.svg-icon': {
            color: 'text',
          },
        }}
      >
        <SvgIcon name={name} size={40} />
      </Flex>
    </Flex>
  )
}
