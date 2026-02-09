import type { ToolDefinition } from "@tinykite/core";

export const tools: ToolDefinition[] = [
  {
    slug: "word-count",
    title: "Word Count",
    category: "Text",
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
  },
  {
    slug: "json-prettify",
    title: "JSON Prettify",
    category: "Developer",
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
  },
  {
    slug: "title-case",
    title: "Title Case",
    category: "Text",
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
  }
];
