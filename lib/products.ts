import { isSanityConfigured, sanityClient } from "@/sanity/client";

export type TemplatePreviewImage = {
  src: string;
  alt: string;
};

export type DigitalTemplate = {
  id: string;
  title: string;
  category: string;
  platform: "Canva";
  productUrl: string;
  description?: string;
  tags: string[];
  images: TemplatePreviewImage[];
};

type SanityProduct = {
  id?: string;
  title?: string;
  category?: string;
  platform?: string;
  productUrl?: string;
  description?: string;
  tags?: string[];
  images?: Array<{ src?: string; alt?: string }>;
};

const canvaTemplateCategories = [
  "Menus & food",
  "Packaging & labels",
  "Social media",
  "Branding & logos",
  "Marketing & advertising",
  "Presentations",
  "Print & stationery",
  "Invitations & events",
  "Planners & journals",
  "Documents & resumes",
  "Education & worksheets",
  "Digital books & guides",
  "Video & thumbnails",
  "Websites & landing pages",
] as const;

function isCanvaTemplateCategory(value: string | undefined): value is (typeof canvaTemplateCategories)[number] {
  return canvaTemplateCategories.some((category) => category === value);
}

const productsQuery = `*[_type == "product" && platform == "Canva" && category in ${JSON.stringify(canvaTemplateCategories)}] | order(_createdAt desc) {
  "id": _id,
  title,
  category,
  platform,
  productUrl,
  description,
  "tags": coalesce(tags, []),
  "images": images[] { "src": asset->url, alt }
}`;

function toDigitalTemplate(product: SanityProduct): DigitalTemplate | undefined {
  let destination: URL;
  try {
    destination = new URL(product.productUrl ?? "");
  } catch {
    return undefined;
  }

  if (
    !product.id ||
    !product.title ||
    !isCanvaTemplateCategory(product.category) ||
    product.platform !== "Canva" ||
    !["http:", "https:"].includes(destination.protocol)
  ) {
    return undefined;
  }

  const images = (product.images ?? []).filter(
    (image): image is { src: string; alt?: string } => Boolean(image.src),
  );

  return {
    id: product.id,
    title: product.title,
    category: product.category,
    platform: "Canva",
    productUrl: destination.toString(),
    description: product.description,
    tags: product.tags ?? [],
    images: images.map((image) => ({
      src: image.src,
      alt: image.alt || `${product.title} template preview`,
    })),
  };
}

export async function getAllTemplates(): Promise<DigitalTemplate[]> {
  if (!isSanityConfigured) return [];

  try {
    const products = await sanityClient.fetch<SanityProduct[]>(productsQuery, {}, { next: { revalidate: 60 } });
    return products.map(toDigitalTemplate).filter((product): product is DigitalTemplate => Boolean(product));
  } catch (error) {
    console.error("Sanity template fetch failed.", error);
    return [];
  }
}
