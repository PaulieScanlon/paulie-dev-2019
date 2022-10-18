import React, { Fragment, useState } from 'react';
import { Link, Slice } from 'gatsby';

import NavigationIcon from '../components/navigation-icon';
import MenuIcon from '../components/menu-icon';
import SiteSearch from '../components/site-search';
import Footer from '../components/footer';

import { useNavigation } from '../hooks/use-navigation';
import { useAllMdx } from '../hooks/use-all-mdx';

const PageElement = ({ children, location: { pathname } }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navigation = useNavigation();
  const allMdx = useAllMdx();

  const handleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <Fragment>
      <Slice alias="header">
        <button className="ml-auto flex items-center justify-center" onClick={handleNav}>
          <span className="sr-only">Navigation</span>
          <MenuIcon isNavOpen={isNavOpen} />
        </button>
      </Slice>
      <div className="relative">
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

        <div className="site-container max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
          <nav
            className={`site-nav lg:block fixed z-30 inset-0 top-[3.8125rem] transition-all duration-300
            ${isNavOpen ? 'left-[max(0px,calc(50%-45rem))]' : 'left-[-240px] lg:left-[max(0px,calc(50%-45rem))]'} 
            right-auto w-[14.5rem] pb-10 px-6 overflow-y-auto border-r border-r-outline bg-background`}
          >
            <div className="pt-10 pb-4">
              <SiteSearch nodes={allMdx} />
            </div>
            <div className="relative">
              <ul>
                {navigation.pages.map((page, index) => {
                  const {
                    fields: { slug },
                    frontmatter: { title, icon }
                  } = page;

                  const isIndex = slug === '/' && pathname !== '/' ? true : false;

                  return (
                    <li key={index} className="text-lg mb-2">
                      <Link
                        onClick={handleNav}
                        to={slug}
                        activeClassName={isIndex ? '' : '!text-primary'}
                        partiallyActive={true}
                        className="main-navigation text-slate-300"
                      >
                        <NavigationIcon icon={icon} />
                        {title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <hr className="border border-outline my-8" />
              <ul>
                {navigation.links.map((link, index) => {
                  const { url, title, icon, rel } = link;
                  return (
                    <li key={index} className="text-lg mb-2">
                      <a
                        key={index}
                        onClick={handleNav}
                        href={url}
                        target="_blank"
                        rel={`noreferrer ${rel}`}
                        className="main-navigation text-slate-400"
                      >
                        <NavigationIcon icon={icon} />
                        {title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
          <main className="site-body lg:pl-[14.5rem]">
            <section className="mx-auto pt-6 max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
              <article className="prose prose-lg max-w-none min-h-[calc(100vh-19rem)]">{children}</article>
              <Footer />
            </section>
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export default PageElement;
