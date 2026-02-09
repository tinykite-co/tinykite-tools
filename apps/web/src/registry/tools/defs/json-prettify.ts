import type { ToolDefinition } from "@tinykite/core";

const tool: ToolDefinition = {
  slug: "json-prettify",
  title: "JSON Prettify",
  category: "misc",
  keywords: ["json", "format", "prettify"],
  params: [
    {
      id: "json",
      label: "JSON Input",
      type: "textarea",
      required: true,
      placeholder: "{\"hello\": \"world\"}"
    }
  ],
  runner: "prettifyJson",
  seo: {
    title: "JSON Prettify",
    description: "Format JSON with readable indentation.",
    summary: "Clean JSON formatting without leaving your browser."
  }
};

export default tool;
