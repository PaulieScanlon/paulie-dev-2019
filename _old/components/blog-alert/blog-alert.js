import React from 'react';
import { Box, Alert, Link } from 'theme-ui';

export const BlogAlert = () => {
  return (
    <Alert variant="primary">
      <Box as="span">
        More of my content can be found on the{'  '}
        <Link
          href="https://www.gatsbyjs.com/contributors/paul-scanlon"
          rel="noreferrer"
          target="_blank"
          sx={{
            color: 'background'
          }}
        >
          Gatsby Blog
        </Link>
      </Box>
    </Alert>
  );
};
