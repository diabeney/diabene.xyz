import * as fs from "node:fs/promises";
import * as path from "node:path";
import Back from "@/components/back";
import { format, formatDistanceToNow } from "date-fns";
import { getContentMetadata } from "@/lib/utils/content-metadata";
import BlogPostWrapper from "../_components/blog-post-wrapper";
import ReadingProgressBar from "../_components/reading-progress-bar";
import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { title, description, coverImage } = await getContentMetadata(slug);

  return {
    title: `${title} | Diabene`,
    description,
    openGraph: {
      title: `${title} | Diabene`,
      description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${slug}`,
      images: [
        {
          url: coverImage,
          width: 1200,
          height: 1000,
        },
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-1.png`,
          width: 1200,
          height: 1000,
        },
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-2.png`,
          width: 1200,
          height: 1000,
        },
      ],
      type: "article",
    },
    twitter: {
      title: `${title} | Diabene`,
      card: "summary_large_image",
      description: `Read ${title} by Diabene`,
      images: [
        {
          url: coverImage,
          width: 1200,
          height: 1000,
        },
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-1.png`,
          width: 1200,
          height: 1000,
        },
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-2.png`,
          width: 1200,
          height: 1000,
        },
      ],
    },
  };
}

const __CONTENT_DIR = path.join(process.cwd(), "src", "contents");

export async function generateStaticParams() {
  const files = await fs.readdir(__CONTENT_DIR);
  return files.map((file) => ({ slug: file.replace(".mdx", "") }));
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { title, readTime, createdAt, updatedAt, coverImage } = await getContentMetadata(slug);

  const { default: Post } = await import(`@/contents/${slug}.mdx`);

  return (
    <BlogPostWrapper>
      <ReadingProgressBar readTime={readTime} />
      <article
        className="w-full mt-10 prose max-w-none prose-headings:mt-6 prose-img:rounded-lg prose-img:w-full prose-headings:font-semibold prose-headings:text-stone-600 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h5:text-lg prose-h6:text-lg dark:prose-headings:text-white
        prose-img:h-auto prose-p:text-stone-700 dark:prose-li:text-stone-300 prose-strong:text-inherit prose-li:text-stone-700 dark:prose-p:text-stone-300 prose-img:object-cover prose-img:object-center dark:prose-a:text-stone-300"
      >
        <Back />
        <h1 className="!leading-10">{title}</h1>
        <div className="flex text-xs sm:text-sm items-center gap-2 justify-between">
          <section className="flex items-center gap-2">
            <p className="text-stone-700  !my-0">{format(createdAt, "MMMM d, yyyy")}</p>
            <p className="text-stone-700 !my-0">•</p>
            <p className=" !my-0">{readTime} min read</p>
          </section>
          <p className="text-stone-700 !my-0">
            Updated{" "}
            {formatDistanceToNow(updatedAt, {
              addSuffix: true,
            })}
          </p>
        </div>
        <div className="w-full h-auto mt-10 max-h-72 sm:max-h-96 overflow-hidden rounded-lg">
          <Image src={coverImage} alt={slug} width={500} height={500} />
        </div>
        <Post />
      </article>
    </BlogPostWrapper>
  );
}
