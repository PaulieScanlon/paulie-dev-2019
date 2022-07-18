import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import Loading from '../components/loading';

const icons = [
  {
    name: 'wondering',
    paths: [
      '<path d="M16,0C7.2,0,0,7.2,0,16s7.2,16,16,16s16-7.2,16-16S24.8,0,16,0z M22,8c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S20.9,8,22,8z M8,10c0-1.1,0.9-2,2-2s2,0.9,2,2s-0.9,2-2,2S8,11.1,8,10z M10.4,25.2l-0.7-2.4l13.7-4l0.7,2.4L10.4,25.2z"/>'
    ]
  },
  {
    name: 'sad',
    paths: [
      '<path d="M16,0C7.2,0,0,7.2,0,16s7.2,16,16,16s16-7.2,16-16S24.8,0,16,0z M22,8c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S20.9,8,22,8z M10,8c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S8.9,8,10,8z M22,24.4c-1.2-2-3.5-3.4-6-3.4s-4.8,1.4-6,3.4l-2.6-1.5C9.2,19.9,12.4,18,16,18s6.8,1.9,8.6,4.9L22,24.4z"/>'
    ]
  },
  {
    name: 'happy',
    paths: [
      '<path d="M16,0C7.2,0,0,7.2,0,16s7.2,16,16,16s16-7.2,16-16S24.8,0,16,0z M22,8c1.1,0,2,1.3,2,3s-0.9,3-2,3s-2-1.3-2-3S20.9,8,22,8z M10,8c1.1,0,2,1.3,2,3s-0.9,3-2,3s-2-1.3-2-3S8.9,8,10,8z M16,28c-5.2,0-9.5-4.4-10-9.9c2.9,1.7,6.4,2.7,10,2.7s7.1-1,10-2.7C25.5,23.6,21.2,28,16,28L16,28z" />'
    ]
  },
  {
    name: 'cool',
    paths: [
      '<path d="M16,0C7.2,0,0,7.2,0,16s7.2,16,16,16s16-7.2,16-16S24.8,0,16,0z M16,26c-1.5,0-2.9-0.3-4.2-0.9l1-1.7c1,0.4,2.1,0.7,3.2,0.7c2.9,0,5.5-1.6,6.9-3.9l1.7,1C22.8,24.1,19.6,26,16,26L16,26z M26,12c0,1.1-0.9,2-2,2h-4c-1.1,0-2-0.9-2-2h-4c0,1.1-0.9,2-2,2H8c-1.1,0-2-0.9-2-2V9c0-0.6,0.4-1,1-1h6c0.6,0,1,0.4,1,1v1h4V9c0-0.6,0.5-1,1-1h6c0.5,0,1,0.4,1,1V12z"/>'
    ]
  },
  {
    name: 'confused',
    paths: [
      '<path d="M16,0C7.2,0,0,7.2,0,16s7.2,16,16,16s16-7.2,16-16S24.8,0,16,0z M22,8c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S20.9,8,22,8z M10,8c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S8.9,8,10,8z M21.5,25.3c-2.6,0.9-5.5-0.4-6.4-3c-0.6-1.6-2.3-2.4-3.8-1.8c-1.4,0.5-2.2,2-1.9,3.5h-2c-0.3-2.3,1-4.5,3.2-5.3c2.6-0.9,5.5,0.4,6.4,3c0.6,1.6,2.3,2.4,3.8,1.8c1.4-0.5,2.2-2,1.9-3.5h2C25,22.3,23.7,24.5,21.5,25.3z"/>'
    ]
  },
  {
    name: 'neutral',
    paths: [
      '<path d="M16,0C7.2,0,0,7.2,0,16s7.2,16,16,16s16-7.2,16-16S24.8,0,16,0z M20,24h-8v-2h8V24z M22,8c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S20.9,8,22,8z M10,8c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S8.9,8,10,8z"/>'
    ]
  },
  {
    name: 'tongue',
    paths: [
      '<path d="M16,0C7.2,0,0,7.2,0,16s7.2,16,16,16s16-7.2,16-16S24.8,0,16,0z M10,8c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S8.9,8,10,8z M24,20h-2v3c0,1.7-1.3,3-3,3s-3-1.3-3-3v-3H8v-2h16V20z M22,12c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S23.1,12,22,12z"/>'
    ]
  }
];

const AddReaction = ({ slug }) => {
  const [response, setResponse] = useState('');
  const [isSubmittig, setIsSubmitting] = useState(false);
  const [currentReaction, setCurrentReaction] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleReaction = async (name) => {
    setCurrentReaction(name);
    setIsSubmitting(true);
    try {
      const response = await (
        await fetch('/api/add-reaction', {
          method: 'POST',
          body: JSON.stringify({
            slug: slug,
            reaction: name,
            date: new Date()
          })
        })
      ).json();
      setResponse(response.message);
      setCurrentReaction(null);
      setIsSubmitting(false);
      setHasSubmitted(true);
    } catch (error) {}
  };

  return (
    <section className="flex justify-center">
      <div className="inline-flex justify-center flex-col min-h-[140px] max-w-[500px] w-full text-center rounded border border-outline bg-surface/70 p-4 sm:px-6">
        {hasSubmitted ? (
          <Fragment>
            <h5 className="text-base text-center leading-6 font-semibold uppercase text-secondary">Thanks</h5>
            <p className="mb-5 text-slate-300 text-sm text-center m-0">
              {response}{' '}
              <span role="img" aria-label="Party Popper" className="text-center">
                🎉
              </span>
            </p>
          </Fragment>
        ) : (
          <Fragment>
            <h5 className="text-base text-center leading-6 font-semibold uppercase text-secondary">How am I doing?</h5>
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
                  <li key={index} className="m-0 p-0 flex items-center">
                    {isSubmitted() ? (
                      <Loading className="w-7 h-7 sm:w-9 sm:h-9" />
                    ) : (
                      <button
                        className={`rounded-full p-0.5 ${currentReaction ? pending : active}`}
                        onClick={() => handleReaction(name)}
                      >
                        <svg
                          title={name}
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 sm:w-8 sm:h-8"
                          fill="currentColor"
                          viewBox="0 0 32 32"
                        >
                          <g key={index} dangerouslySetInnerHTML={{ __html: paths.map((path) => path) }} />
                        </svg>
                      </button>
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
  slug: PropTypes.string
};

export default AddReaction;
