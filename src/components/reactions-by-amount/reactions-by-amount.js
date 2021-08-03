import React, { useEffect } from 'react'
import { Box } from 'theme-ui'
import axios from 'axios'

export const ReactionsByAmount = () => {
  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get('/api/get-all-reactions')
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return <Box>Reactions By Amount</Box>
}
