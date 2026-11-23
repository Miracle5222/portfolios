import { defineField, defineType } from "sanity";
import { commonProjectFields, stringListField } from "./project-fields";

export const videoEditingProject = defineType({
  name: "videoEditingProject",
  title: "Video editing project",
  type: "document",
  fields: [
    ...commonProjectFields(),
    defineField({ name: "format", title: "Video format", type: "string", description: "For example: short-form, commercial, tutorial, or documentary." }),
    stringListField("editingSoftware", "Editing software"),
    stringListField("deliverables", "Deliverables"),
    defineField({ name: "finalVideo", title: "Final video", type: "projectVideo" }),
  ],
  preview: { select: { title: "title", subtitle: "year", media: "coverImage" } },
});
