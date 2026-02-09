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

export type Rule<T = Record<string, string>> = (
  template: TemplateDefinition<T>,
  context: RuleContext
) => boolean;

export function applyTemplateRules<T>(
  templates: TemplateDefinition<T>[],
  rules: Rule<T>[],
  context: RuleContext
): TemplateDefinition<T>[] {
  return templates.filter((template) => rules.every((rule) => rule(template, context)));
}
