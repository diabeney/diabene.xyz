"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useEffect, useRef, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

export default function JsPlayground() {
  const [code, setCode] = useState<string>(`
  function sayHello(name) {
    return \`Hello, \${name}!\`;
  } 
  const message = sayHello("Utopia")
  console.log(message)
`);

  const [output, setOutput] = useState<string[]>([]);
  const outputEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  const executeCode = useCallback(() => {
    const originalLog = console.log;
    try {
      setOutput([]);

      const capturedOutput: string[] = [];
      console.log = (...args) => {
        const line = args
          .map((arg) => {
            if (typeof arg === "object" && arg !== null) {
              try {
                return JSON.stringify(arg);
              } catch {
                return Object.prototype.toString.call(arg);
              }
            }
            return String(arg);
          })
          .join(" ");
        capturedOutput.push(line);
        originalLog(...args);
      };

      new Function(code)();

      console.log = originalLog;
      setOutput(capturedOutput);
    } catch (error: unknown) {
      console.log = originalLog;
      const errorMessage = error instanceof Error ? error.message : String(error);
      setOutput((prev) => [...prev, `Error: ${errorMessage}`]);
    } finally {
      console.log = originalLog;
    }
  }, [code]);

  const clearOutput = () => {
    setOutput([]);
  };

  const onChange = useCallback((value: string) => {
    setCode(value);
  }, []);

  return (
    <div className="mt-10 rounded-lg overflow-hidden">
      <div className="flex space-x-2 w-fit ml-auto mb-4 ">
        <button
          onClick={executeCode}
          className="text-xs flex gap-2 items-center bg-green-300 text-green-900 dark:text-green-200 dark:bg-green-900 px-2 py-1 rounded-md hover:opacity-90 transition-opacity"
        >
          Run code
          <Icon className=" size-3" icon={"carbon:play"} />
        </button>
        <button
          onClick={clearOutput}
          className="text-xs flex gap-2 items-center bg-stone-200 text-stone-900 dark:text-stone-400 dark:bg-stone-800/50 px-2 py-1 rounded-md hover:opacity-90 transition-opacity"
        >
          Clear output
          <Icon className=" size-3" icon={"lsicon:clear-outline"} />
        </button>
      </div>
      <div className="border border-stone-200 dark:border-stone-800 rounded-lg overflow-hidden mb-4">
        <CodeMirror
          value={code}
          height="240px"
          extensions={[javascript({ jsx: false })]}
          onChange={onChange}
          theme={"dark"}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            highlightActiveLine: true,
            autocompletion: true,
            syntaxHighlighting: true,
          }}
          className="text-sm font-mono"
        />
      </div>

      <div className="p-4 border border-stone-200 rounded-lg dark:border-stone-800 bg-stone-50 dark:bg-black text-green-400 font-mono text-sm h-48 overflow-y-auto">
        <div className="whitespace-pre-wrap">
          <div className="flex items-center mb-1 ">
            <span className="text-green-400">dbn</span>
            <span className="dark:text-stone-200 text-stone-600 ">@</span>
            <span className="text-purple-400">PORT-FOLIO</span>
            <span className="dark:text-stone-200 text-stone-600 ">:</span>
            <span className="text-blue-400">~/playground/js</span>
            <span className="dark:text-stone-200 text-stone-600 "> </span>
            <span className="text-yellow-400">(main)</span>
            <span className="dark:text-stone-200 text-stone-600 "> $ </span>
          </div>
          {output.length > 0
            ? output.map((line, i) => (
                <div key={i} className="mb-1  dark:text-white text-black">
                  {line}
                </div>
              ))
            : ""}
          <div ref={outputEndRef} />
        </div>
      </div>
    </div>
  );
}
