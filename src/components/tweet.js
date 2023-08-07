import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Tweet = ({ tweetLink, theme = 'light', align = 'center' }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTweet = setInterval(() => {
      if (
        typeof window.twttr !== `undefined` &&
        window.twttr.widgets &&
        typeof window.twttr.widgets.createTweet === `function`
      ) {
        clearInterval(loadTweet);
        setLoading(false);
        // https://developer.twitter.com/en/docs/twitter-for-websites/embedded-tweets/guides/embedded-tweet-parameter-reference
        window.twttr.widgets.createTweet(
          tweetLink.split('/').pop(),
          document.getElementsByClassName('tweet-mdx-embed')[0],
          {
            conversation: 'none',
            theme: theme,
            align: align,
            dnt: true
          }
        );
      }
    }, 100);

    return () => clearInterval(loadTweet);
  }, [theme, align]);

  return (
    <div className="tweet-mdx-embed my-16">
      {loading ? (
        <blockquote className="w-full text-center">
          <a href={`https://twitter.com/${tweetLink}?ref_src=twsrc%5Etfw`}>Loading</a>
        </blockquote>
      ) : null}
    </div>
  );
};

Tweet.propTypes = {
  /** Tweet link */
  tweetLink: PropTypes.string,
  /** Color theme of the Tweet */
  theme: PropTypes.oneOf(['light', 'dark']),
  /** Alignment of the Tweet */
  align: PropTypes.oneOf(['left', 'center', 'right'])
};

export default Tweet;
