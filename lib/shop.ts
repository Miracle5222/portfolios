import { isSanityConfigured, sanityClient } from "@/sanity/client";

export type ShopImage = {
  src: string;
  alt: string;
};

export type ShopItem = {
  id: string;
  title: string;
  category: string;
  shop: string;
  productUrl: string;
  description?: string;
  tags: string[];
  images: ShopImage[];
};

type SanityShopItem = {
  id?: string;
  title?: string;
  category?: string;
  shop?: string;
  productUrl?: string;
  description?: string;
  tags?: string[];
  images?: Array<{ src?: string; alt?: string }>;
};

const shopItemsQuery = `*[_type == "shopProduct" || (_type == "product" && defined(shop))] | order(_createdAt desc) {
  "id": _id,
  title,
  category,
  shop,
  productUrl,
  description,
  "tags": coalesce(tags, []),
  "images": images[] { "src": asset->url, alt }
}`;

function toShopItem(item: SanityShopItem): ShopItem | undefined {
  let destination: URL;
  try {
    destination = new URL(item.productUrl ?? "");
  } catch {
    return undefined;
  }

  if (!item.id || !item.title || !item.category || !item.shop || !["http:", "https:"].includes(destination.protocol)) {
    return undefined;
  }

  const images = (item.images ?? []).filter(
    (image): image is { src: string; alt?: string } => Boolean(image.src),
  );

  return {
    id: item.id,
    title: item.title,
    category: item.category,
    shop: item.shop,
    productUrl: destination.toString(),
    description: item.description,
    tags: item.tags ?? [],
    images: images.map((image) => ({
      src: image.src,
      alt: image.alt || `${item.title} product photo`,
    })),
  };
}

export async function getAllShopItems(): Promise<ShopItem[]> {
  if (!isSanityConfigured) return [];

  try {
    const items = await sanityClient
      .withConfig({ useCdn: false })
      .fetch<SanityShopItem[]>(shopItemsQuery, {}, { next: { revalidate: 0 } });
    return items.map(toShopItem).filter((item): item is ShopItem => Boolean(item));
  } catch (error) {
    console.error("Sanity shop item fetch failed.", error);
    return [];
  }
}
