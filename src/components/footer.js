import React from 'react';
import { usePackage } from '../hooks/use-package';

const Footer = () => {
  const packageJson = usePackage();

  return (
    <footer className="text-sm leading-6 mt-12">
      <div className="mb-10 font-semibold flex items-center"></div>
      <div className="pt-10 pb-10 border-t border-outline text-slate-400">
        <div className="mb-6 sm:mb-0 flex flex-col sm:flex-row justify-between">
          <p>
            Built with Gatsby <span>{packageJson.dependencies.gatsby}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
