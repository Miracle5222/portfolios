import { defineArrayMember, defineField } from "sanity";

export function commonProjectFields() {
  return [
    defineField({ name: "title", title: "Project title", type: "string", validation: (rule) => rule.required().max(100) }),
    defineField({ name: "slug", title: "URL slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "year", title: "Year", type: "string", initialValue: () => String(new Date().getFullYear()), validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Short description", type: "text", rows: 3, validation: (rule) => rule.required().max(320) }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alternative text", type: "string", validation: (rule) => rule.required() })],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "client", title: "Client or project context", type: "string" }),
    defineField({ name: "role", title: "My role", type: "string" }),
    defineField({ name: "duration", title: "Duration", type: "string" }),
    defineField({ name: "status", title: "Label", type: "string", description: "Optional label shown on the project card, e.g. Featured or Concept." }),
    defineField({ name: "highlights", title: "Highlights", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({
      name: "gallery",
      title: "Project gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alternative text", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        }),
        defineArrayMember({ type: "projectVideo" }),
      ],
    }),
  ];
}

export function stringListField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "array",
    of: [defineArrayMember({ type: "string" })],
    options: { layout: "tags" },
  });
}
