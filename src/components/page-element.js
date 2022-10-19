import React, { Fragment } from 'react';
import { Slice } from 'gatsby';

import { AppContext } from '../context/app-context';

const PageElement = ({ children, location: { pathname } }) => {
  return (
    <Fragment>
      <Slice alias="header" />
      <div className="relative">
        <AppContext.Consumer>
          {({ isNavOpen, handleNav }) => {
            return (
              <div
                aria-label="lightbox"
                tabIndex="0"
                role="button"
                onClick={handleNav}
                onKeyDown={handleNav}
                className={`site-lightbox z-20 top-0 w-screen h-screen bg-black opacity-80 ${
                  isNavOpen ? 'fixed lg:hidden' : 'hidden'
                }`}
              />
            );
          }}
        </AppContext.Consumer>

        <div className="site-container max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
          <Slice alias="sidebar-nav" pathname={pathname} />
          <main className="site-body lg:pl-[14.5rem]">
            <section className="mx-auto pt-6 max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
              <article className="prose prose-lg max-w-none min-h-[calc(100vh-19rem)]">{children}</article>
              <Slice alias="footer" />
            </section>
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export default PageElement;
