"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const noTransitionRoutes = ["events"];

export default function Template({ children }: Props) {
  const pathname = usePathname();

  const isBlogSlugPage = /\/blog\/[^\/]+$/.test(pathname);

  const shouldEscapeRouteTransition =
    isBlogSlugPage ||
    noTransitionRoutes.some((route) => {
      const regex = new RegExp(`${route}`);
      return regex.test(pathname);
    });

  if (shouldEscapeRouteTransition) return children;

  return (
    <AnimatePresence initial mode="wait">
      <motion.div key={pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
