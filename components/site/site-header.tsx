import Link from "next/link";
import { ThemeToggle } from "@/components/site/theme-toggle";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/shop", label: "Shop" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 py-4 sm:flex-nowrap sm:px-8 lg:px-12">
        <div className="flex w-full items-center justify-between sm:w-auto">
          <Link href="/" className="shrink-0 text-sm font-semibold tracking-tight sm:text-base">Roneil G. Bansas<span className="ml-1 text-primary">.</span></Link>
          <div className="sm:hidden"><ThemeToggle /></div>
        </div>
        <div className="flex w-full items-center justify-between sm:w-auto sm:gap-7">
          <ul className="flex w-full items-center justify-between gap-3 text-xs text-muted-foreground sm:w-auto sm:justify-normal sm:gap-7 sm:text-sm">
            {links.map((link) => <li key={link.href}><Link href={link.href} className="transition-colors hover:text-foreground">{link.label}</Link></li>)}
          </ul>
          <div className="hidden sm:block"><ThemeToggle /></div>
        </div>
      </nav>
    </header>
  );
}
