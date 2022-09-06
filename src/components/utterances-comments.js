import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const UtterancesComments = ({ repo, theme, issueTerm }) => {
  const ref = useRef();

  useEffect(() => {
    const script = document.createElement('script');

    const config = {
      src: 'https://utteranc.es/client.js',
      repo: repo,
      'issue-term': issueTerm,
      theme: theme,
      crossOrigin: 'anonymous',
      defer: true
    };

    Object.entries(config).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    setTimeout(() => {
      ref.current.append(script);
    }, 1000);
  }, [repo, theme, issueTerm]);

  return (
    <section className="mx-auto w-full sm:w-11/12">
      <div ref={ref} />
    </section>
  );
};

UtterancesComments.defaultProps = {
  theme: 'github-light',
  issueTerm: 'pathname'
};

UtterancesComments.propTypes = {
  /** The name of the public repository to open issues  */
  repo: PropTypes.string.isRequired,
  /** The type of Theme to use */
  theme: PropTypes.oneOf([
    'github-light',
    'github-dark',
    'preferred-color-scheme',
    'github-dark-orange',
    'icy-dark',
    'dark-blue',
    'photon-dark',
    'boxy-light',
    'gruvbox-dark'
  ]),
  /** The property to use as the issue title */
  issueTerm: PropTypes.string
};

export default UtterancesComments;
