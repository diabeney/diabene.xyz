import { ContentMetadata } from "@/lib/utils/content-metadata";
import Image from "next/image";
import Link from "next/link";

export default function BlogThumbnail({ posts }: { posts: ContentMetadata[] }) {
  return posts.map((post) => (
    <li key={post.slug} className="group transition-all duration-300">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative h-44 w-full overflow-hidden rounded-lg mb-3 transition-all duration-300">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={500}
            height={500}
            className="h-full w-full object-cover scale-105 group-hover:scale-100 transition-all duration-500"
          />
          <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/60 to-transparent">
            <p className="text-xs font-medium text-white/80 flex items-center justify-between">
              <span>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                {post.readTime} min read
              </span>
            </p>
          </div>
        </div>
        <p className=" text-stone-800 dark:text-stone-400 group-hover:underline group-hover:dark:text-stone-200 line-clamp-2">
          {post.title}
        </p>
      </Link>
    </li>
  ));
}
