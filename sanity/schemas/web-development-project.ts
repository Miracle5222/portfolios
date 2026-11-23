import { defineField, defineType } from "sanity";
import { commonProjectFields, stringListField } from "./project-fields";

export const webDevelopmentProject = defineType({
  name: "webDevelopmentProject",
  title: "Web development project",
  type: "document",
  fields: [
    ...commonProjectFields(),
    stringListField("technologyStack", "Technology stack"),
    stringListField("features", "Key features"),
    defineField({ name: "liveUrl", title: "Live website URL", type: "url" }),
    defineField({ name: "sourceUrl", title: "Source code URL", type: "url" }),
  ],
  preview: { select: { title: "title", subtitle: "year", media: "coverImage" } },
});
