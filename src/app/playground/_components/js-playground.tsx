"use client";
import React, { useState, useEffect, useRef } from "react";

const JsPlayground = () => {
  const [code, setCode] = useState<string>(
    `// Try some JavaScript!
console.log("Hello, world!");

function greet(name) {
  return "Hello, " + name + "!";
}

greet("Developer");`
  );

  const [output, setOutput] = useState<string[]>([]);
  const outputEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of output
  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  const executeCode = () => {
    try {
      // Clear previous output
      setOutput([]);

      // Override console.log to capture output
      const originalLog = console.log;
      console.log = (...args) => {
        setOutput((prev) => [...prev, args.join(" ")]);
        originalLog(...args);
      };

      // Execute the code
      new Function(code)();

      // Restore original console.log
      console.log = originalLog;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setOutput((prev) => [...prev, `Error: ${errorMessage}`]);
    }
  };

  const clearOutput = () => {
    setOutput([]);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">JavaScript Playground</h1>
      </div>

      <div className="p-4 border-b">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 p-3 font-mono text-sm bg-gray-50 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          spellCheck="false"
        />
      </div>

      <div className="flex space-x-2 p-3 bg-gray-100">
        <button onClick={executeCode} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Run Code
        </button>
        <button onClick={clearOutput} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
          Clear Output
        </button>
      </div>

      <div className="p-4 bg-black text-green-400 font-mono text-sm h-48 overflow-y-auto">
        <div className="whitespace-pre-wrap">
          {output.length > 0 ? (
            output.map((line, i) => (
              <div key={i} className="mb-1">
                {line}
              </div>
            ))
          ) : (
            <div className="text-gray-500">Output will appear here...</div>
          )}
          <div ref={outputEndRef} />
        </div>
      </div>
    </div>
  );
};

export default JsPlayground;
