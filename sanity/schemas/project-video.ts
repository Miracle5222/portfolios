import { defineField, defineType } from "sanity";

export const projectVideo = defineType({
  name: "projectVideo",
  title: "Video",
  type: "object",
  fields: [
    defineField({ name: "file", title: "Upload video", type: "file", options: { accept: "video/*" } }),
    defineField({ name: "url", title: "Or paste a direct video URL", type: "url", description: "Use an MP4 or WebM URL. For YouTube/Vimeo, add its share URL as a project link." }),
    defineField({ name: "poster", title: "Poster image", type: "image", options: { hotspot: true } }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
  validation: (rule) => rule.custom((value) => value?.file || value?.url ? true : "Add a video file or URL."),
});
