import Image from "next/image";
import Link from "next/link";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/site/reveal";
import { getAllPosts } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";

export default async function HomePage() {
  const posts = await getAllPosts();
  const portfolioProjects = await getAllProjects();
  const latestPost = posts[0];

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <section className="grid items-center gap-10 md:grid-cols-[1.05fr_.95fr] md:gap-8 lg:gap-14">
        <Reveal>
          <div className="relative z-10">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground"><span className="size-2 rounded-full bg-emerald-500" /> Creative partner · 26</p>
            <h1 className="max-w-2xl text-6xl leading-[0.92] tracking-[-0.045em] sm:text-7xl lg:text-[6.5rem]">Ideas, made <span className="text-primary">visible.</span></h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">I’m Roneil G. Bansas, a creative professional bringing video, design, development, and virtual support together to help good ideas move forward.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/projects" className="rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-transform hover:-translate-y-0.5">Explore my work <span aria-hidden="true" className="ml-2">↗</span></Link>
              <Link href="/services" className="rounded-full border border-border bg-card/70 px-6 py-3.5 text-sm font-medium transition-colors hover:bg-muted">Services I offer</Link>
              <Link href="/about" className="rounded-full border border-border bg-card/70 px-6 py-3.5 text-sm font-medium transition-colors hover:bg-muted">A little about me</Link>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground sm:gap-x-5" aria-label="Services"><li>Video editing</li><li aria-hidden="true">✳</li><li>Graphic design</li><li aria-hidden="true">✳</li><li>Digital products</li></ul>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="relative mx-auto w-full max-w-122.5">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-linear-to-br from-primary/10 via-accent/50 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card p-2 shadow-2xl shadow-foreground/10 sm:p-3">
              <Image src="/images/me.jpg" alt="Original illustration of a creative workspace and portrait" width={900} height={940} priority className="w-full rounded-[1.5rem]" />
              <div className="absolute bottom-7 left-7 rounded-2xl border border-white/50 bg-background/90 px-4 py-3 shadow-lg backdrop-blur"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">The goal</p><p className="mt-1 text-sm font-semibold">Thoughtful work. Real impact.</p></div>
            </div>
            <span className="absolute -right-3 top-12 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground shadow-md sm:-right-7">Curious by nature ✦</span>
          </div>
        </Reveal>
      </section>

      <Reveal className="mt-24 sm:mt-36">
        <section aria-labelledby="selected-work">
          <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10"><div><p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">A few recent things</p><h2 id="selected-work" className="mt-3 text-4xl tracking-tight sm:text-5xl">Selected work</h2></div><Link href="/projects" className="shrink-0 text-sm font-semibold underline decoration-primary/50 underline-offset-4 hover:decoration-primary">All projects <span aria-hidden="true">↗</span></Link></div>
          <div className="grid gap-6 sm:grid-cols-2">
            {portfolioProjects.slice(0, 2).map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
        </section>
      </Reveal>

      {latestPost && (
        <Reveal className="mt-20 sm:mt-28">
          <section className="grid overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-sm md:grid-cols-[.9fr_1.1fr]" aria-labelledby="latest-writing">
            <div className="relative min-h-56 md:min-h-80"><Image src={latestPost.coverImage?.url ?? "/images/blog-detail.svg"} alt={latestPost.coverImage?.alt ?? "Illustration for the latest blog post"} fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" /></div>
            <div className="flex flex-col justify-center p-7 sm:p-10"><p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Latest note <span className="text-muted-foreground">· {latestPost.readingTime}</span></p><h2 id="latest-writing" className="mt-4 text-4xl leading-tight">{latestPost.title}</h2><p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{latestPost.excerpt}</p><Link href={`/blog/${latestPost.slug}`} className="mt-6 w-fit text-sm font-semibold underline decoration-primary/50 underline-offset-4 hover:decoration-primary">Read the article <span aria-hidden="true">↗</span></Link></div>
          </section>
        </Reveal>
      )}
    </div>
  );
}
