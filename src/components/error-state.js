import React from 'react';

const ErrorState = () => {
  return (
    <div className="flex gap-2 items-center p-2 border border-red-600 w-full rounded text-red-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>

      <div className="flex flex-col">
        <strong className="text-inherit">Error</strong>
        <small className="text-xs text-red-200">Probably something to do with that Elon bloke.</small>
      </div>
    </div>
  );
};

export default ErrorState;
