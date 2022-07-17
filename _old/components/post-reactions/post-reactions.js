import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Heading, Text, Spinner, Flex, Box } from 'theme-ui';

import Reward from 'react-rewards';
import axios from 'axios';
import { useCookies } from 'react-cookie';

import { ReactionIcon } from '../reaction-icon';

const config = ['wondering', 'sad', 'happy', 'cool', 'confused', 'neutral', 'tongue'];

export const PostReactions = ({ slug }) => {
  const ref = useRef(null);
  const [reaction, setReaction] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [reactionMessage, setReactionMessage] = useState('');
  const [reactionEmoji, setReactionEmoji] = useState('');
  const [cookies, setCookie] = useCookies();
  const [isLoading, setIsLoading] = useState(true);
  const [reactionCounts, setReactionsCounts] = useState({});

  const handleReaction = async (reaction) => {
    setIsSubmitting(true);
    setReaction(reaction);

    try {
      const response = await axios.post('/api/add-reaction', {
        slug: slug,
        reaction: reaction,
        date: new Date()
      });

      if (process.env.NODE_ENV === 'production') {
        setCookie(`${slug}`, `${slug}`);
        setIsDisabled(true);
      }
      ref.current.rewardMe();
      setReactionMessage(response.data.message);
      setReactionEmoji('🎉');
      setIsSubmitting(false);
    } catch (error) {
      setReactionMessage(error.message);
      setReactionEmoji('🚨');
      setIsSubmitting(false);
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    if (cookies[slug] === slug) {
      setIsDisabled(true);
      setReactionMessage("You've already reacted to this post!");
      setReactionEmoji('⚠️');
    } else {
      setReactionMessage("If you'd like to add a reaction to this post, please do!");
      setReactionEmoji('👇');
    }
  }, [cookies, slug]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post('/api/get-reactions-by-slug', {
          slug: slug
        });

        setReactionsCounts(response.data.reactions);
        setIsLoading(false);
      } catch (error) {
        setReactionMessage(error.message);
        setReactionEmoji('🚨');
        setIsSubmitting(false);
        setIsDisabled(true);
        setIsLoading(false);
      }
    })();
  }, [slug, isDisabled]);

  return (
    <Grid
      sx={{
        mt: 6
      }}
    >
      <Grid
        sx={{
          gap: 0
        }}
      >
        <Heading as="h3" variant="styles.h3" sx={{ textAlign: 'center' }}>
          Reactions
        </Heading>
        <Text
          as="div"
          sx={{
            display: 'grid',
            gap: 1,
            alignItems: 'center',
            gridTemplateColumns: 'auto auto',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          {reactionMessage}
          <Box>
            <Reward
              ref={ref}
              type="confetti"
              config={{
                lifetime: 300,
                springAnimation: false
              }}
            >
              <Box as="span" role="img">
                {reactionEmoji}
              </Box>
            </Reward>
          </Box>
        </Text>
      </Grid>

      <Box
        sx={{
          minHeight: 70
        }}
      >
        {!isLoading ? (
          <Grid
            sx={{
              gap: 0,
              gridTemplateColumns: [`repeat(${config.length}, 1fr)`],
              width: ['100%', '50%'],
              mx: 'auto'
            }}
          >
            {config.map((icon, index) => {
              return (
                <Grid
                  key={index}
                  sx={{
                    gap: 0,
                    justifyContent: 'center'
                  }}
                >
                  <Button
                    aria-label={`${icon}-reaction-button`}
                    variant="ghost"
                    type="button"
                    onClick={() => handleReaction(icon)}
                    disabled={isSubmitting || isDisabled}
                    sx={{
                      alignItems: 'center',
                      cursor: isSubmitting || isDisabled ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      p: 1,
                      minWidth: 0,
                      width: 48
                    }}
                  >
                    {reaction === icon && isSubmitting ? (
                      <Spinner sx={{ width: 30, height: 30 }} />
                    ) : (
                      <ReactionIcon name={icon} />
                    )}
                  </Button>
                  <Text as="div" sx={{ textAlign: 'center' }}>
                    {reactionCounts[icon] ? reactionCounts[icon].count : 0}
                  </Text>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Flex sx={{ justifyContent: 'center' }}>
            <Spinner sx={{ color: 'secondary' }} />
          </Flex>
        )}
      </Box>
    </Grid>
  );
};

PostReactions.propTypes = {
  /** Post title" */
  slug: PropTypes.string
};
