import React from 'react';
import PropTypes from 'prop-types';

import GeneralObserver from './general-observer';

const Vimeo = ({ vimeoId, autoPlay = false, skipTo = { h: 0, m: 0, s: 0 } }) => {
  const { h, m, s } = skipTo;

  return (
    <GeneralObserver>
      <div className="relative aspect-video my-16">
        <iframe
          title={`vimeo-${vimeoId}`}
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=${autoPlay}#t=${h}h${m}m${s}s`}
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    </GeneralObserver>
  );
};

Vimeo.propTypes = {
  /** Vimeo id */
  vimeoId: PropTypes.string.isRequired,
  /** Skip to a time in the video */
  skipTo: PropTypes.shape({
    h: PropTypes.number,
    m: PropTypes.number,
    s: PropTypes.number
  }),
  /** Auto play the video */
  autoPlay: PropTypes.bool
};

export default Vimeo;
