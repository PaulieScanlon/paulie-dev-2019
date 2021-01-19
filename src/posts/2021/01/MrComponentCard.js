import React from 'react'
import { Box, Heading, Text, Button, Card, Image } from 'theme-ui'

export const MrComponentCard = () => {
  return (
    <Card>
      <Image src="https://placedog.net/600/350" alt="a dog - woof" />
      <Box
        sx={{
          p: 3,
        }}
      >
        <Heading as="h4" variant="styles.h4">
          MrComponentCard
        </Heading>
        <Text as="p" variant="styles.p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus convallis imperdiet
        </Text>
        <Button>Click Me</Button>
      </Box>
    </Card>
  )
}
