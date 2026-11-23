import { defineField, defineType } from "sanity";
import { commonProjectFields, stringListField } from "./project-fields";

export const graphicDesignProject = defineType({
  name: "graphicDesignProject",
  title: "Graphic design project",
  type: "document",
  fields: [
    ...commonProjectFields(),
    defineField({ name: "designType", title: "Design type", type: "string", description: "For example: brand identity, social campaign, or editorial." }),
    stringListField("designTools", "Design tools"),
    stringListField("deliverables", "Deliverables"),
  ],
  preview: { select: { title: "title", subtitle: "year", media: "coverImage" } },
});
