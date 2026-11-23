import Image from "next/image";
import Link from "next/link";
import type { PortfolioProject } from "@/lib/projects";

export function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <article className="group h-full overflow-hidden rounded-[1.75rem] border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5">
      <Link href={`/projects/${project.slug}`} className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-ring">
        <div className="relative aspect-[1.8] overflow-hidden bg-secondary">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
            unoptimized={project.image.startsWith("https://cdn.sanity.io/")}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
          />
        </div>
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              {project.category} <span className="mx-1 text-primary">/</span> {project.year}
            </p>
            {project.status && (
              <span className="shrink-0 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                {project.status}
              </span>
            )}
          </div>
          <h3 className="mt-4 text-3xl">{project.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.description}</p>
          {project.tools && project.tools.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tools used">
              {project.tools.map((tool) => (
                <li key={tool} className="rounded-full border border-border/70 px-2.5 py-1 text-xs text-muted-foreground">{tool}</li>
              ))}
            </ul>
          )}
          <span className="mt-6 text-sm font-semibold text-primary">View project <span aria-hidden="true">↗</span></span>
        </div>
      </Link>
    </article>
  );
}
