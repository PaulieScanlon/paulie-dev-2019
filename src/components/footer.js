import React from 'react';
import { usePackage } from '../hooks/use-package';
import { useBuildTime } from '../hooks/use-build-time';

const Footer = () => {
  const packageJson = usePackage();
  const buildTime = useBuildTime();

  return (
    <footer className="text-sm leading-6 mt-12">
      <div className="mb-10 font-semibold flex items-center"></div>
      <div className="pt-10 pb-10 border-t border-outline text-slate-400">
        <div className="mb-6 sm:mb-0 flex flex-col sm:flex-row justify-between">
          <p>
            Built with Gatsby <span>{packageJson.dependencies.gatsby}</span>
          </p>
          <p>Last build: {buildTime}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
