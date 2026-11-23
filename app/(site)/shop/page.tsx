import type { Metadata } from "next";
import { ShopItemDirectory } from "@/components/shop/shop-item-directory";
import { TemplateDirectory } from "@/components/templates/template-directory";
import { Reveal } from "@/components/site/reveal";
import { getAllTemplates } from "@/lib/products";
import { getAllShopItems } from "@/lib/shop";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse curated finds and editable Canva templates for menus, packaging, branding, and more.",
};

export default async function ShopPage() {
  const [items, templates] = await Promise.all([getAllShopItems(), getAllTemplates()]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <Reveal>
        <header className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Curated finds &amp; creative tools</p>
          <h1 className="mt-4 text-6xl tracking-tight sm:text-7xl">The <span className="text-primary">shop.</span></h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Browse useful finds from across the web, then explore editable Canva templates for your next idea. Listings take you directly to the relevant shop or template page.</p>
        </header>
      </Reveal>

      <section aria-labelledby="shop-items-heading" className="mt-12 scroll-mt-28 sm:mt-16">
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-border/80 pb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Everyday finds</p>
            <h2 id="shop-items-heading" className="mt-2 text-4xl sm:text-5xl">Shop items</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">A curated list of products from Amazon, Shopee, SHEIN, and other marketplaces.</p>
          </div>
        </div>
        <ShopItemDirectory items={items} />
      </section>

      <section aria-labelledby="canva-templates-heading" className="mt-20 scroll-mt-28 border-t border-border/70 pt-12 sm:mt-28 sm:pt-16">
        <Reveal>
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-border/80 pb-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Made to make it yours</p>
              <h2 id="canva-templates-heading" className="mt-2 text-4xl sm:text-5xl">Canva templates</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Editable designs for menus, packaging, social media, branding, presentations, events, and more.</p>
            </div>
          </div>
        </Reveal>
        <TemplateDirectory templates={templates} />
      </section>

      <p className="mt-10 text-center text-xs leading-5 text-muted-foreground">Product details, availability, template access, pricing, and terms are provided by the destination platforms.</p>
    </div>
  );
}
