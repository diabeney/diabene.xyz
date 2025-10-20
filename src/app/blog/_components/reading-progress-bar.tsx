"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center w-full">
      <AnimatePresence>
        {!isDismissed && timeLeft !== null && timeLeft > 0 && showInfo && (
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: 10,
                transition: { duration: 0.3 },
              }}
              className="px-4 py-1.5 rounded-full text-xs border border-neutral-800 bg-black/30 backdrop-blur-sm shadow-sm flex items-center"
            >
              <div className="flex items-center gap-1">
                <Icon icon="heroicons:clock" className="w-3.5 h-3.5" />
                <span>{timeLeft} min left</span>
                {readingProgress > 2 && <span className="">• {Math.round(readingProgress)} %</span>}
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: 10,
                transition: { duration: 0.3 },
              }}
              onClick={handleDismiss}
              className="p-1.5 bg-black/30 border border-neutral-800 rounded-full transition-colors shadow-sm backdrop-blur-sm"
              aria-label="Close reading progress indicator"
            >
              <Icon
                icon="heroicons:x-mark"
                className="w-3.5 h-3.5 text-stone-800 dark:text-stone-200"
              />
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
