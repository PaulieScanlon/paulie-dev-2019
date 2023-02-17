import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const WebmentionAside = ({ target }) => {
  const [mentions, setMentions] = useState(null);

  useEffect(() => {
    const getMentions = async () => {
      try {
        const response = await fetch(`https://webmention.io/api/mentions.jf2?target=${target}`);

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();

        setMentions(data.children.filter((mention) => mention.author.photo));
      } catch (error) {
        console.error(error);
      }
    };

    getMentions();
  }, [target]);

  return (
    <Fragment>
      {mentions && mentions.length ? (
        <div className="grid gap-4  rounded border border-outline bg-surface/50 px-6 py-6">
          <h5 className="mb-2 text-base text-center leading-6 font-semibold uppercase text-secondary">Webmentions</h5>
          {mentions ? (
            <div>
              <ul className="m-0 p-0 list-none flex flex-wrap justify-center">
                {mentions.map((mention, index) => {
                  const {
                    author: { name, photo },
                    url
                  } = mention;

                  return (
                    <li key={index} className="m-0 -ml-2 p-0 w-6 h-6">
                      <a href={url} target="_blank" rel="noreferrer">
                        <img
                          alt={name}
                          src={photo}
                          className="block w-6 h-6 m-0 rounded-full overflow-hidden ring-2 ring-muted"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </Fragment>
  );
};

WebmentionAside.propTypes = {
  /** The target URL */
  target: PropTypes.string.isRequired
};

export default WebmentionAside;
