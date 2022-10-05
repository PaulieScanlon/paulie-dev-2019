import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const WebmentionAside = ({ slug }) => {
  const [mentions, setMentions] = useState(null);

  useEffect(() => {
    const getMentions = async () => {
      try {
        const response = await fetch(`https://webmention.io/api/mentions.jf2?target=https://paulie.dev${slug}`);

        // All mentions
        // const response = await fetch(
        //   `https://webmention.io/api/mentions.jf2?domain=paulie.dev&token=${process.env.GATSBY_WEBMENTION_API_KEY}`
        // );

        const data = await response.json();
        setMentions(data.children);
      } catch (error) {
        console.error(error);
      }
    };

    getMentions();
  }, [slug]);

  return null;

  // return (
  //   <div className="grid gap-4 rounded border border-outline bg-surface/50 px-4 sm:px-6 py-6">
  //     <div className="mb-4">
  //       <h5 className="mb-0 text-base text-center leading-6 font-semibold uppercase text-secondary">Webmentions</h5>
  //     </div>
  //   </div>
  // );
};

WebmentionAside.propTypes = {
  /** The slug URL */
  slug: PropTypes.string.isRequired
};

export default WebmentionAside;
