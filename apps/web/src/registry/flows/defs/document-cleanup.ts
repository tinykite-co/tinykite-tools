import type { FlowDefinition } from "@tinykite/core";

const flow: FlowDefinition = {
  slug: "document-cleanup",
  title: "Document Cleanup",
  steps: ["Upload files", "Normalize content", "Export bundle"],
  seo: {
    title: "Document Cleanup Flow",
    description: "Standard cleanup workflow for documents.",
    summary: "A base flow that normalizes and bundles documents."
  }
};

export default flow;
