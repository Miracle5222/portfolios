import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/site/reveal";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return project
    ? { title: project.title, description: project.description }
    : {};
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projects = await getAllProjects();
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) notFound();

  const relatedProjects = projects
    .filter((candidate) => candidate.category === project.category && candidate.slug !== project.slug)
    .slice(0, 2);
  const featuredVideo = project.category === "Video Editing"
    ? project.media?.find((item) => item.type === "video")
    : undefined;
  const galleryMedia = project.media?.filter((item) => {
    if (!featuredVideo) return true;
    if (item.type === "video" && item.src === featuredVideo.src) return false;
    return item.type !== "image" || item.src !== featuredVideo.poster;
  });

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <Link href="/projects" className="text-sm font-medium text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground">← All projects</Link>
      <Reveal className="mt-10">
        <header className="max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">{project.category} <span className="mx-1 text-muted-foreground">/</span> {project.year}</p>
          <h1 className="mt-4 text-5xl leading-[0.96] tracking-tight sm:text-7xl">{project.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{project.description}</p>
          {project.status && <span className="mt-5 inline-flex rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">{project.status}</span>}
        </header>
      </Reveal>

      <Reveal delay={0.08} className="mt-10">
        <div className="relative aspect-[1.8] overflow-hidden rounded-[1.75rem] border border-border/70 bg-secondary shadow-xl shadow-foreground/5">
          {featuredVideo ? (
            <video className="h-full w-full object-contain" controls preload="metadata" poster={featuredVideo.poster}>
              <source src={featuredVideo.src} />
              Your browser does not support embedded video.
            </video>
          ) : (
            <Image src={project.image} alt={project.imageAlt} fill priority sizes="(max-width: 1280px) 100vw, 1200px" unoptimized={project.image.startsWith("https://cdn.sanity.io/")} className="object-cover" />
          )}
        </div>
      </Reveal>

      {galleryMedia && galleryMedia.length > 0 && (
        <section aria-label="Project gallery" className="mt-6 grid gap-5 sm:grid-cols-2">
          {galleryMedia.map((item, index) => (
            <Reveal key={`${item.type}-${item.src}`} delay={index * 0.04}>
              <figure className="overflow-hidden rounded-2xl border border-border/70 bg-card">
                {item.type === "image" ? (
                  <div className="relative aspect-video bg-secondary">
                    <Image src={item.src} alt={item.alt} fill sizes="(max-width: 640px) 100vw, 50vw" unoptimized={item.src.startsWith("https://cdn.sanity.io/")} className="object-cover" />
                  </div>
                ) : (
                  <video className="aspect-video w-full bg-black object-contain" controls preload="metadata" poster={item.poster}>
                    <source src={item.src} />
                    Your browser does not support embedded video.
                  </video>
                )}
                {item.caption && <figcaption className="px-4 py-3 text-sm text-muted-foreground">{item.caption}</figcaption>}
              </figure>
            </Reveal>
          ))}
        </section>
      )}

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-20">
        <Reveal>
          {project.highlights && project.highlights.length > 0 && (
            <section aria-labelledby="project-highlights">
              <h2 id="project-highlights" className="text-4xl">Project highlights</h2>
              <ul className="mt-6 space-y-4">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-base leading-7 text-muted-foreground">
                    <span aria-hidden="true" className="mt-1 text-primary">✳</span><span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {project.services && project.services.length > 0 && (
            <section aria-labelledby="project-services" className="mt-12">
              <h2 id="project-services" className="text-4xl">Services delivered</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.services.map((service) => <li key={service} className="rounded-full border border-border/80 bg-card px-4 py-2 text-sm">{service}</li>)}
              </ul>
            </section>
          )}
          {project.customFields && project.customFields.length > 0 && (
            <section aria-label="Category-specific project details" className="mt-12 space-y-7">
              {project.customFields.map((field) => (
                <div key={field.label}>
                  <h2 className="text-3xl">{field.label}</h2>
                  {Array.isArray(field.value) ? (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {field.value.map((value) => <li key={value} className="rounded-full border border-border/80 bg-card px-4 py-2 text-sm">{value}</li>)}
                    </ul>
                  ) : (
                    <p className="mt-3 whitespace-pre-line leading-7 text-muted-foreground">{field.value}</p>
                  )}
                </div>
              ))}
            </section>
          )}
        </Reveal>

        <Reveal delay={0.08}>
          <aside className="h-fit rounded-2xl border border-border/80 bg-card p-6" aria-label="Project information">
            <h2 className="text-2xl">At a glance</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div><dt className="text-muted-foreground">Discipline</dt><dd className="mt-1 font-medium">{project.category}</dd></div>
              <div><dt className="text-muted-foreground">Year</dt><dd className="mt-1 font-medium">{project.year}</dd></div>
              {project.client && <div><dt className="text-muted-foreground">Client</dt><dd className="mt-1 font-medium">{project.client}</dd></div>}
              {project.role && <div><dt className="text-muted-foreground">Role</dt><dd className="mt-1 font-medium">{project.role}</dd></div>}
              {project.duration && <div><dt className="text-muted-foreground">Duration</dt><dd className="mt-1 font-medium">{project.duration}</dd></div>}
              {project.tools && project.tools.length > 0 && (
                <div>
                  <dt className="text-muted-foreground">Tools</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {project.tools.map((tool) => <span key={tool} className="rounded-full bg-muted px-2.5 py-1 text-xs">{tool}</span>)}
                  </dd>
                </div>
              )}
            </dl>
            {project.links && project.links.length > 0 && (
              <div className="mt-6 border-t pt-5">
                <h3 className="text-sm font-semibold">Project links</h3>
                <ul className="mt-3 space-y-2">
                  {project.links.map((link) => (
                    <li key={link.url}><a href={link.url} target="_blank" rel="noreferrer" className="text-sm text-primary underline underline-offset-4">{link.label} ↗</a></li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </Reveal>
      </div>

      {relatedProjects.length > 0 && (
        <Reveal className="mt-20 border-t pt-10">
          <section aria-labelledby="related-projects">
            <h2 id="related-projects" className="mb-7 text-4xl">More in {project.category}</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {relatedProjects.map((relatedProject) => <ProjectCard key={relatedProject.slug} project={relatedProject} />)}
            </div>
          </section>
        </Reveal>
      )}
    </div>
  );
}
