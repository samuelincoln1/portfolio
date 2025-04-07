import React from "react";

export default function CodeContainer({ children, fileName }) {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg overflow-x-auto">
      {fileName && (
        <div className="bg-gray-700 p-2 rounded-lg font-mono text-sm inline-block">
          {fileName}
        </div>
      )}
      <pre className="rounded-b-lg">
        <code>{children}</code>
      </pre>
    </div>
  );
}
