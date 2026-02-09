import type { RuleContext, TemplateDefinition } from "../schema";

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
