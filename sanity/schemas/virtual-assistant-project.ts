import { defineField, defineType } from "sanity";
import { commonProjectFields, stringListField } from "./project-fields";

export const virtualAssistantProject = defineType({
  name: "virtualAssistantProject",
  title: "Virtual assistant project",
  type: "document",
  fields: [
    ...commonProjectFields(),
    stringListField("supportAreas", "Support areas"),
    stringListField("tools", "Tools and platforms"),
    defineField({ name: "engagement", title: "Engagement type", type: "string", description: "For example: ongoing support, launch support, or a one-time setup." }),
    defineField({ name: "outcomes", title: "Outcomes or scope", type: "text", rows: 4 }),
    defineField({
      name: "testimonial",
      title: "Client testimonial (optional)",
      type: "object",
      fields: [
        defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
        defineField({ name: "name", title: "Client name", type: "string" }),
        defineField({ name: "role", title: "Client role or organization", type: "string" }),
      ],
    }),
  ],
  preview: { select: { title: "title", subtitle: "year", media: "coverImage" } },
});
