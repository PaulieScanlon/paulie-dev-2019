import React from 'react';
import PropTypes from 'prop-types';

import GeneralObserver from './general-observer';

const YouTube = ({
  youTubeId,
  youTubePlaylistId,
  autoPlay = false,
  skipTo = { h: 0, m: 0, s: 0 },
  noCookie = false
}) => {
  const { h, m, s } = skipTo;

  const tH = h * 60;
  const tM = m * 60;

  const startTime = tH + tM + s;

  const provider = noCookie ? 'https://www.youtube-nocookie.com' : 'https://www.youtube.com';
  const baseUrl = `${provider}/embed/`;
  const src = `${baseUrl}${
    youTubeId ? `${youTubeId}?&autoplay=${autoPlay}&start=${startTime}` : `&videoseries?list=${youTubePlaylistId}`
  }`;

  return (
    <GeneralObserver>
      <div className="relative aspect-video my-16">
        <iframe
          title={`youTube-${youTubeId ? youTubeId : youTubePlaylistId}`}
          src={src}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
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

YouTube.propTypes = {
  /** YouTube id */
  youTubeId: PropTypes.string,
  /** YouTube Playlist id */
  youTubePlaylistId: PropTypes.string,
  /** Skip to a time in the video */
  skipTo: PropTypes.shape({
    h: PropTypes.number,
    m: PropTypes.number,
    s: PropTypes.number
  }),
  /** Auto play the video */
  autoPlay: PropTypes.bool,
  /** No Cookie option */
  noCookie: PropTypes.bool
};

export default YouTube;
