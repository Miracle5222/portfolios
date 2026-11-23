"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import type { DigitalTemplate } from "@/lib/products";
import { PaginationControls } from "@/components/shop/pagination-controls";

const TEMPLATES_PER_PAGE = 9;

function TemplateCard({ template }: { template: DigitalTemplate }) {
  const [activeImage, setActiveImage] = useState(0);
  const image = template.images[activeImage];
  const actionLabel = template.platform === "Canva" ? "Get this Canva template" : `View on ${template.platform}`;

  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5">
      <div className="relative aspect-4/3 overflow-hidden bg-secondary">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
            className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Preview coming soon</div>
        )}
        <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-background/90 px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur">
          {template.platform}
        </span>
        {template.images.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-full bg-background/90 px-2.5 py-1 text-xs text-foreground shadow-sm">
            {activeImage + 1} / {template.images.length}
          </span>
        )}
      </div>
      {template.images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-b border-border/70 px-4 py-3" aria-label={`${template.title} previews`}>
          {template.images.map((preview, index) => (
            <button
              key={`${preview.src}-${index}`}
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={`Show preview ${index + 1} of ${template.title}`}
              aria-pressed={activeImage === index}
              className={`relative size-14 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${activeImage === index ? "border-primary" : "border-transparent hover:border-border"}`}
            >
              <Image src={preview.src} alt="" fill unoptimized sizes="56px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="p-5 sm:p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-primary">{template.category}</p>
        <h2 className="mt-2 text-2xl leading-tight">{template.title}</h2>
        {template.description && <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{template.description}</p>}
        {template.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Template keywords">
            {template.tags.slice(0, 4).map((tag) => <li key={tag} className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">{tag}</li>)}
          </ul>
        )}
        <Link
          href={template.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {actionLabel} <ArrowUpRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </article>
  );
}

export function TemplateDirectory({ templates }: { templates: DigitalTemplate[] }) {
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("all");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const platforms = useMemo(() => [...new Set(templates.map((template) => template.platform))].sort(), [templates]);
  const categories = useMemo(() => [...new Set(templates.map((template) => template.category))].sort(), [templates]);
  const filteredTemplates = useMemo(() => {
    const term = search.trim().toLocaleLowerCase();
    return templates.filter((template) => {
      const matchesSearch = !term || [template.title, template.description, template.platform, template.category, ...template.tags]
        .some((value) => value?.toLocaleLowerCase().includes(term));
      return matchesSearch && (platform === "all" || template.platform === platform) && (category === "all" || template.category === category);
    });
  }, [templates, search, platform, category]);
  const pageCount = Math.ceil(filteredTemplates.length / TEMPLATES_PER_PAGE);
  const visibleTemplates = filteredTemplates.slice((page - 1) * TEMPLATES_PER_PAGE, page * TEMPLATES_PER_PAGE);
  const hasFilters = Boolean(search || platform !== "all" || category !== "all");

  function clearFilters() {
    setSearch("");
    setPlatform("all");
    setCategory("all");
    setPage(1);
  }

  return (
    <section aria-label="Template directory">
      <div className="rounded-[1.5rem] border border-border/80 bg-card/80 p-4 shadow-sm sm:p-5">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_200px_220px]">
          <label className="relative block">
            <span className="sr-only">Search templates</span>
            <Search aria-hidden="true" size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(event) => { setSearch(event.target.value); setPage(1); }}
              placeholder="Search templates, uses, or keywords…"
              className="h-12 w-full rounded-full border border-input bg-background pl-11 pr-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
            />
          </label>
          <label className="sr-only" htmlFor="template-platform-filter">Filter by platform</label>
          <select id="template-platform-filter" value={platform} onChange={(event) => { setPlatform(event.target.value); setPage(1); }} className="h-12 rounded-full border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/60">
            <option value="all">All platforms</option>
            {platforms.map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
          <label className="sr-only" htmlFor="template-category-filter">Filter by template type</label>
          <select id="template-category-filter" value={category} onChange={(event) => { setCategory(event.target.value); setPage(1); }} className="h-12 rounded-full border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/60">
            <option value="all">All template types</option>
            {categories.map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
        </div>
        <div className="mt-4 flex min-h-6 items-center justify-between gap-3 text-sm text-muted-foreground" aria-live="polite">
          <p>Showing <span className="font-semibold text-foreground">{filteredTemplates.length === 0 ? 0 : (page - 1) * TEMPLATES_PER_PAGE + 1}–{Math.min(page * TEMPLATES_PER_PAGE, filteredTemplates.length)}</span> of {filteredTemplates.length} {filteredTemplates.length === 1 ? "template" : "templates"}</p>
          {hasFilters && (
            <button type="button" onClick={clearFilters} className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
              <X aria-hidden="true" size={14} /> Clear filters
            </button>
          )}
        </div>
      </div>

      {visibleTemplates.length > 0 ? (
        <>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleTemplates.map((template) => <TemplateCard key={template.id} template={template} />)}
          </div>
          <PaginationControls page={page} pageCount={pageCount} sectionName="Canva templates" onPageChange={setPage} />
        </>
      ) : templates.length === 0 ? (
        <div className="mt-7 rounded-[1.5rem] border border-dashed border-border p-8 text-center sm:p-12">
          <p className="text-2xl">Your template collection starts here.</p>
          <p className="mx-auto mt-2 max-w-lg leading-7 text-muted-foreground">Add a digital template in Sanity Studio with its category, Canva or marketplace link, and one or more preview images. Published templates will appear here.</p>
          <Link href="/studio" className="mt-5 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">Open Sanity Studio <ArrowUpRight aria-hidden="true" size={16} className="ml-2" /></Link>
        </div>
      ) : (
        <div className="mt-7 rounded-[1.5rem] border border-dashed border-border p-8 text-center sm:p-12">
          <p className="text-2xl">No templates match those filters.</p>
          <p className="mt-2 text-muted-foreground">Try another search, platform, or template type.</p>
          <button type="button" onClick={clearFilters} className="mt-5 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted">Clear filters</button>
        </div>
      )}
    </section>
  );
}
