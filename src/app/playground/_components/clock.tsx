"use client";

import { useState, useEffect } from "react";

export default function DigitalClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");

      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateClock();

    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className=" hidden sm:flex w-full items-center justify-center rounded-lg ">
      <div className="relative font-mono">
        {time.split("").map((char, index) => (
          <span key={index} className={`inline-block transition-all duration-500 ${char === ":" ? "animate-pulse" : ""}`}>
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
