import type { ToolDefinition } from "@tinykite/core";

const tool: ToolDefinition = {
  slug: "word-count",
  title: "Word Count",
  category: "misc",
  keywords: ["words", "count", "text"],
  params: [
    {
      id: "input",
      label: "Text",
      type: "textarea",
      required: true,
      placeholder: "Paste text to count"
    }
  ],
  runner: "countWords",
  seo: {
    title: "Word Count",
    description: "Count words, characters, and lines in text.",
    summary: "Count words fast with a minimal, reliable runner."
  }
};

export default tool;
