import { ContentMetadata } from "@/lib/utils/content-metadata";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function BlogList({ posts }: { posts: ContentMetadata[] }) {
  return (
    <ul className=" flex flex-col gap-4 mt-6 w-full">
      {posts.map((post) => (
        <li
          key={post.slug}
          className=" border-dashed border-b border-stone-300 dark:border-stone-700 group"
        >
          <Link
            href={`/blog/${post.slug}`}
            className="transition-all duration-300 flex items-center justify-between py-2"
          >
            <Icon
              icon={"uiw:d-arrow-right"}
              className="transition-all duration-300 w-0 overflow-hidden opacity-0 transform -translate-x-4 group-hover:w-5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-amber-500"
            />
            <span className="flex-1 line-clamp-1 transition-all duration-300 group-hover:translate-x-1 group-hover:dark:text-stone-200">
              {post.title}
            </span>
            <span className=" text-xs">
              <p>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
