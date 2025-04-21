"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useKeypp } from "@/app/playground/keypp/hooks/useKeypp";
import ResultCard from "./results-card";

export default function Keypp() {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    input,
    quote,
    status,
    restartTest,
    resetTest,
    calculateTimeElapsed,
    handleInputChange,
    calculateWPM,
    calculateAccuracy,
    errors,
  } = useKeypp();

  const renderText = useCallback(() => {
    return quote.split("").map((char, index) => {
      let className = "";

      if (index < input.length) {
        className =
          input[index] === char ? "opacity-40" : "dark:text-red-400 text-red-600 opacity-40";
      } else if (index === input.length) {
        className = "underline decoration-2";
      }

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
    if (inputRef.current) inputRef.current.focus();
  }, [resetTest]);

  const handleShuffleClick = () => {
    resetTest();
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className="mt-14 outline-none focus:outline-none"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Using a hidden input to trigger mobile keyboard */}
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
        className="absolute opacity-0 pointer-events-none"
        autoFocus
      />

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
            onClick={handleShuffleClick}
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
            <div className="font-mono text-xl my-8 cursor-text">
              {renderText()}
              {status === "paused" && (
                <div className="absolute text-sm inset-0 flex items-center justify-center">
                  <p>Press any key to continue</p>
                </div>
              )}
            </div>

            <small className={`text-xs text-stone-500 ${status === "paused" ? "opacity-0" : ""}`}>
              You can tap the text to focus if it's unresponsive.
            </small>
          </motion.div>
        ) : (
          <ResultCard
            wpm={calculateWPM()}
            accuracy={calculateAccuracy()}
            errors={errors}
            timeElapsed={calculateTimeElapsed()}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
