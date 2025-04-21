import { useReducer, useEffect, useCallback, useRef } from "react";
import { TypingQuotes } from "@/lib/constants/data";
import { reducer, initialState } from "@/app/playground/keypp/functions/reducer";

const INACTIVITY_TIMEOUT_MS = 3000;

export function useKeypp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { input, quote, startTime, endTime, status, errors, elapsedTime } = state;

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

  const resetTest = useCallback(() => {
    dispatch({ type: "RESET", payload: getRandomQuote() });
    clearInactivityTimer();
    clearIntervalTimer();
  }, [getRandomQuote, clearInactivityTimer, clearIntervalTimer]);

  const restartTest = useCallback(() => {
    dispatch({ type: "RESTART", payload: getRandomQuote() });
    clearInactivityTimer();
    clearIntervalTimer();
  }, [getRandomQuote, clearInactivityTimer, clearIntervalTimer]);

  const resetInactivityTimer = useCallback(() => {
    clearInactivityTimer();

    if (status === "running") {
      inactivityTimerRef.current = setTimeout(() => {
        dispatch({ type: "SET_STATUS", payload: "paused" });
      }, INACTIVITY_TIMEOUT_MS);
    }
  }, [status, clearInactivityTimer]);

  useEffect(() => {
    if (status === "running" && startTime) {
      intervalRef.current = setInterval(() => {
        const timeElapsed = Date.now() - startTime;
        dispatch({ type: "SET_ELAPSED_TIME", payload: timeElapsed });
      }, 100);
    } else if (status === "finished" && startTime && endTime) {
      dispatch({ type: "SET_ELAPSED_TIME", payload: endTime - startTime });
      clearIntervalTimer();
    } else if (status === "paused") {
      clearIntervalTimer();
    }

    return () => clearIntervalTimer();
  }, [status, startTime, endTime, clearIntervalTimer]);

  // this is to reset the inactivity timer anytime the status is set to running. This fixes the issue where the inactivity timer would not reset when the test was paused.
  useEffect(() => {
    if (status === "running") {
      resetInactivityTimer();
    }
  }, [status, resetInactivityTimer]);

  // Using inputChange instead of keydown because soft keyboards on android phones don't trigger keydown events.
  const handleInputChange = useCallback(
    (value: string) => {
      if (state.status === "finished") return;

      // If the test is paused and the user presses any key, set the status to running and start the timer.
      if (state.status === "paused") {
        dispatch({ type: "SET_STATUS", payload: "running" });
        if (!state.startTime) {
          dispatch({ type: "SET_START_TIME", payload: Date.now() });
        }
        // return to prevent the input from being processed as a character input.
        return;
      }

      if (state.status === "idle") {
        dispatch({ type: "SET_STATUS", payload: "running" });
        dispatch({ type: "SET_START_TIME", payload: Date.now() });
      }

      resetInactivityTimer();

      const newChar = value.slice(-1);
      const currentPos = value.length - 1;
      const currentChar = state.quote[currentPos];

      if (value.length < state.input.length) {
        // Handle backspace
        dispatch({ type: "REMOVE_ERROR", payload: currentPos });
      } else {
        // Handle actual character input
        if (newChar !== currentChar) {
          dispatch({ type: "ADD_ERROR", payload: currentPos });
        }
      }

      dispatch({ type: "SET_INPUT", payload: value });

      if (value.length === state.quote.length) {
        dispatch({ type: "SET_END_TIME", payload: Date.now() });
        dispatch({ type: "SET_STATUS", payload: "finished" });
        clearInactivityTimer();
        clearIntervalTimer();
      }
    },
    [
      state.status,
      state.input.length,
      state.quote,
      state.startTime,
      dispatch,
      resetInactivityTimer,
      clearInactivityTimer,
      clearIntervalTimer,
    ]
  );

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
    if (seconds < 60) return `${seconds.toFixed(1)}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  }, []);

  const calculateTimeElapsed = useCallback((): string => {
    if (status === "finished" && startTime && endTime) {
      return formatElapsedTime(endTime - startTime);
    }
    return formatElapsedTime(elapsedTime);
  }, [status, startTime, endTime, elapsedTime, formatElapsedTime]);

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
    handleInputChange,
  };
}
