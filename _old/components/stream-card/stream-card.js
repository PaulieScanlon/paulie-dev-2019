import React from 'react';
import { format } from 'date-fns';
import { Grid, Box, Badge, Link, Card, Heading, Text, Image, Button } from 'theme-ui';
import { mix } from '@theme-ui/color';

export const StreamCard = ({ title, tags, date, excerpt, url, misc }) => {
  const getLogo = (image) => {
    const config = {
      gatsby: {
        image: image,
        name: 'Gatsby'
      },
      'deep-dives': {
        image: image,
        name: 'Gatsby Deep Dives with Queen Raae'
      },
      'summer-functions': {
        image: image,
        name: 'Gatsby Summer Functions with Queen Raae'
      }
    };

    return config[image];
  };

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener"
      sx={{
        textDecoration: 'none'
      }}
    >
      <Card
        sx={{
          p: 3
        }}
      >
        <Grid>
          <Grid
            sx={{
              alignItems: 'center',
              gridTemplateColumns: '1fr auto'
            }}
          >
            <Grid
              sx={{
                alignItems: 'center',
                gap: 0,
                gridTemplateColumns: 'auto 1fr'
              }}
            >
              <Image
                alt={`${misc}-logo`}
                src={`/images/${getLogo(misc)?.image}-logo.png`}
                sx={{ width: 16, height: 16 }}
              />
              <Text sx={{ color: 'secondary', ml: 2 }}>{getLogo(misc)?.name}</Text>
            </Grid>
            <Text sx={{ color: 'success' }}>{format(new Date(date), 'd-MMM-u')}</Text>
          </Grid>

          <Heading as="div" variant="styles.h3" sx={{ color: 'text' }}>
            {title}
          </Heading>
          <Text sx={{ color: 'text', wordBreak: 'break-word' }}>{excerpt}</Text>

          <Box
            sx={{
              ml: '2px'
            }}
          >
            {tags
              ? tags.map((tag, index) => {
                  return (
                    <Badge
                      key={index}
                      variant="primary"
                      sx={{
                        mr: 2,
                        mb: 2,
                        color: mix('muted', 'primary', `${index / tags.length}`),
                        borderColor: mix('muted', 'primary', `${index / tags.length}`)
                      }}
                    >
                      {tag}
                    </Badge>
                  );
                })
              : null}
          </Box>

          <Button as="span" variant="ghost" sx={{ pointerEvents: 'none' }}>
            Watch {/* eslint-disable */}
            <Box as="span" role="img" aria-label="television">
              📺
            </Box>
          </Button>
        </Grid>
      </Card>
    </Link>
  );
};
