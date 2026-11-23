import { defineArrayMember, defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Canva design template",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Template name", type: "string", validation: (rule) => rule.required().max(120) }),
    defineField({
      name: "category",
      title: "Template category",
      type: "string",
      options: {
        list: [
          { title: "Menus & food", value: "Menus & food" },
          { title: "Packaging & labels", value: "Packaging & labels" },
          { title: "Social media", value: "Social media" },
          { title: "Branding & logos", value: "Branding & logos" },
          { title: "Marketing & advertising", value: "Marketing & advertising" },
          { title: "Presentations", value: "Presentations" },
          { title: "Print & stationery", value: "Print & stationery" },
          { title: "Invitations & events", value: "Invitations & events" },
          { title: "Planners & journals", value: "Planners & journals" },
          { title: "Documents & resumes", value: "Documents & resumes" },
          { title: "Education & worksheets", value: "Education & worksheets" },
          { title: "Digital books & guides", value: "Digital books & guides" },
          { title: "Video & thumbnails", value: "Video & thumbnails" },
          { title: "Websites & landing pages", value: "Websites & landing pages" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "platform",
      title: "Design platform",
      type: "string",
      initialValue: "Canva",
      readOnly: true,
      options: {
        list: [{ title: "Canva", value: "Canva" }],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "productUrl",
      title: "Template access link",
      type: "url",
      description: "Paste the Canva template link. Visitors will be sent directly to the Canva design.",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "images",
      title: "Template preview images",
      type: "array",
      description: "Upload one or more preview images of the template. The first image is the main listing image.",
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
    select: { title: "title", subtitle: "platform", media: "images.0" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? `Canva template · ${subtitle}` : "Canva design template", media };
    },
  },
});
