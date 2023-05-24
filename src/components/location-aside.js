import React, { useState, useEffect } from 'react';

import DottedMap from 'dotted-map/without-countries';

import dottedMapString from '../utils/dotted-string-map';
import Loading from './loading';

const TheMap = ({ location: { lat, lng } }) => {
  const map = new DottedMap({ map: JSON.parse(dottedMapString) });
  map.addPin({
    lat: lat,
    lng: lng,
    svgOptions: { color: '#ff6090', radius: 1.5 }
  });
  const svgMap = map.getSVG({
    radius: 0.22,
    color: '#8b87ea',
    shape: 'circle',
    backgroundColor: 'transparent'
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 400 250"
      className="relative w-full h-full z-10"
      aria-label="US data map"
    >
      <image href={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`} className="w-auto h-full" />
    </svg>
  );
};

const LocationAside = () => {
  const [location, setLocation] = useState(null);

  const setup = async () => {
    try {
      const twitterUser = await fetch('https://paulieapi.gatsbyjs.io/api/get-twitter-user', {
        method: 'POST',
        body: JSON.stringify({
          username: 'PaulieScanlon'
        })
      });

      if (!twitterUser.ok) {
        throw new Error('get-latest-tweets');
      }

      const userData = await twitterUser.json();
      const location = userData.user.location.split(',');
      // The location comes from my Twitter profile that needs to be set as a:
      // flag, city, lat, lng
      // E.g 🇬🇧, London, 51.5072, 0.1276

      setLocation({
        flag: location[0],
        city: location[1],
        lat: Number(location[2]),
        lng: Number(location[3])
      });
    } catch (error) {
      console.error('Error: [location-aside] - get-twitter-user');
    }
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <div className="flex items-center justify-center rounded border border-outline bg-surface/50 px-4 sm:px-6 py-6 min-h-[280px]">
      {location ? (
        <div>
          <div className="mb-4">
            <h5 className="mb-0 text-base text-center leading-6 font-semibold uppercase text-secondary">Location</h5>
            <div className="flex items-center justify-center gap-2 text-slate-300 text-sm text-center">
              <span className="">I'm currently in</span>
              <span className="m-0 flex gap-1 items-center justify-center">{location.city}</span>
              <span className="pt-1">{location.flag}</span>
            </div>
          </div>
          <div className="rounded border border-outline bg-surface">
            <TheMap location={location} />
          </div>
          <div className="mt-4 leading-tight">
            <small className="text-slate-400 text-xs">Powered by </small>
            <a href="https://paulieapi.gatsbyjs.io/" target="_blank" rel="noreferrer" className="text-xs">
              Paulie API
            </a>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default LocationAside;
