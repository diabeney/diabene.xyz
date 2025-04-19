"use client";

import React, { useState, useEffect, useRef } from "react";

interface MatchGroup {
  start: number;
  end: number;
  text: string;
  isMatch: boolean;
}

export default function RegexHelper() {
  const [inputText, setInputText] = useState("The quick brown fox jumps over the lazy dog.");
  const [regexPattern, setRegexPattern] = useState("\\b\\w{4}\\b");
  const [regexFlags, setRegexFlags] = useState("g");
  const [matches, setMatches] = useState<MatchGroup[]>([]);
  const [isValidRegex, setIsValidRegex] = useState(true);
  const [explanation, setExplanation] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Parse and highlight matches
  useEffect(() => {
    try {
      const regex = new RegExp(regexPattern, regexFlags);
      setIsValidRegex(true);
      const newMatches: MatchGroup[] = [];
      let match;

      // For global flag, find all matches
      if (regexFlags.includes("g")) {
        regex.lastIndex = 0; // Reset state
        while ((match = regex.exec(inputText)) !== null) {
          newMatches.push({
            start: match.index,
            end: match.index + match[0].length,
            text: match[0],
            isMatch: true,
          });

          // Add text between matches
          if (newMatches.length > 0) {
            const prevEnd = newMatches[newMatches.length - 1].end;
            if (match.index > prevEnd) {
              newMatches.push({
                start: prevEnd,
                end: match.index,
                text: inputText.slice(prevEnd, match.index),
                isMatch: false,
              });
            }
          }
        }

        // Add remaining text after last match
        if (newMatches.length > 0) {
          const lastEnd = newMatches[newMatches.length - 1].end;
          if (lastEnd < inputText.length) {
            newMatches.push({
              start: lastEnd,
              end: inputText.length,
              text: inputText.slice(lastEnd),
              isMatch: false,
            });
          }
        } else if (inputText.length > 0) {
          newMatches.push({
            start: 0,
            end: inputText.length,
            text: inputText,
            isMatch: false,
          });
        }
      } else {
        // For non-global, just find first match
        const match = regex.exec(inputText);
        if (match) {
          newMatches.push({
            start: match.index,
            end: match.index + match[0].length,
            text: match[0],
            isMatch: true,
          });

          // Add text before match
          if (match.index > 0) {
            newMatches.unshift({
              start: 0,
              end: match.index,
              text: inputText.slice(0, match.index),
              isMatch: false,
            });
          }

          // Add text after match
          if (match.index + match[0].length < inputText.length) {
            newMatches.push({
              start: match.index + match[0].length,
              end: inputText.length,
              text: inputText.slice(match.index + match[0].length),
              isMatch: false,
            });
          }
        } else {
          newMatches.push({
            start: 0,
            end: inputText.length,
            text: inputText,
            isMatch: false,
          });
        }
      }

      setMatches(newMatches);
      generateExplanation(regex);
    } catch (e) {
      setIsValidRegex(false);
      setMatches([
        {
          start: 0,
          end: inputText.length,
          text: inputText,
          isMatch: false,
        },
      ]);
      setExplanation("Invalid regular expression");
    }
  }, [inputText, regexPattern, regexFlags]);

  // Generate explanation of the regex
  const generateExplanation = (regex: RegExp) => {
    let explanation = "";
    const source = regex.source;

    // Common patterns explanation
    if (source.includes("\\d")) explanation += "\\d - Matches any digit (0-9)\n";
    if (source.includes("\\w")) explanation += "\\w - Matches any word character (a-z, A-Z, 0-9, _)\n";
    if (source.includes("\\s")) explanation += "\\s - Matches any whitespace character\n";
    if (source.includes(".")) explanation += ". - Matches any character except newline\n";
    if (source.includes("^")) explanation += "^ - Matches start of string (or line in multiline mode)\n";
    if (source.includes("$")) explanation += "$ - Matches end of string (or line in multiline mode)\n";
    if (source.includes("*")) explanation += "* - Matches 0 or more of the preceding element\n";
    if (source.includes("+")) explanation += "+ - Matches 1 or more of the preceding element\n";
    if (source.includes("?")) explanation += "? - Matches 0 or 1 of the preceding element\n";
    if (source.includes("{")) explanation += "{n} - Matches exactly n occurrences\n";
    if (source.includes("|")) explanation += "| - OR operator (matches either pattern)\n";
    if (source.includes("[") && source.includes("]")) explanation += "[] - Character class (matches any one of the enclosed characters)\n";
    if (source.includes("(") && source.includes(")")) explanation += "() - Capturing group\n";
    if (source.includes("\\b")) explanation += "\\b - Word boundary\n";

    // Flags explanation
    if (regexFlags.includes("i")) explanation += "i flag - Case insensitive matching\n";
    if (regexFlags.includes("g")) explanation += "g flag - Global matching (find all matches)\n";
    if (regexFlags.includes("m")) explanation += "m flag - Multiline mode (^ and $ match start/end of line)\n";
    if (regexFlags.includes("s")) explanation += "s flag - Dotall mode (. matches newlines)\n";

    setExplanation(explanation || "No special pattern explanations available");
  };

  // Set cursor position in textarea
  const setCursorPosition = (position: number) => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(position, position);
    }
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "monospace",
      }}
    >
      <h1>Regex Helper</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <div>
          <h2>Regular Expression</h2>
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              value={regexPattern}
              onChange={(e) => setRegexPattern(e.target.value)}
              placeholder="Enter regex pattern"
              style={{
                flex: 1,
                padding: "8px",
                fontFamily: "monospace",
                border: isValidRegex ? "1px solid #ccc" : "1px solid red",
              }}
            />
            <input
              type="text"
              value={regexFlags}
              onChange={(e) => setRegexFlags(e.target.value)}
              placeholder="Flags (e.g. gi)"
              style={{
                width: "80px",
                padding: "8px",
                fontFamily: "monospace",
              }}
            />
          </div>

          <h2>Test String</h2>
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              width: "100%",
              height: "150px",
              padding: "10px",
              fontFamily: "monospace",
              fontSize: "16px",
              lineHeight: "1.5",
              whiteSpace: "pre",
              overflowWrap: "normal",
              overflowX: "auto",
            }}
          />
        </div>

        <div>
          <h2>Explanation</h2>
          <pre
            style={{
              backgroundColor: "#f5f5f5",
              padding: "15px",
              borderRadius: "4px",
              height: "150px",
              overflowY: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {explanation}
          </pre>

          <h2>Matches ({matches.filter((m) => m.isMatch).length} found)</h2>
          <div
            style={{
              backgroundColor: "#f5f5f5",
              padding: "15px",
              borderRadius: "4px",
              minHeight: "150px",
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            {matches.filter((m) => m.isMatch).length > 0 ? (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {matches
                  .filter((m) => m.isMatch)
                  .map((match, i) => (
                    <li key={i} style={{ marginBottom: "5px" }}>
                      <button
                        onClick={() => setCursorPosition(match.start)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#0066cc",
                          cursor: "pointer",
                          textDecoration: "underline",
                          padding: 0,
                        }}
                      >
                        Match {i + 1}: "{match.text}"
                      </button>
                      <span style={{ color: "#666" }}>
                        {" "}
                        (positions {match.start}-{match.end - 1})
                      </span>
                    </li>
                  ))}
              </ul>
            ) : (
              <p>No matches found</p>
            )}
          </div>
        </div>
      </div>

      <h2>Highlighted Text</h2>
      <div
        style={{
          position: "relative",
          border: "1px solid #ddd",
          padding: "15px",
          borderRadius: "4px",
          minHeight: "100px",
          fontFamily: "monospace",
          fontSize: "16px",
          lineHeight: "1.5",
          whiteSpace: "pre-wrap",
        }}
      >
        {matches.length > 0 ? (
          matches.map((segment, i) => (
            <span
              key={i}
              style={{
                backgroundColor: segment.isMatch ? "#ffeb3b" : "transparent",
                padding: "2px 0",
                borderRadius: "2px",
              }}
            >
              {segment.text}
            </span>
          ))
        ) : (
          <span>{inputText}</span>
        )}
      </div>

      <div style={{ marginTop: "20px", color: "#666" }}>
        <p>Tips:</p>
        <ul>
          <li>Click on matches to jump to their position in the text</li>
          <li>Use regex flags like g (global), i (case insensitive), m (multiline)</li>
          <li>Common patterns: \d (digit), \w (word), \s (space), . (any char)</li>
        </ul>
      </div>
    </div>
  );
}
