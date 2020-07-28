import React from "react"
import { Flex } from "theme-ui"

export const BigNumber = ({ number }) => (
  <Flex
    sx={{
      alignItems: "center",
      backgroundColor: "success",
      borderRadius: "100%",
      color: "background",
      fontWeight: "bold",
      height: 60,
      justifyContent: "center",
      mb: 3,
      width: 60,
      fontSize: "32px",
    }}
  >
    {number}
  </Flex>
)
