import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';

const CodeHighlight = ({ children, className }) => {
  const language = className ? className.replace(/language-/, '') : '';
  return (
    <Highlight {...defaultProps} code={children} language={language} theme={undefined}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        return (
          <pre className={className} style={style}>
            {tokens.slice(0, -1).map((line, i) => {
              return (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => {
                    return <span {...getTokenProps({ token, key })} />;
                  })}
                </div>
              );
            })}
          </pre>
        );
      }}
    </Highlight>
  );
};

export default CodeHighlight;
