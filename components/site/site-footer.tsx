import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p>© {new Date().getFullYear()} Roneil G. Bansas</p>
        <Link href="mailto:hello@example.com" className="hover:text-foreground">Get in touch</Link>
      </div>
    </footer>
  );
}
