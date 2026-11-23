import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/site/reveal";
import { getAllProjects, getProjectsByCategory, projectCategories } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Selected work</p>
      <h1 className="mt-4 text-6xl tracking-tight sm:text-7xl">Projects <span className="text-primary">&amp; practice.</span></h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">A growing collection of creative and digital work. Browse by discipline—one sample is here to start.</p>

      <nav aria-label="Project categories" className="mt-8 flex flex-wrap gap-2">
        {projectCategories.map((category) => (
          <a key={category.slug} href={`#${category.slug}`} className="rounded-full border border-border/80 bg-card/60 px-4 py-2 text-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-secondary">{category.name}</a>
        ))}
      </nav>

      <div className="mt-14 space-y-14">
        {projectCategories.map((category, index) => {
          const projects = getProjectsByCategory(allProjects, category.name);

          return (
            <Reveal key={category.slug} delay={index * 0.04}>
              <section id={category.slug} aria-labelledby={`${category.slug}-heading`} className="scroll-mt-28">
                <div className="mb-5 flex items-baseline justify-between gap-4 border-b pb-4">
                  <div>
                    <h2 id={`${category.slug}-heading`} className="text-3xl tracking-tight">{category.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
                  </div>
                  <span className="shrink-0 text-sm text-muted-foreground">{projects.length} {projects.length === 1 ? "project" : "projects"}</span>
                </div>
                {projects.length > 0 ? (
                  <div className="grid gap-5 sm:grid-cols-2">
                    {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
                  </div>
                ) : (
                  <p className="rounded-2xl border border-dashed px-6 py-7 text-muted-foreground">{category.name} projects will appear here when they’re added.</p>
                )}
              </section>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
