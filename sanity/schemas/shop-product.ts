import { defineArrayMember, defineField, defineType } from "sanity";

export const shopProduct = defineType({
  name: "shopProduct",
  title: "Marketplace shop item",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Shop product name", type: "string", validation: (rule) => rule.required().max(120) }),
    defineField({
      name: "category",
      title: "Product category",
      type: "string",
      options: {
        list: [
          { title: "Fashion", value: "Fashion" },
          { title: "Beauty & personal care", value: "Beauty & personal care" },
          { title: "Home & living", value: "Home & living" },
          { title: "Tech & electronics", value: "Tech & electronics" },
          { title: "Accessories", value: "Accessories" },
          { title: "Kitchen & dining", value: "Kitchen & dining" },
          { title: "Books & stationery", value: "Books & stationery" },
          { title: "Other", value: "Other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shop",
      title: "Shop or marketplace",
      type: "string",
      options: {
        list: [
          { title: "Amazon", value: "Amazon" },
          { title: "Shopee", value: "Shopee" },
          { title: "SHEIN", value: "SHEIN" },
          { title: "Lazada", value: "Lazada" },
          { title: "TikTok Shop", value: "TikTok Shop" },
          { title: "Other", value: "Other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "productUrl",
      title: "Product link",
      type: "url",
      description: "Paste the product page URL. Visitors will be sent directly to this shop.",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "images",
      title: "Product images",
      type: "array",
      description: "Upload one or more product photos. The first image is used as the main listing image.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alternative text", type: "string", validation: (rule) => rule.required() })],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "description", title: "Short description", type: "text", rows: 3, validation: (rule) => rule.max(240) }),
    defineField({ name: "tags", title: "Search keywords", type: "array", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" } }),
  ],
  preview: {
    select: { title: "title", subtitle: "shop", media: "images.0" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? `Marketplace product · ${subtitle}` : "Shop item", media };
    },
  },
});
