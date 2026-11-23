import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required().max(100) }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "publishedAt", title: "Publish date", type: "datetime", initialValue: () => new Date().toISOString(), validation: (rule) => rule.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, validation: (rule) => rule.required().max(220) }),
    defineField({ name: "tags", title: "Topics", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alternative text", type: "string", validation: (rule) => rule.required() })],
    }),
    defineField({
      name: "body",
      title: "Article content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }, { title: "Numbered", value: "number" }],
          marks: {
            decorators: [{ title: "Strong", value: "strong" }, { title: "Emphasis", value: "em" }, { title: "Code", value: "code" }],
            annotations: [
              defineField({ name: "link", title: "Link", type: "object", fields: [
                defineField({ name: "href", title: "URL", type: "url", validation: (rule) => rule.required() }),
                defineField({ name: "blank", title: "Open in new tab", type: "boolean", initialValue: true }),
              ] }),
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alternative text", type: "string", validation: (rule) => rule.required() }), defineField({ name: "caption", title: "Caption", type: "string" })],
        },
        defineArrayMember({
          name: "videoEmbed",
          title: "Video or clip",
          type: "object",
          fields: [
            defineField({ name: "videoFile", title: "Upload video", type: "file", options: { accept: "video/*" } }),
            defineField({ name: "videoUrl", title: "Or paste a video URL", type: "url", description: "YouTube, Vimeo, or a direct MP4/WebM link." }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
          validation: (rule) => rule.custom((value) => value?.videoFile || value?.videoUrl ? true : "Add a video file or URL."),
        }),
        { type: "code" },
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "coverImage" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : "Draft", media };
    },
  },
});
