import React from 'react';

import { Link } from 'gatsby';

import Logo from '../components/logo';

const Header = ({ children }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur border-b border-b-outline flex-none bg-background lg:bg-transparent">
      <div className="max-w-8xl mx-auto">
        <div className="py-4 mx-4 lg:px-8 lg:mx-0">
          <div className="relative flex items-center">
            <Link className="flex items-center" to="/">
              <span className="sr-only">Paul Scanlon's Blog</span>
              <Logo />
            </Link>
            <div className="relative flex lg:hidden items-center ml-auto">{children}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
