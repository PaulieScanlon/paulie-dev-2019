import React from 'react';
import PropTypes from 'prop-types';

const NavigationIcon = ({ icon }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
      <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
    </svg>
  );
};

NavigationIcon.propTypes = {
  /** Determins which svg path to display */
  icon: PropTypes.string.isRequired
};

export default NavigationIcon;
