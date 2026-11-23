import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group grid overflow-hidden rounded-[1.5rem] border border-border/80 bg-card transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-foreground/5 sm:grid-cols-[.75fr_1.25fr]">
      <Link href={`/blog/${post.slug}`} className="relative block min-h-52 overflow-hidden bg-secondary" aria-label={`Read ${post.title}`}>
        <Image src={post.coverImage?.url ?? "/images/blog-detail.svg"} alt={post.coverImage?.alt ?? ""} fill sizes="(max-width: 640px) 100vw, 35vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
      </Link>
      <div className="flex flex-col justify-center p-6 sm:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{post.date} <span className="px-1 text-primary">/</span> {post.readingTime}</p>
        <h2 className="mt-3 text-3xl leading-tight tracking-tight">
          <Link href={`/blog/${post.slug}`} className="transition-colors group-hover:text-primary">{post.title}</Link>
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Topics">
          {post.tags.map((tag) => <li key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">{tag}</li>)}
        </ul>
      </div>
    </article>
  );
}
