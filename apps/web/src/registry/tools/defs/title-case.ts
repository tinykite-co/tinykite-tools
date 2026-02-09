import type { ToolDefinition } from "@tinykite/core";

const tool: ToolDefinition = {
  slug: "title-case",
  title: "Title Case",
  category: "misc",
  keywords: ["title", "case", "format"],
  params: [
    {
      id: "input",
      label: "Text",
      type: "text",
      required: true,
      placeholder: "a tale of two cities"
    }
  ],
  runner: "titleCase",
  seo: {
    title: "Title Case",
    description: "Convert text into title case.",
    summary: "Apply a clean title-case transform to headlines."
  }
};

export default tool;
