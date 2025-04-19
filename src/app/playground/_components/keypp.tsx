"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { TypingQuotes } from "@/lib/constants/data";

type TestStatus = "idle" | "running" | "paused" | "finished";

const INACTIVITY_TIMEOUT_MS = 5000;

export default function Keypp() {
  const [input, setInput] = useState<string>("");
  const [quote, setQuote] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [status, setStatus] = useState<TestStatus>("idle");
  const [errors, setErrors] = useState<number[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const getRandomQuote = useCallback((): string => {
    const randomIndex = Math.floor(Math.random() * TypingQuotes.length);
    return TypingQuotes[randomIndex];
  }, []);

  const clearInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  }, []);

  const restartTest = useCallback(() => {
    setInput("");
    setStartTime(null);
    setEndTime(null);
    setStatus("idle");
    setErrors([]);
    clearInactivityTimer();

    // Return focus to the container after clicking restart.
    setTimeout(() => {
      containerRef.current?.focus();
    }, 0);
  }, [clearInactivityTimer]);

  const resetTest = useCallback(() => {
    restartTest();
    setQuote(getRandomQuote());

    // Return focus to the container after clicking shuffle
    setTimeout(() => {
      containerRef.current?.focus();
    }, 0);
  }, [getRandomQuote, restartTest]);

  useEffect(() => {
    resetTest();
    return clearInactivityTimer;
  }, [resetTest, clearInactivityTimer]);

  const resetInactivityTimer = useCallback(() => {
    clearInactivityTimer();

    if (status === "running") {
      inactivityTimerRef.current = setTimeout(() => {
        setStatus("paused");
      }, INACTIVITY_TIMEOUT_MS);
    }
  }, [status, clearInactivityTimer]);

  const calculateWPM = useCallback((): number => {
    if (!startTime || !endTime) return 0;
    const timeInMinutes = (endTime - startTime) / 60000;
    const words = input.trim().split(/\s+/).length;
    return Math.round(words / timeInMinutes);
  }, [startTime, endTime, input]);

  const calculateAccuracy = useCallback((): number => {
    if (input.length === 0) return 100;
    const correctChars = input.split("").filter((char, i) => char === quote[i]).length;
    return Math.round((correctChars / input.length) * 100);
  }, [input, quote]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent): void => {
      if (status === "finished") return;

      if (status === "paused" && e.key !== " " && e.key !== "Enter") return;

      if (status === "paused" && (e.key === " " || e.key === "Enter")) {
        setStatus("running");
        if (!startTime) {
          setStartTime(Date.now());
        }
        e.preventDefault();
        resetInactivityTimer();
        return;
      }

      if (status === "idle") {
        setStartTime(Date.now());
        setStatus("running");
      }

      const currentPos = input.length;
      const currentChar = quote[currentPos];

      if (e.key.length !== 1 && e.key !== "Backspace") return;

      resetInactivityTimer();

      if (e.key === "Backspace") {
        if (input.length > 0) {
          setInput((prev) => prev.slice(0, -1));
          setErrors((prev) => prev.filter((i) => i !== currentPos - 1));
        }
        return;
      }

      const isCorrect = e.key === currentChar;
      setInput((prev) => prev + e.key);

      if (!isCorrect) {
        setErrors((prev) => [...prev, currentPos]);
      }

      if (currentPos + 1 === quote.length) {
        setEndTime(Date.now());
        setStatus("finished");
        clearInactivityTimer();
      }
    },
    [status, startTime, input, quote, resetInactivityTimer, clearInactivityTimer]
  );

  const renderText = useCallback(() => {
    return quote.split("").map((char, index) => {
      let className = "";

      if (index < input.length) {
        className = input[index] === char ? "opacity-40" : "dark:text-red-400 text-red-600 opacity-40";
      } else if (index === input.length) {
        className = "underline decoration-2 ";
      }

      // Add blur effect when status is paused
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
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  return (
    <div ref={containerRef} tabIndex={0} onKeyDown={handleKeyDown} className="mt-14 outline-none">
      <div className="flex justify-between mb-4">
        <section className="flex gap-4">
          <div className="text-xs">
            <span className="text-stone-400">Speed: </span>
            <span className="text-stone-500">{status === "finished" ? `${calculateWPM()}wpm` : "N/A"}</span>
          </div>
          <div className="text-xs">
            <span className="text-stone-400">Accuracy: </span>
            <span className="text-stone-500">{status !== "idle" ? `${calculateAccuracy()}%` : "N/A"}</span>
          </div>
          <div className="text-xs">
            <span className="text-stone-400">Errors: </span>
            <span className="text-stone-500">{errors.length}</span>
          </div>
        </section>
        <div className="flex gap-2">
          <button
            disabled={status === "idle"}
            onClick={restartTest}
            className="text-xs flex gap-2 items-center bg-stone-300 text-stone-900 dark:text-stone-400 dark:bg-stone-800/50 px-2 py-1 rounded-md disabled:opacity-50"
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
      <div className="text-xl relative font-mono rounded-lg mb-4">
        {renderText()}
        {status === "paused" && (
          <div className="absolute text-sm inset-0 flex items-center justify-center">
            <p>Press space or enter to activate</p>
          </div>
        )}
      </div>
    </div>
  );
}
