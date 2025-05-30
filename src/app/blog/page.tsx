import { getAllContentMetadata } from "@/lib/utils/content-metadata";
import BlogView from "./_components/shared-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog posts by Diabene",
  openGraph: {
    title: "Diabene",
    description:
      "I share my thoughts, projects and discoveries in web dev technologies and chemical engineering",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
    siteName: "Diabene Portfolio",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-1.png`,
        width: 1200,
        height: 1000,
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diabene | Blog",
    description: "Utopia - Blog posts by Diabene on web dev technologies and chemical engineering",
    creator: "@diabeneyy",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-1.png`,
        width: 1200,
        height: 1000,
      },
    ],
  },
};

export default async function Blog() {
  try {
    const posts = await getAllContentMetadata({
      published: true,
      sortBy: "createdAt",
      sortDirection: "desc",
    });
    return (
      <div className="">
        <div>
          <h1 className="text-4xl  pb-1 font-bold mt-8">Utopia</h1>
        </div>
        <p>
          This is where i share my thoughts, projects and discoveries in web dev technologies and
          chemical engineering.
        </p>
        {posts.length === 0 ? <p>No blog posts published.</p> : <BlogView posts={posts} />}
      </div>
    );
  } catch (error) {
    console.error("Error reading posts:", error);
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
        <div className="p-4 bg-red-50 text-red-700 rounded">
          Error loading posts. Please check the console for details.
        </div>
      </div>
    );
  }
}
