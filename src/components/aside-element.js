import React from 'react';

const AsideElement = ({ children }) => {
  return (
    <aside className="fixed z-10 top-[4.6rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-6 px-8 overflow-y-auto hidden xl:block">
      <div className="grid gap-8">{children}</div>
    </aside>
  );
};

export default AsideElement;
