"use client";

import { motion } from "framer-motion";
import { useKeypp } from "../hooks/useKeypp";

function ResultCard({
  wpm,
  accuracy,
  errors,
  timeElapsed,
}: {
  wpm: number;
  accuracy: number;
  errors: number[];
  timeElapsed: string;
}) {
  return (
    <motion.div
      key="results-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-medium mb-4 text-stone-800 dark:text-stone-200">Results</h3>
      <div className="grid grid-cols-2 font-mono gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center bg-green-100/80 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4"
        >
          <span className="text-3xl font-bold text-green-800 dark:text-green-300">{wpm}</span>
          <span className="text-sm text-green-600 dark:text-green-400">WPM</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center bg-yellow-100/80 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"
        >
          <span className="text-3xl font-bold text-yellow-800 dark:text-yellow-300">
            {accuracy}%
          </span>
          <span className="text-sm text-yellow-600 dark:text-yellow-400">Accuracy</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center bg-red-100/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4"
        >
          <span className="text-3xl font-bold text-red-800 dark:text-red-300">{errors.length}</span>
          <span className="text-sm text-red-600 dark:text-red-400">Errors</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center bg-teal-100/80 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 rounded-lg p-4"
        >
          <span className="text-3xl font-bold text-teal-800 dark:text-teal-300">{timeElapsed}</span>
          <span className="text-sm text-teal-600 dark:text-teal-400">Time</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ResultCard;
