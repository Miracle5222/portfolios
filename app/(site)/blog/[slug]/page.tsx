import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableContent } from "@/components/blog/portable-content";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return (await getAllPosts()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
      <Link href="/blog" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">← All articles</Link>
      <header className="mx-auto mt-10 max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-primary">{post.date} <span className="px-1 text-muted-foreground">/</span> {post.readingTime}</p>
        <h1 className="mt-5 text-5xl leading-[1.02] tracking-tight sm:text-7xl">{post.title}</h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">{post.excerpt}</p>
      </header>
      {post.coverImage && <div className="relative mt-10 aspect-[1.8] overflow-hidden rounded-[1.75rem] border border-border/70 bg-secondary"><Image src={post.coverImage.url} alt={post.coverImage.alt} fill priority sizes="(max-width: 896px) 100vw, 896px" className="object-cover" /></div>}
      <div className="prose-portfolio mx-auto mt-12 max-w-2xl text-lg leading-8 text-foreground/90 sm:mt-16">
        <PortableContent body={post.body} />
      </div>
    </article>
  );
}
