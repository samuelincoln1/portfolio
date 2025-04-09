import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

const customTheme = {
  ...darcula,
  'pre[class*="language-"]': {
    ...darcula['pre[class*="language-"]'],
    background: '#0d0e12',
    padding: '0px 16px 0px 16px',
  },
  'code[class*="language-"]': {
    ...darcula['code[class*="language-"]'],
    fontFamily: 'Fira Code, monospace',
    textShadow: '0 0 2px rgba(0, 68, 255, 1)',
  },
};

const CodeContainer = ({ children }) => {
  const codeString = typeof children === "string" ? children : String(children);

  return (
    <div className="bg-[#0d0e12] border border-[#4f5157] inset-0 rounded">
    <SyntaxHighlighter
      language="hcl"
      style={customTheme}
      className="code-container"
      
    >
      {codeString}
    </SyntaxHighlighter>
     </div>
  );
};

export default CodeContainer;
