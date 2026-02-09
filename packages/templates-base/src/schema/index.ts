export interface TemplateDefinition<T = Record<string, string>> {
  id: string;
  title: string;
  description: string;
  tags: string[];
  content: T;
}

export interface RuleContext {
  locale?: string;
  channel?: string;
}
