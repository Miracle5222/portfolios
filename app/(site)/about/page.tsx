import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">A little context</p>
      <div className="mt-5 grid items-center gap-10 md:grid-cols-[1fr_.8fr]">
        <div>
          <h1 className="text-6xl leading-[0.95] tracking-tight sm:text-7xl">A curious mind, a practical maker.</h1>
          <Reveal delay={0.08}>
            <div className="mt-8 max-w-2xl space-y-5 text-lg leading-8 text-muted-foreground">
              <p>I’m Roneil G. Bansas, 26 years old, and interested in creative work across video editing, graphic design, web and app development, and virtual assistance.</p>
              <p>This portfolio is a home for selected projects and notes from my process. I value clear communication, thoughtful details, and dependable work.</p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.16}>
          <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-card p-2 shadow-xl shadow-foreground/5">
            <Image src="/images/me.jpg" alt="Profile Pic" width={900} height={940} className="w-full rounded-[1.5rem]" />
          </div>
        </Reveal>
      </div>
      <ul className="mt-12 flex flex-wrap gap-3" aria-label="Areas of work">
        {["Video editing", "Graphic design", "Web development", "App development", "Virtual assistance"].map((skill) => <li key={skill} className="rounded-full border border-border/80 bg-card px-4 py-2 text-sm text-muted-foreground">{skill}</li>)}
      </ul>
    </div>
  );
}
