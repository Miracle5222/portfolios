import { defineArrayMember, defineField, defineType } from "sanity";
import { commonProjectFields, stringListField } from "./project-fields";

export const appDevelopmentProject = defineType({
  name: "appDevelopmentProject",
  title: "App development project",
  type: "document",
  fields: [
    ...commonProjectFields(),
    defineField({ name: "platforms", title: "Platforms", type: "array", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" } }),
    stringListField("technologyStack", "Technology stack"),
    stringListField("features", "Key features"),
    defineField({ name: "appStoreUrl", title: "Apple App Store URL", type: "url" }),
    defineField({ name: "playStoreUrl", title: "Google Play Store URL", type: "url" }),
  ],
  preview: { select: { title: "title", subtitle: "year", media: "coverImage" } },
});
