import * as fs from "node:fs/promises";
import * as path from "node:path";
import Back from "@/components/back";
import { format, formatDistanceToNow } from "date-fns";
import { getContentMetadata } from "@/lib/utils/content-metadata";
import BlogPostWrapper from "../_components/blog-post-wrapper";
import Image from "next/image";

export const __CONTENT_DIR = path.join(process.cwd(), "src", "contents");

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
      <article
        className="blog-content mt-10 prose prose-headings:mt-6 prose-img:rounded-lg prose-img:w-full prose-headings:font-semibold prose-headings:text-stone-600 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h5:text-lg prose-h6:text-lg dark:prose-headings:text-white
        prose-img:h-80 dark:prose-p:text-stone-300 prose-img:object-cover prose-img:object-center"
      >
        <Back />
        <h1>{title}</h1>
        <div className="flex items-center justify-between">
          <section className="flex items-center gap-2">
            <p className="text-gray-700">{format(createdAt, "MMMM d, yyyy")}</p>
            <p className="text-gray-700">•</p>
            <p>{readTime} min read</p>
          </section>
          <p className="text-gray-700">
            Updated{" "}
            {formatDistanceToNow(updatedAt, {
              addSuffix: true,
            })}
          </p>
        </div>
        <Image src={coverImage} alt={slug} width={500} height={500} />

        <Post />
      </article>
    </BlogPostWrapper>
  );
}
