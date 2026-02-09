import type { FieldSchema } from "@tinykite/ui-schema";

export interface ToolSeo {
  title: string;
  description: string;
  summary: string;
}

export interface ToolDefinition {
  slug: string;
  title: string;
  category: string;
  keywords: string[];
  params: FieldSchema[];
  runner: string;
  seo: ToolSeo;
}

export interface FlowSeo {
  title: string;
  description: string;
  summary: string;
}

export interface FlowDefinition {
  slug: string;
  title: string;
  steps: string[];
  seo: FlowSeo;
}
