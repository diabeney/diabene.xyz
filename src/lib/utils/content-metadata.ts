"use server";

import * as fs from "node:fs/promises";
import * as path from "node:path";
import matter from "gray-matter";
import { __CONTENT_DIR } from "@/app/blog/[slug]/page";

export type ContentMetadata = {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  readTime: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
  coverImage: string;
  published: boolean;
  slug: string;
};

const DEFAULT_METADATA: Partial<ContentMetadata> = {
  title: "UTOPIA is real guys....",
  description: "",
  keywords: [],
  author: "Diabene Yaw Addo",
  published: true,
};

export async function getContentMetadata(slug: string): Promise<ContentMetadata> {
  const WPM = 150;
  const filePath = path.join(__CONTENT_DIR, `${slug}.mdx`);

  try {
    const [stats, fileContent] = await Promise.all([
      fs.stat(filePath),
      fs.readFile(filePath, "utf-8"),
    ]);

    const { data: frontmatter, content } = matter(fileContent);

    // Remove code blocks for more accurate reading time
    const text = content.replace(/```[\s\S]*?```/g, "");
    const words = text.split(/\s+/).filter(Boolean).length;
    const readTime = Math.max(1, Math.ceil(words / WPM));

    const description =
      frontmatter.description ||
      content
        .trim()
        .split("\n")
        .filter((line) => line.trim() !== "")
        .slice(0, 1)
        .join(" ")
        .slice(0, 160)
        .trim() + (content.length > 160 ? "..." : "");

    return {
      ...DEFAULT_METADATA,
      ...frontmatter,
      description,
      readTime,
      createdAt: new Date(stats.birthtime),
      slug,
      updatedAt: new Date(stats.mtime),
    } as ContentMetadata;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      throw new Error(`Content file for slug "${slug}" not found`);
    }
    throw new Error(`Failed to get metadata for slug "${slug}": ${(error as Error).message}`);
  }
}

export async function getAllContentMetadata(options?: {
  published?: boolean;
  sortBy?: keyof ContentMetadata;
  sortDirection?: "asc" | "desc";
}): Promise<(ContentMetadata & { slug: string })[]> {
  try {
    const files = await fs.readdir(__CONTENT_DIR);
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

    const metadataPromises = mdxFiles.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const metadata = await getContentMetadata(slug);
      return { ...metadata, slug };
    });

    let allMetadata = await Promise.all(metadataPromises);

    if (options?.published !== undefined) {
      allMetadata = allMetadata.filter((meta) => meta.published === options.published);
    }

    // Apply sorting
    if (options?.sortBy) {
      const sortBy = options.sortBy;
      const direction = options.sortDirection === "asc" ? 1 : -1;

      allMetadata.sort((a, b) => {
        const valueA = a[sortBy];
        const valueB = b[sortBy];

        if (valueA instanceof Date && valueB instanceof Date) {
          return direction * (valueA.getTime() - valueB.getTime());
        }

        if (typeof valueA === "string" && typeof valueB === "string") {
          return direction * valueA.localeCompare(valueB);
        }

        if (valueA === undefined && valueB === undefined) return 0;
        if (valueA === undefined) return -1 * direction;
        if (valueB === undefined) return 1 * direction;

        if (valueA < valueB) return -1 * direction;
        if (valueA > valueB) return 1 * direction;
        return 0;
      });
    }

    return allMetadata;
  } catch (error) {
    console.error("Failed to get all content metadata:", error);
    return [];
  }
}
