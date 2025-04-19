"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ReadingProgressBarProps {
  readTime?: number;
}

export default function ReadingProgressBar({ readTime = 0 }: ReadingProgressBarProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const updateReadingProgress = () => {
      const currentPosition = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        const progress = Number((currentPosition / scrollHeight).toFixed(2)) * 100;
        setReadingProgress(progress);

        if (readTime > 0) {
          const minutesLeft = Math.ceil(readTime * (1 - progress / 100));
          setTimeLeft(minutesLeft);
        }

        // Show info bubble when scrolled at least 2%
        setShowInfo(progress > 2 && progress < 98);
      }
    };

    window.addEventListener("scroll", updateReadingProgress);

    updateReadingProgress();

    return () => window.removeEventListener("scroll", updateReadingProgress);
  }, [readTime]);

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <div className="sticky top-16 z-50 flex justify-center w-full mt-1 mb-3">
      {timeLeft !== null && timeLeft > 0 && showInfo && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="px-4 py-1.5 rounded-full bg-white/90 dark:bg-stone-800/90 text-xs font-medium text-stone-800 dark:text-stone-200 backdrop-blur-sm shadow-sm flex items-center gap-2"
        >
          <div className="flex items-center gap-1">
            <Icon icon="heroicons:clock" className="w-3.5 h-3.5" />
            <span>{timeLeft} min left</span>
            {readingProgress > 2 && <span className="">• {Math.round(readingProgress)} %</span>}
          </div>

          <button
            onClick={handleDismiss}
            className="ml-2 p-0.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            aria-label="Close reading progress indicator"
          >
            <Icon icon="heroicons:x-mark" className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
