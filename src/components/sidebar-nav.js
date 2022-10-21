import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { AppContext } from '../context/app-context';

import NavigationIcon from '../components/navigation-icon';
import SiteSearch from '../components/site-search';

import { useNavigation } from '../hooks/use-navigation';
import { useAllMdx } from '../hooks/use-all-mdx';

const SidebarNav = ({ pathname }) => {
  const navigation = useNavigation();
  const allMdx = useAllMdx();

  return (
    <AppContext.Consumer>
      {({ isNavOpen, handleNav }) => {
        return (
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
        );
      }}
    </AppContext.Consumer>
  );
};

SidebarNav.propTypes = {
  /** The currently pathname */
  pathname: PropTypes.string.isRequired
};

export default SidebarNav;
