import type { Metadata } from "next";
import { PostCard } from "@/components/blog/post-card";
import { Reveal } from "@/components/site/reveal";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = { title: "Blog" };

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <Reveal>
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Notes &amp; ideas</p>
        <h1 className="mt-4 text-6xl tracking-tight sm:text-7xl">The journal<span className="text-primary">.</span></h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Field notes on making, building, and the details that make digital work feel human.</p>
      </div>
      </Reveal>
      <div className="mt-12 grid gap-5">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.05}>
            <PostCard post={post} />
          </Reveal>
        ))}
        {posts.length === 0 && <p className="rounded-2xl border border-dashed p-8 text-muted-foreground">No published articles yet. New writing is on the way.</p>}
      </div>
    </div>
  );
}
