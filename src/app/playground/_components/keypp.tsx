"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKeypp } from "../../../lib/hooks/useKeypp";

export default function Keypp() {
  const {
    input,
    quote,
    status,
    errors,
    restartTest,
    resetTest,
    calculateWPM,
    calculateAccuracy,
    calculateTimeElapsed,
    handleKeyDown,
  } = useKeypp();

  const containerRef = useRef<HTMLDivElement>(null);

  const renderText = useCallback(() => {
    return quote.split("").map((char, index) => {
      let className = "";

      if (index < input.length) {
        className =
          input[index] === char ? "opacity-40" : "dark:text-red-400 text-red-600 opacity-40";
      } else if (index === input.length) {
        className = "underline decoration-2 ";
      }

      // Adding a blur effect when status is paused
      if (status === "paused") {
        className += " blur-[4px]";
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  }, [quote, input, status]);

  useEffect(() => {
    resetTest();

    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, [resetTest]);

  return (
    <div ref={containerRef} tabIndex={0} onKeyDown={handleKeyDown} className="mt-14 outline-none">
      <div className="flex justify-between mb-4">
        <section className="flex items-center">
          <div className="text-sm font-mono flex items-center gap-1">
            <Icon icon="heroicons:clock" className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-400">Time: </span>
            <span className="text-stone-500">{calculateTimeElapsed()}</span>
          </div>
        </section>
        <div className="flex gap-2">
          <button
            disabled={status === "idle"}
            onClick={restartTest}
            className="text-xs flex gap-2 items-center bg-green-300 text-green-900 dark:text-green-200 dark:bg-green-900 px-2 py-1 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Restart
            <Icon icon={"ph:arrow-clockwise"} />
          </button>
          <button
            onClick={resetTest}
            className="text-xs flex gap-2 items-center bg-stone-300 text-stone-900 dark:text-stone-400 dark:bg-stone-800/50 px-2 py-1 rounded-md"
          >
            Shuffle
            <Icon icon={"ph:shuffle"} />
          </button>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {status !== "finished" ? (
          <motion.div
            key="typing-area"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative mb-4"
          >
            <div className=" font-mono text-xl my-8">
              {renderText()}
              {status === "paused" && (
                <div className="absolute text-sm inset-0 flex items-center justify-center">
                  <p>Press space or enter to activate</p>
                </div>
              )}
            </div>
            <small className="text-xs text-stone-500">
              You can click the text to focus if it's unresponsive.
            </small>
          </motion.div>
        ) : (
          <motion.div
            key="results-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className=""
          >
            <h3 className="text-xl font-medium mb-4 text-stone-800 dark:text-stone-200">Results</h3>
            <div className="grid grid-cols-2 font-mono gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center bg-green-100/80 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4"
              >
                <span className="text-3xl font-bold text-green-800 dark:text-green-300">
                  {calculateWPM()}
                </span>
                <span className="text-sm text-green-600 dark:text-green-400">WPM</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center bg-yellow-100/80 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"
              >
                <span className="text-3xl font-bold text-yellow-800 dark:text-yellow-300">
                  {calculateAccuracy()}%
                </span>
                <span className="text-sm text-yellow-600 dark:text-yellow-400">Accuracy</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center bg-red-100/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4"
              >
                <span className="text-3xl font-bold text-red-800 dark:text-red-300">
                  {errors.length}
                </span>
                <span className="text-sm text-red-600 dark:text-red-400">Errors</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center bg-teal-100/80 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 rounded-lg p-4"
              >
                <span className="text-3xl font-bold text-teal-800 dark:text-teal-300">
                  {calculateTimeElapsed()}
                </span>
                <span className="text-sm text-teal-600 dark:text-teal-400">Time</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
