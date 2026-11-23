import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/site/reveal";
import { projectCategories } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Services",
  description: "Creative, digital, and electrical services offered by Roneil G. Bansas.",
};

const serviceDetails: Record<string, { description: string; deliverables: string[] }> = {
  "video-editing": {
    description: "Engaging edits shaped to fit your audience, platform, and story—from short-form clips to polished long-form video.",
    deliverables: ["Video editing", "Short-form clips", "Titles and transitions", "Export-ready formats"],
  },
  "graphic-design": {
    description: "Clear, considered visuals that help your brand, campaign, or content communicate with confidence.",
    deliverables: ["Brand and campaign graphics", "Social media assets", "Layout and visual hierarchy", "Digital-ready exports"],
  },
  "web-development": {
    description: "Responsive websites that bring your content and ideas online with a considered design and reliable implementation.",
    deliverables: ["Responsive websites", "Landing pages", "Content structure", "Frontend development"],
  },
  "app-development": {
    description: "Practical application experiences shaped around user needs, platform requirements, and the problem to solve.",
    deliverables: ["App interface development", "Core feature implementation", "Responsive UI", "Platform-aware delivery"],
  },
  "virtual-assistant": {
    description: "Organized, dependable remote support to help with recurring administrative and day-to-day business tasks.",
    deliverables: ["Administrative support", "Research and organization", "Inbox and calendar assistance", "Task coordination"],
  },
};

const electricalService = {
  slug: "electrical-installation-maintenance",
  name: "Electrical Installation & Maintenance",
  description: "Electrical installation and maintenance support, with a focus on careful work, safety, and dependable service.",
  deliverables: ["Electrical installation", "Inspection and maintenance", "Troubleshooting support", "Safety-minded workmanship"],
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <Reveal>
        <header className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">How I can help</p>
          <h1 className="mt-4 text-6xl leading-[0.95] tracking-tight sm:text-7xl">Services for ideas <span className="text-primary">and everyday needs.</span></h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">I offer the creative and digital services represented in my project categories, along with electrical installation and maintenance.</p>
        </header>
      </Reveal>

      <section aria-labelledby="creative-digital-services" className="mt-16">
        <div className="mb-7 flex items-end justify-between gap-4 border-b border-border/80 pb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Creative &amp; digital</p>
            <h2 id="creative-digital-services" className="mt-2 text-4xl">Project services</h2>
          </div>
          <Link href="/projects" className="hidden text-sm font-semibold underline decoration-primary/50 underline-offset-4 sm:inline">Browse project work ↗</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {projectCategories.map((category, index) => {
            const details = serviceDetails[category.slug];
            return (
              <Reveal key={category.slug} delay={index * 0.04}>
                <article className="h-full rounded-[1.5rem] border border-border/80 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/5 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">0{index + 1}</p>
                      <h3 className="mt-3 text-3xl">{category.name}</h3>
                    </div>
                    <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">↗</span>
                  </div>
                  <p className="mt-4 leading-7 text-muted-foreground">{details.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${category.name} offerings`}>
                    {details.deliverables.map((deliverable) => <li key={deliverable} className="rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground">{deliverable}</li>)}
                  </ul>
                  <Link href={`/projects#${category.slug}`} className="mt-6 inline-block text-sm font-semibold underline decoration-border underline-offset-4 hover:decoration-primary">View related projects</Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Reveal className="mt-16">
        <section id={electricalService.slug} aria-labelledby="electrical-service" className="overflow-hidden rounded-[1.75rem] border border-border/80 bg-secondary/60">
          <div className="grid gap-8 p-7 sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Additional service</p>
              <h2 id="electrical-service" className="mt-3 text-4xl sm:text-5xl">{electricalService.name}</h2>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{electricalService.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Electrical service offerings">
                {electricalService.deliverables.map((deliverable) => <li key={deliverable} className="rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-xs text-muted-foreground">{deliverable}</li>)}
              </ul>
            </div>
            <Link href="mailto:hello@example.com?subject=Electrical%20service%20inquiry" className="w-fit rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">Ask about this service ↗</Link>
          </div>
        </section>
      </Reveal>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">Have a project or service question?</p>
        <Link href="mailto:hello@example.com" className="mt-3 inline-block text-lg font-semibold underline decoration-primary/50 underline-offset-4">Get in touch ↗</Link>
      </div>
    </div>
  );
}
