import { posts } from "@/content/blog/posts";
import { isSanityConfigured, sanityClient } from "@/sanity/client";

export type BlogCoverImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export type BlogContentBlock = string | { _type: string; [key: string]: unknown };

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  excerpt: string;
  tags: string[];
  coverImage?: BlogCoverImage;
  body: BlogContentBlock[];
};

type SanityPost = Omit<BlogPost, "date" | "readingTime"> & { publishedAt: string };

const postsQuery = `*[_type == "post" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()]
  | order(publishedAt desc) {
    "slug": slug.current,
    title,
    publishedAt,
    excerpt,
    tags,
    "coverImage": coverImage {
      "url": asset->url,
      alt,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    },
    "body": body[] {
      ...,
      _type == "image" => { ..., "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height },
      _type == "videoEmbed" => { ..., "videoFileUrl": videoFile.asset->url }
    }
  }`;

function plainText(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(plainText).join(" ");
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return [record.text, record.code, record.children].map(plainText).join(" ");
  }
  return "";
}

function readingTime(body: BlogContentBlock[]) {
  const words = plainText(body).trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function sortPosts(collection: BlogPost[]) {
  return [...collection].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured) return sortPosts(posts);

  try {
    const sanityPosts = await sanityClient.fetch<SanityPost[]>(postsQuery, {}, { next: { revalidate: 60 } });
    return sanityPosts.map(({ publishedAt, body, ...post }) => ({
      ...post,
      date: new Intl.DateTimeFormat("en-US", { month: "long", day: "2-digit", year: "numeric" }).format(new Date(publishedAt)),
      readingTime: readingTime(body ?? []),
      tags: post.tags ?? [],
      body: body ?? [],
    }));
  } catch (error) {
    console.error("Sanity blog fetch failed; serving local sample posts instead.", error);
    return sortPosts(posts);
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const allPosts = await getAllPosts();
  return allPosts.find((post) => post.slug === slug);
}
