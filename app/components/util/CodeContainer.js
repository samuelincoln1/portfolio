"use client";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

const customTheme = {
  ...darcula,
  'pre[class*="language-"]': {
    ...darcula['pre[class*="language-"]'],
    background: "#0d0e12",
    padding: "0px 16px 0px 16px",
  },
  'code[class*="language-"]': {
    ...darcula['code[class*="language-"]'],
    fontFamily: "Fira Code, monospace",
    textShadow: "0 0 4px rgb(12, 60, 190)",
  },
};

const CodeContainer = ({ children, fileName, language = "hcl" }) => {
  const [copied, setCopied] = useState(false);
  const codeString = typeof children === "string" ? children : String(children);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  return (
    <div className="bg-[#0d0e12] border border-[#4f5157] inset-0 rounded">
      <div className="flex flex-row justify-between">
        <div className="inline-flex justify-between items-center ml-2 mt-2 bg-[#232833] rounded-md p-2">
          <p className="text-[#d5d7db] text-sm">{fileName}</p>
        </div>
        <button
          onClick={handleCopy}
          className="text-[#d5d7db] text-sm mr-2 mt-2 border border-[#4f5157] rounded-md p-2 hover:bg-[#4f5157]"
        >
          {copied ? (
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#d5d7db"
            >
              <path
                d="M5 13l4 4L19 7"
                stroke="#d5d7db"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24.00 24.00"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#d5d7db"
            >
              {" "}
              <path
                d="M10.5 14L17 14"
                stroke="#d5d7db"
                strokeWidth="2.064"
                strokeLinecap="round"
              ></path>{" "}
              <path
                d="M7 14H7.5"
                stroke="#d5d7db"
                strokeWidth="2.064"
                strokeLinecap="round"
              ></path>{" "}
              <path
                d="M7 10.5H7.5"
                stroke="#d5d7db"
                strokeWidth="2.064"
                strokeLinecap="round"
              ></path>{" "}
              <path
                d="M7 17.5H7.5"
                stroke="#d5d7db"
                strokeWidth="2.064"
                strokeLinecap="round"
              ></path>{" "}
              <path
                d="M10.5 10.5H17"
                stroke="#d5d7db"
                strokeWidth="2.064"
                strokeLinecap="round"
              ></path>{" "}
              <path
                d="M10.5 17.5H17"
                stroke="#d5d7db"
                strokeWidth="2.064"
                strokeLinecap="round"
              ></path>{" "}
              <path
                d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z"
                stroke="#d5d7db"
                strokeWidth="2.064"
              ></path>{" "}
              <path
                d="M21 16.0002C21 18.8286 21 20.2429 20.1213 21.1215C19.2426 22.0002 17.8284 22.0002 15 22.0002H9C6.17157 22.0002 4.75736 22.0002 3.87868 21.1215C3 20.2429 3 18.8286 3 16.0002V13.0002M16 4.00195C18.175 4.01406 19.3529 4.11051 20.1213 4.87889C21 5.75757 21 7.17179 21 10.0002V12.0002M8 4.00195C5.82497 4.01406 4.64706 4.11051 3.87868 4.87889C3.11032 5.64725 3.01385 6.82511 3.00174 9"
                stroke="#d5d7db"
                strokeWidth="2.064"
                strokeLinecap="round"
              ></path>{" "}
            </svg>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={customTheme}
        className="code-container"
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeContainer;
