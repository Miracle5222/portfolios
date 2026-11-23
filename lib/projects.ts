import { isSanityConfigured, sanityClient } from "@/sanity/client";

export const projectCategories = [
  { name: "Video Editing", slug: "video-editing", description: "Edits, motion, and visual stories shaped for their audience." },
  { name: "Graphic Design", slug: "graphic-design", description: "Visual identities and graphics that make a message memorable." },
  { name: "Web Development", slug: "web-development", description: "Responsive websites and digital experiences, from concept to launch." },
  { name: "App Development", slug: "app-development", description: "Useful app experiences built around real user needs." },
  { name: "Virtual Assistant", slug: "virtual-assistant", description: "Reliable operational and administrative support for busy teams." },
] as const;

export type ProjectCategory = (typeof projectCategories)[number]["name"];

export type ProjectLink = { label: string; url: string };
export type ProjectCustomField = { label: string; value: string | string[] };
export type ProjectMedia =
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "video"; src: string; poster?: string; caption?: string };

export type PortfolioProject = {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  description: string;
  image: string;
  imageAlt: string;
  status?: string;
  client?: string;
  role?: string;
  duration?: string;
  tools?: string[];
  services?: string[];
  highlights?: string[];
  customFields?: ProjectCustomField[];
  media?: ProjectMedia[];
  links?: ProjectLink[];
};

type SanityProject = {
  slug?: string;
  title?: string;
  category?: string;
  year?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  status?: string;
  client?: string;
  role?: string;
  duration?: string;
  tools?: string[];
  services?: string[];
  highlights?: string[];
  gallery?: ProjectMedia[];
  finalVideo?: { src?: string; poster?: string; caption?: string };
  format?: string;
  designType?: string;
  platforms?: string[];
  engagement?: string;
  outcomes?: string;
  testimonial?: { quote?: string; name?: string; role?: string };
  liveUrl?: string;
  sourceUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
};

const projectTypes = [
  "videoEditingProject",
  "graphicDesignProject",
  "webDevelopmentProject",
  "appDevelopmentProject",
  "virtualAssistantProject",
];

const projectsQuery = `*[_type in ${JSON.stringify(projectTypes)} && defined(slug.current)] | order(year desc, _createdAt desc) {
  "slug": slug.current,
  title,
  "category": select(
    _type == "videoEditingProject" => "Video Editing",
    _type == "graphicDesignProject" => "Graphic Design",
    _type == "webDevelopmentProject" => "Web Development",
    _type == "appDevelopmentProject" => "App Development",
    _type == "virtualAssistantProject" => "Virtual Assistant"
  ),
  year,
  description,
  "image": coverImage.asset->url,
  "imageAlt": coverImage.alt,
  status,
  client,
  role,
  duration,
  "tools": coalesce(editingSoftware, designTools, technologyStack, tools, []),
  "services": coalesce(deliverables, features, supportAreas, []),
  highlights,
  format,
  designType,
  platforms,
  engagement,
  outcomes,
  testimonial,
  liveUrl,
  sourceUrl,
  appStoreUrl,
  playStoreUrl,
  "gallery": gallery[] {
    _type == "image" => { "type": "image", "src": asset->url, alt, caption },
    _type == "projectVideo" => { "type": "video", "src": coalesce(url, file.asset->url), "poster": poster.asset->url, caption }
  },
  "finalVideo": select(_type == "videoEditingProject" => {
    "src": coalesce(finalVideo.url, finalVideo.file.asset->url),
    "poster": finalVideo.poster.asset->url,
    "caption": finalVideo.caption
  })
}`;

export const sampleProjects: PortfolioProject[] = [
  {
    slug: "personal-portfolio-website",
    title: "Personal Portfolio Website",
    category: "Web Development",
    year: "2025",
    description: "A responsive portfolio and blog built to bring creative work, services, and writing together in one place.",
    image: "/images/portfolio-project.svg",
    imageAlt: "Illustrated preview of a portfolio website in a browser window",
    status: "Sample project",
    client: "Personal project",
    role: "Design and development",
    duration: "Ongoing",
    tools: ["Next.js", "TypeScript", "Tailwind CSS"],
    services: ["Responsive web design", "Frontend development", "Content structure"],
    highlights: [
      "Created a clear structure for portfolio, services, and blog content.",
      "Built responsive pages with reusable components and accessible navigation.",
      "Added a theme switcher and reduced-motion-aware transitions.",
    ],
  },
];

function isProjectCategory(value: string | undefined): value is ProjectCategory {
  return projectCategories.some((category) => category.name === value);
}

function toProject(project: SanityProject): PortfolioProject | undefined {
  if (!project.slug || !project.title || !project.year || !project.description || !isProjectCategory(project.category)) {
    return undefined;
  }

  const links: ProjectLink[] = [];
  if (project.liveUrl) links.push({ label: "Live website", url: project.liveUrl });
  if (project.sourceUrl) links.push({ label: "Source code", url: project.sourceUrl });
  if (project.appStoreUrl) links.push({ label: "App Store", url: project.appStoreUrl });
  if (project.playStoreUrl) links.push({ label: "Google Play", url: project.playStoreUrl });

  const customFields: ProjectCustomField[] = [];
  if (project.format) customFields.push({ label: "Video format", value: project.format });
  if (project.designType) customFields.push({ label: "Design type", value: project.designType });
  if (project.platforms?.length) customFields.push({ label: "Platforms", value: project.platforms });
  if (project.engagement) customFields.push({ label: "Engagement", value: project.engagement });
  if (project.outcomes) customFields.push({ label: "Scope and outcomes", value: project.outcomes });
  if (project.testimonial?.quote) {
    const attribution = [project.testimonial.name, project.testimonial.role].filter(Boolean).join(" · ");
    customFields.push({ label: attribution ? `Client testimonial — ${attribution}` : "Client testimonial", value: project.testimonial.quote });
  }

  const media = (project.gallery ?? []).filter((item) => item.src);
  if (project.finalVideo?.src) {
    media.unshift({ type: "video", ...project.finalVideo, src: project.finalVideo.src });
  }

  return {
    slug: project.slug,
    title: project.title,
    category: project.category,
    year: project.year,
    description: project.description,
    image: project.image || "/images/portfolio-project.svg",
    imageAlt: project.imageAlt || `${project.title} project cover`,
    status: project.status,
    client: project.client,
    role: project.role,
    duration: project.duration,
    tools: project.tools ?? [],
    services: project.services ?? [],
    highlights: project.highlights ?? [],
    customFields,
    media,
    links,
  };
}

export async function getAllProjects(): Promise<PortfolioProject[]> {
  if (!isSanityConfigured) return sampleProjects;

  try {
    const sanityProjects = await sanityClient.fetch<SanityProject[]>(projectsQuery, {}, { next: { revalidate: 60 } });
    const projects = sanityProjects.map(toProject).filter((project): project is PortfolioProject => Boolean(project));
    return projects.length > 0 ? projects : sampleProjects;
  } catch (error) {
    console.error("Sanity project fetch failed; serving local sample projects instead.", error);
    return sampleProjects;
  }
}

export function getProjectsByCategory(projects: PortfolioProject[], category: ProjectCategory) {
  return projects.filter((project) => project.category === category);
}

export async function getProjectBySlug(slug: string) {
  const projects = await getAllProjects();
  return projects.find((project) => project.slug === slug);
}
