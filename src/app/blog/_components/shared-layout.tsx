"use client";
import BlogThumbnail from "@/app/blog/_components/blog-thumbnail";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ContentMetadata } from "@/lib/utils/content-metadata";
import { useState, useEffect } from "react";
import BlogList from "./bloglist";
import { motion, AnimatePresence } from "framer-motion";
import { loadItem, saveItem } from "@/lib/utils/local-storage";

export default function BlogView({ posts }: { posts: ContentMetadata[] }) {
  const mode = loadItem("mode", "grid");
  const [view, setView] = useState<"grid" | "list">(mode);
  useEffect(() => {
    saveItem("mode", view);
  }, [view]);

  return (
    <div className=" mt-10 w-full">
      <span className=" flex ml-auto w-fit items-center gap-1">
        <button className={`${view === "grid" ? "bg-stone-200" : "bg-stone-50"} transition-colors duration-300 rounded-lg p-1`} onClick={() => setView("grid")}>
          <Icon icon={"foundation:thumbnails"} className=" size-6" />
        </button>
        <button className={`${view === "list" ? "bg-stone-200" : "bg-stone-50"} transition-colors duration-300 rounded-lg p-1`} onClick={() => setView("list")}>
          <Icon icon={"lucide:list"} className="size-6" />
        </button>
      </span>

      <AnimatePresence mode="wait" initial={false}>
        {view === "grid" ? (
          <motion.ul key="grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <ul className="space-y-4 mt-4 pl-0 list-none grid grid-cols-1 md:grid-cols-2 gap-4">
              <BlogThumbnail posts={posts} />
            </ul>
          </motion.ul>
        ) : (
          <motion.div key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <ul className=" flex gap-6">
              <BlogList posts={posts} />
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
