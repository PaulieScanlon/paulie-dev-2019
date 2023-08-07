import React from 'react';
import PropTypes from 'prop-types';

import GeneralObserver from './general-observer';

import { getPadding } from '../utils/get-padding';

const YouTube = ({
  youTubeId,
  youTubePlaylistId,
  aspectRatio = '16:9',
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
      <div
        className="youtube-mdx-embed"
        style={{
          position: 'relative',
          width: '100%',
          ...getPadding(aspectRatio)
        }}
      >
        <iframe
          data-testid="youtube"
          title={`youTube-${youTubeId ? youTubeId : youTubePlaylistId}`}
          src={src}
          frameBorder="0"
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
  /** Aspect ratio of YouTube video */
  aspectRatio: '1:1' | '16:9' | '4:3' | '3:2' | '8:5',
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
