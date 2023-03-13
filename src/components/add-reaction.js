import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Loading from '../components/loading';

import { icons } from '../utils/reaction-paths';

const AddReaction = ({ title, slug }) => {
  const [message, setMessage] = useState('');
  const [reactions, setReactions] = useState(null);
  const [isSubmittig, setIsSubmitting] = useState(false);
  const [currentReaction, setCurrentReaction] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleReaction = async (name) => {
    setCurrentReaction(name);
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/fauna-add-reaction', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          slug: slug,
          reaction: name,
          date: new Date()
        })
      });

      const data = await response.json();

      setMessage(data.message);
      setCurrentReaction(null);
      setIsSubmitting(false);
      setHasSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getReactions = async () => {
      const response = await fetch('/api/fauna-reaction-by-slug', {
        method: 'POST',
        body: JSON.stringify({
          slug: slug
        })
      });

      const data = await response.json();
      setReactions(data.reactions);
    };
    getReactions();
  }, [slug]);

  return (
    <section className="mx-auto w-full sm:w-11/12 flex justify-center my-16">
      <div className="inline-flex justify-center flex-col min-h-[180px] w-full text-center rounded border border-outline bg-surface p-4 sm:px-6">
        {hasSubmitted ? (
          <Fragment>
            <p className="m-0 text-base text-center leading-6 font-semibold uppercase text-secondary">Thanks</p>
            <p className="mb-5 text-slate-300 text-sm text-center m-0">
              {message}{' '}
              <span role="img" aria-label="Party Popper" className="text-center">
                🎉
              </span>
            </p>
          </Fragment>
        ) : (
          <Fragment>
            <p className="m-0 text-base text-center leading-6 font-semibold uppercase text-secondary">
              How am I doing?
            </p>
            <p className="mb-5 text-slate-300 text-sm text-center m-0">
              Hey! Lemme know if you found this helpful by leaving a reaction.
            </p>
            <ul className="list-none m-0 p-0 flex flex-wrap gap-2 sm:gap-4 justify-center">
              {icons.map((icon, index) => {
                const { name, paths } = icon;

                const active =
                  'bg-muted text-slate-100 transition-all duration-500 ease-out hover:scale-125 hover:shadow-md hover:shadow-secondary/50 hover:text-white';

                const pending = 'bg-muted/50 text-white/30';

                const isSubmitted = () => (name === currentReaction && isSubmittig ? true : false);

                return (
                  <li key={index} className="m-0 p-0 flex flex-col gap-1 items-center">
                    {isSubmitted() ? (
                      <Loading className="w-6 h-6 sm:w-8 sm:h-8" />
                    ) : (
                      <Fragment>
                        <button
                          className={`rounded-full p-0.5 ${currentReaction ? pending : active}`}
                          onClick={() => handleReaction(name)}
                        >
                          <svg
                            aria-labelledby={`reaction-${name}`}
                            title={name}
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 sm:w-8 sm:h-8"
                            fill="currentColor"
                            viewBox="0 0 32 32"
                          >
                            <title id={`reaction-${name}`}>{name}</title>
                            <g key={index} dangerouslySetInnerHTML={{ __html: paths.map((path) => path) }} />
                          </svg>
                        </button>
                        <div className="font-bold text-center text-sm">
                          {reactions && reactions[name] ? <Fragment>{`x${reactions[name]?.count}`}</Fragment> : 'x0'}
                        </div>
                      </Fragment>
                    )}
                  </li>
                );
              })}
            </ul>
          </Fragment>
        )}
      </div>
    </section>
  );
};

AddReaction.propTypes = {
  /** The slug to post reaction with */
  slug: PropTypes.string.isRequired
};

export default AddReaction;
