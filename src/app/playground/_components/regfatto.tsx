"use client";

import ExternalLink from "@/components/external-link";
import { generateExplanation } from "@/lib/utils/reg-explanations";
import React, { useState, useEffect, useRef } from "react";

interface MatchGroup {
  start: number;
  end: number;
  text: string;
  isMatch: boolean;
}

// Debounce delay in milliseconds
const DEBOUNCE_DELAY = 500;

export default function Regfatto() {
  // State for the immediate input values
  const [displayedInputText, setDisplayedInputText] = useState("I tried some things that made you wanna stay");
  const [displayedRegexPattern, setDisplayedRegexPattern] = useState("\\b\\w{4}\\b");
  const [displayedRegexFlags, setDisplayedRegexFlags] = useState("g");

  // Debounced state values that trigger the matching logic
  const [debouncedInputText, setDebouncedInputText] = useState(displayedInputText);
  const [debouncedRegexPattern, setDebouncedRegexPattern] = useState(displayedRegexPattern);
  const [regexFlags, setRegexFlags] = useState(displayedRegexFlags); // Flags don't usually need debouncing

  const [matches, setMatches] = useState<MatchGroup[]>([]);
  const [isValidRegex, setIsValidRegex] = useState(true);
  const [explanation, setExplanation] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Debounce effect for Regex Pattern
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedRegexPattern(displayedRegexPattern);
    }, DEBOUNCE_DELAY);

    // Cleanup function to cancel the timeout if the value changes again quickly
    return () => {
      clearTimeout(handler);
    };
  }, [displayedRegexPattern]);

  // Debounce effect for Input Text
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInputText(displayedInputText);
    }, DEBOUNCE_DELAY);

    // Cleanup function
    return () => {
      clearTimeout(handler);
    };
  }, [displayedInputText]);

  // Parse and highlight matches - runs only when debounced values change
  useEffect(() => {
    // Use debounced values here
    const currentInputText = debouncedInputText;
    const currentRegexPattern = debouncedRegexPattern;

    if (!currentRegexPattern) {
      setIsValidRegex(true); // Or false, depending on desired behavior for empty pattern
      setMatches([
        {
          start: 0,
          end: currentInputText.length,
          text: currentInputText,
          isMatch: false,
        },
      ]);
      setExplanation("Enter a regular expression.");
      return;
    }

    try {
      const regex = new RegExp(currentRegexPattern, regexFlags);
      setIsValidRegex(true);
      const newMatches: MatchGroup[] = [];
      let match;
      let lastMatchEnd = 0;

      // For global flag, find all matches and non-matches
      if (regexFlags.includes("g")) {
        regex.lastIndex = 0; // Reset state for global searches

        while ((match = regex.exec(currentInputText)) !== null) {
          // Add non-matching text before the current match
          if (match.index > lastMatchEnd) {
            newMatches.push({
              start: lastMatchEnd,
              end: match.index,
              text: currentInputText.slice(lastMatchEnd, match.index),
              isMatch: false,
            });
          }

          // Add the current match
          newMatches.push({
            start: match.index,
            end: match.index + match[0].length,
            text: match[0],
            isMatch: true,
          });

          lastMatchEnd = regex.lastIndex;

          // Handle zero-length matches to avoid infinite loops
          if (match[0].length === 0) {
            regex.lastIndex++;
          }
        }

        // Add any remaining non-matching text after the last match
        if (lastMatchEnd < currentInputText.length) {
          newMatches.push({
            start: lastMatchEnd,
            end: currentInputText.length,
            text: currentInputText.slice(lastMatchEnd),
            isMatch: false,
          });
        }

        // If no matches were found at all
        if (newMatches.length === 0 && currentInputText.length > 0) {
          newMatches.push({
            start: 0,
            end: currentInputText.length,
            text: currentInputText,
            isMatch: false,
          });
        }
      } else {
        // For non-global, just find the first match
        const match = regex.exec(currentInputText);
        if (match) {
          // Add text before match
          if (match.index > 0) {
            newMatches.push({
              start: 0,
              end: match.index,
              text: currentInputText.slice(0, match.index),
              isMatch: false,
            });
          }
          // Add the match
          newMatches.push({
            start: match.index,
            end: match.index + match[0].length,
            text: match[0],
            isMatch: true,
          });
          // Add text after match
          const endOfMatch = match.index + match[0].length;
          if (endOfMatch < currentInputText.length) {
            newMatches.push({
              start: endOfMatch,
              end: currentInputText.length,
              text: currentInputText.slice(endOfMatch),
              isMatch: false,
            });
          }
        } else {
          // No match found
          newMatches.push({
            start: 0,
            end: currentInputText.length,
            text: currentInputText,
            isMatch: false,
          });
        }
      }

      setMatches(newMatches);
      const explanationText = generateExplanation(regex, regexFlags);
      setExplanation(explanationText);
    } catch (e) {
      setIsValidRegex(false);
      setMatches([
        {
          start: 0,
          end: currentInputText.length,
          text: currentInputText,
          isMatch: false,
        },
      ]);
      setExplanation(`Invalid regular expression: ${e instanceof Error ? e.message : "Unknown error"}`);
    }
    // Depend on debounced values and flags
  }, [debouncedInputText, debouncedRegexPattern, regexFlags]);

  // Set cursor position in textarea
  const setCursorPosition = (position: number) => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(position, position);
    }
  };

  // Update displayed flags and actual flags immediately
  const handleFlagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFlags = e.target.value;
    setDisplayedRegexFlags(newFlags);
    setRegexFlags(newFlags); // Update actual flags state directly
  };

  return (
    <div className="mt-10">
      <div className="">
        <div>
          <section className="flex gap-2.5 mb-2.5">
            <div className="w-full">
              <h6 className="mb-2">Regular Expression (without //)</h6>
              <input
                type="text"
                value={displayedRegexPattern} // Bind to displayed value
                onChange={(e) => setDisplayedRegexPattern(e.target.value)} // Update displayed value immediately
                placeholder="Enter regex pattern without the slashes"
                className={` w-full p-2 font-mono border ${
                  isValidRegex ? "border-stone-300 dark:border-stone-700" : "border-red-500"
                } rounded text-stone-900 dark:focus:border-stone-600 focus:border-stone-400 dark:text-stone-100 focus:outline-none `}
              />
              <small className="text-stone-500 dark:text-stone-400 text-xs block mt-1">
                Avoid patterns that cause <ExternalLink href="https://www.regular-expressions.info/catastrophic.html">Catastrophic Backtracking</ExternalLink>{" "}
                to prevent freezing.
              </small>
            </div>
            <div>
              <h6 className="mb-2">Flags</h6>
              <input
                type="text"
                value={displayedRegexFlags} // Bind to displayed value
                onChange={handleFlagsChange} // Update displayed and actual flags
                placeholder="e.g. gi"
                className="w-32 p-2 font-mono border text-stone-900 dark:text-stone-300 dark:focus:border-stone-600 focus:bord border-stone-300 focus:border-stone-400 dark:border-stone-700 rounded focus:outline-none  "
              />
            </div>
          </section>

          <h6 className="mb-2 mt-6">Test string</h6>
          <textarea
            ref={textareaRef}
            rows={6}
            value={displayedInputText} // Bind to displayed value
            placeholder="Insert your test string here"
            onChange={(e) => setDisplayedInputText(e.target.value)} // Update displayed value immediately
            className="w-full p-2.5 font-mono text-stone-900 dark:text-stone-300 dark:focus:border-stone-600 focus:bord text-base resize-none leading-relaxed border focus:border-stone-400 border-stone-300 dark:border-stone-700 rounded focus:outline-none  "
          />
          <div className=" text-stone-700 dark:text-stone-300">
            {matches.filter((m) => m.isMatch).length > 0 ? (
              <ul className="list-none p-0 flex gap-2 items-center">
                <p className="">Matches ({matches.filter((m) => m.isMatch).length}) :</p>
                {matches
                  .filter((m) => m.isMatch)
                  .map((match, i) => (
                    <li key={i} className="">
                      <button onClick={() => setCursorPosition(match.start)} className="underline opacity-60 hover:opacity-100 transition-opacity duration-300">
                        {match.text}
                      </button>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-stone-500 dark:text-stone-400">No matches found</p>
            )}
          </div>
        </div>
        <div className="mt-6 ">
          <h2 className="text-xl font-semibold mb-2">Explanation</h2>
          <pre className="font-mono text-sm text-stone-700 dark:text-stone-300 whitespace-pre-wrap">{explanation}</pre>
        </div>
      </div>
    </div>
  );
}
