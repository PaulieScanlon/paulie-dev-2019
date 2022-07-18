import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const SsrPageLayout = ({ slug, title, body }) => {
  return (
    <Fragment>
      <small className="mb-4 leading-6 font-semibold capitalize text-primary">{slug}</small>
      <h1>{title}</h1>
      <p>{body}</p>
    </Fragment>
  );
};

SsrPageLayout.propTypes = {
  /** The slug  of the page */
  slug: PropTypes.string.isRequired,
  /** The title of the page */
  title: PropTypes.string.isRequired,
  /** The body content of the page */
  body: PropTypes.string.isRequired
};

export default SsrPageLayout;
