import { useState, useEffect, useCallback, useRef } from "react";
import { TypingQuotes } from "@/lib/constants/data";

type TestStatus = "idle" | "running" | "paused" | "finished";

const INACTIVITY_TIMEOUT_MS = 5000;

export function useKeypp() {
  const [input, setInput] = useState<string>("");
  const [quote, setQuote] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [status, setStatus] = useState<TestStatus>("finished");
  const [errors, setErrors] = useState<number[]>([]);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  const clearIntervalTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const restartTest = useCallback(() => {
    setInput("");
    setStartTime(null);
    setEndTime(null);
    setStatus("idle");
    setErrors([]);
    setElapsedTime(0);
    clearInactivityTimer();
    clearIntervalTimer();
  }, [clearInactivityTimer, clearIntervalTimer]);

  const resetTest = useCallback(() => {
    restartTest();
    setQuote(getRandomQuote());
  }, [getRandomQuote, restartTest]);

  useEffect(() => {
    if (status === "running" && startTime) {
      intervalRef.current = setInterval(() => {
        const timeElapsed = Date.now() - startTime;
        setElapsedTime(timeElapsed);
      }, 100);
    } else if (status === "finished" && startTime && endTime) {
      setElapsedTime(endTime - startTime);
      clearIntervalTimer();
    } else if (status === "paused") {
      clearIntervalTimer();
    }

    return () => clearIntervalTimer();
  }, [status, startTime, endTime, clearIntervalTimer]);

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

  const formatElapsedTime = useCallback((ms: number): string => {
    const seconds = ms / 1000;
    if (seconds < 60) {
      return `${seconds.toFixed(1)}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  }, []);

  const calculateTimeElapsed = useCallback((): string => {
    if (status === "finished" && startTime && endTime) {
      return formatElapsedTime(endTime - startTime);
    }
    return formatElapsedTime(elapsedTime);
  }, [startTime, endTime, status, elapsedTime, formatElapsedTime]);

  const isValidTypingKey = useCallback((key: string): boolean => {
    return key.length === 1 || key === "Backspace";
  }, []);

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

      if (!isValidTypingKey(e.key)) return;

      if (status === "idle") {
        setStartTime(Date.now());
        setStatus("running");
      }

      const currentPos = input.length;
      const currentChar = quote[currentPos];

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
        clearIntervalTimer();
      }
    },
    [status, startTime, input, quote, resetInactivityTimer, clearInactivityTimer, clearIntervalTimer, isValidTypingKey]
  );

  return {
    input,
    quote,
    startTime,
    endTime,
    status,
    errors,
    elapsedTime,
    restartTest,
    resetTest,
    calculateWPM,
    calculateAccuracy,
    calculateTimeElapsed,
    handleKeyDown,
  };
}
