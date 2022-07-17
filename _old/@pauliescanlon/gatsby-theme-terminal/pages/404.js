import React from 'react';
import { Container, Grid, Box, Heading, Text, Link } from 'theme-ui';
import { Link as GatsbyLink } from 'gatsby';

const Page = () => (
  <Container
    sx={{
      margin: '0 auto',
      maxWidth: 1200
    }}
  >
    <Box as="main" sx={{ p: 4, textAlign: 'center' }}>
      <Heading as="h1" variant="styles.h1">
        404
      </Heading>
      <Grid>
        <Text>Page Not Found</Text>
        <Link to="/" as={GatsbyLink}>
          Back to Home
        </Link>
      </Grid>
    </Box>
  </Container>
);

export default Page;
