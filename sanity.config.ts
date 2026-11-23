'use client';

import { codeInput } from "@sanity/code-input";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "portfolio",
  title: "Roneil's Portfolio CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "yourprojectid",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  basePath: "/studio",
  plugins: [structureTool(), visionTool(), codeInput()],
  schema: { types: schemaTypes },
});
