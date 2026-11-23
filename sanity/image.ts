import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "@/sanity/client";

const imageBuilder = createImageUrlBuilder(sanityClient);

export const urlFor = (source: Parameters<typeof imageBuilder.image>[0]) => imageBuilder.image(source);
