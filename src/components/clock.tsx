"use client";

import { useState, useEffect } from "react";

export default function DigitalClock() {
  const [time, setTime] = useState("");
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");

      setTime(`${hours}:${minutes}:${seconds}`);
      setFormattedTime(`${hours} hours, ${minutes} minutes, and ${seconds} seconds`);
    };

    updateClock();

    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className=" w-full items-center justify-center rounded-lg"
      role="timer"
      aria-live="polite"
      aria-atomic="true"
    >
      <time className="relative text-sm md:text-base font-mono" aria-label={formattedTime} dateTime={`T${time}`}>
        {time.split("").map((char, index) => (
          <span
            key={index}
            className={`inline-block transition-all duration-500 ${
              char === ":" ? "animate-pulse" : ""
            }`}
            aria-hidden="true"
          >
            {char}
          </span>
        ))}
        <span className="sr-only">{formattedTime}</span>
      </time>
    </div>
  );
}
