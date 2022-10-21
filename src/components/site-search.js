import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, navigate } from 'gatsby';
import { Command } from 'cmdk';

import QuickSearch from './quick-search';
import { formatDatestamp } from '../utils/format-date-stamp';

const SiteSearch = ({ nodes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleNavigate = (event, slug) => {
    if (event.key === 'Enter') {
      navigate(slug);
    }
  };

  const handleClick = () => {
    setIsOpen((open) => !open);
  };

  const handleDown = (event) => {
    if (event.key === 'k' && event.metaKey) {
      setIsOpen((open) => !open);
    }
    if (event.key === 'Enter' && event.target.value === 'esc') {
      setIsOpen((open) => !open);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleDown);
    return () => document.removeEventListener('keydown', handleDown);
  }, []);

  return (
    <Fragment>
      <QuickSearch onClick={handleClick} />
      <Command.Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
        label="Search"
        role="button"
        className="cursor-default fixed z-40 top-0 left-0 w-screen h-screen bg-background/80 backdrop-blur-sm"
      >
        <div className="flex p-6 w-full h-full justify-center items-start sm:items-center">
          <div className="w-full sm:max-w-[800px] min-h-[500px] p-6 rounded border border-outline bg-surface">
            <Command value={search} onValueChange={setSearch} className="grid gap-6">
              <div className="flex items-center gap-2 pb-4 border-outline border-b-[1px]">
                <svg aria-hidden="true" className="h-4 w-4 stroke-2 stroke-slate-400" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <Command.Input placeholder="Search" className="basis-full text-white focus:outline-none bg-surface" />
                <button
                  className="text-xs uppercase bg-outline rounded px-2 py-1 transition-all duration-300 hover:bg-muted/20"
                  aria-label="esc"
                  value="esc"
                  onClick={handleClick}
                >
                  esc
                </button>
              </div>
              <Command.List>
                <Command.Empty className="flex items-center justify-center px-4 text-center h-[340px]">
                  <span className="font-semibold text-lg text-slate-500">No results found.</span>
                </Command.Empty>
                <Command.Group className="rounded border border-outline h-[340px] overflow-auto">
                  {nodes.map((node, index) => {
                    const {
                      frontmatter: { title, date },
                      fields: { slug }
                    } = node;
                    return (
                      <Command.Item
                        key={index}
                        value={title}
                        disabled={true}
                        className="m-2 border-b-[1px] border-outline hover:bg-fuchsia"
                        onKeyDown={(event) => handleNavigate(event, slug)}
                      >
                        <Link
                          to={slug}
                          onClick={handleClick}
                          className="group flex flex-col px-4 py-3 text-slate-300 hover:text-white"
                        >
                          <span className="text-primary group-hover:text-white text-[0.6rem]">
                            {formatDatestamp(date)}
                          </span>
                          {title}
                        </Link>
                      </Command.Item>
                    );
                  })}
                </Command.Group>
              </Command.List>
            </Command>
            <div className="flex gap-2 mt-8 leading-tight">
              <small className="text-slate-400 text-xs">Powered by </small>
              <a href="https://cmdk.paco.me/" target="_blank" rel="noreferrer" className="text-slate-400 text-xs">
                <kbd className="flex gap-1 text-secondary font-sans font-semibold">
                  <abbr title="Command" className="no-underline">
                    ⌘
                  </abbr>
                  K
                </kbd>
              </a>
            </div>
          </div>
        </div>
      </Command.Dialog>
    </Fragment>
  );
};

SiteSearch.propTypes = {
  /** nodes list from allMdx */
  nodes: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default SiteSearch;
