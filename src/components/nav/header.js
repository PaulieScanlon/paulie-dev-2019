import React from 'react';
import { Link } from 'gatsby';

import { AppContext } from '../../context/app-context';
import Logo from './logo';
import MenuIcon from './menu-icon';

const Header = () => {
  return (
    <AppContext.Consumer>
      {({ isNavOpen, handleNav }) => {
        return (
          <header className="sticky top-0 z-40 w-full backdrop-blur border-b border-b-outline flex-none bg-background lg:bg-transparent">
            <div className="max-w-8xl mx-auto">
              <div className="py-4 mx-4 lg:px-8 lg:mx-0">
                <div className="relative flex items-center">
                  <Link className="flex items-center" to="/">
                    <span className="sr-only">Georgi Marokov's Site</span>
                    <Logo />
                  </Link>
                  <div className="relative flex lg:hidden items-center ml-auto">
                    <button className="ml-auto flex items-center justify-center" onClick={handleNav}>
                      <span className="sr-only">Navigation</span>
                      <MenuIcon isNavOpen={isNavOpen} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>
        );
      }}
    </AppContext.Consumer>
  );
};

export default Header;
