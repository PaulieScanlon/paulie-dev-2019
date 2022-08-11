import React, { Fragment, useState } from 'react';
import { Link, Script } from 'gatsby';

import Logo from '../components/logo';
import MenuIcon from '../components/menu-icon';
import NavigationIcon from '../components/navigation-icon';
import Footer from '../components/footer';

import { useNavigation } from '../hooks/use-navigation';

const RootElement = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navigation = useNavigation();

  const handleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <Fragment>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GATSBY_GA_MEASUREMENT_ID}`}
        strategy="off-main-thread"
        forward={[`gtag`]}
      />
      <Script
        id="gtag-config"
        strategy="off-main-thread"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
          window.gtag = function gtag(){ window.dataLayer.push(arguments);}
          gtag('js', new Date()); 
          gtag('config', '${process.env.GATSBY_GA_MEASUREMENT_ID}', { send_page_view: false })`
        }}
      />

      <div className="sticky top-0 z-40 w-full backdrop-blur border-b border-b-outline flex-none bg-background lg:bg-transparent">
        <div className="max-w-8xl mx-auto">
          <div className="py-4 mx-4 lg:px-8 lg:mx-0">
            <div className="relative flex items-center">
              <Link className="flex items-center" to="/">
                <span className="sr-only">Paul Scanlon's Blog</span>
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
      </div>
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
          <div
            className={`site-nav lg:block fixed z-30 inset-0 top-[3.8125rem] transition-all duration-300
            ${isNavOpen ? 'left-[max(0px,calc(50%-45rem))]' : 'left-[-240px] lg:left-[max(0px,calc(50%-45rem))]'} 
            right-auto w-[14.5rem] pb-10 px-6 overflow-y-auto border-r border-r-outline bg-background`}
          >
            <nav className="relative pt-8">
              <ul>
                {navigation.pages.map((page, index) => {
                  const {
                    fields: { slug },
                    frontmatter: { title, icon }
                  } = page;
                  return (
                    <li key={index} className="text-lg mb-2">
                      <Link
                        onClick={handleNav}
                        to={slug}
                        activeClassName="!text-primary"
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
                  const { url, title, icon } = link;
                  return (
                    <li key={index} className="text-lg mb-2">
                      <a
                        key={index}
                        onClick={handleNav}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="main-navigation text-slate-400"
                      >
                        <NavigationIcon icon={icon} />
                        {title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          <div className="site-body lg:pl-[14.5rem]">
            <div className="mx-auto pt-6 max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
              <article className="prose prose-lg max-w-none min-h-[calc(100vh-19rem)]">{children}</article>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RootElement;
