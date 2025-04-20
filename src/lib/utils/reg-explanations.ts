export const generateExplanation = (regex: RegExp, regexFlags: string) => {
  let explanation = "";
  const source = regex.source;

  if (source.includes("\\d")) explanation += "\\d - Matches any number from 0 to 9\n";
  if (source.includes("\\w"))
    explanation += "\\w - Matches any letter, number, or underscore (_)\n";
  if (source.includes("\\s")) explanation += "\\s - Matches any space, tab, or line break\n";
  if (source.includes(".")) explanation += ". - Matches any character (except a line break)\n";
  if (source.includes("^")) explanation += "^ - Matches the beginning of the text\n";
  if (source.includes("$")) explanation += "$ - Matches the end of the text\n";
  if (source.includes("*")) explanation += "* - Matches zero or more of the thing before it\n";
  if (source.includes("+")) explanation += "+ - Matches one or more of the thing before it\n";
  if (source.includes("?")) explanation += "? - Matches zero or one of the thing before it\n";
  if (source.includes("{"))
    explanation += "{n} - Matches exactly 'n' times (like {3} means 3 times)\n";
  if (source.includes("|")) explanation += "| - Means 'or' (matches this or that)\n";
  if (source.includes("[") && source.includes("]"))
    explanation += "[] - Matches any one of the characters inside the brackets\n";
  if (source.includes("(") && source.includes(")")) explanation += "() - Groups things together\n";
  if (source.includes("\\b"))
    explanation += "\\b - Matches the edge of a word (like a word boundary)\n";

  // Flags explanation
  if (regexFlags.includes("i"))
    explanation += "i flag - Ignores uppercase and lowercase differences\n";
  if (regexFlags.includes("g"))
    explanation += "g flag - Finds all matches, not just the first one\n";
  if (regexFlags.includes("m"))
    explanation +=
      "m flag - Lets ^ and $ match the start/end of each line (not just the whole string)\n";
  if (regexFlags.includes("s")) explanation += "s flag - Lets . also match line breaks\n";

  return explanation || "No special pattern explanations available";
};
