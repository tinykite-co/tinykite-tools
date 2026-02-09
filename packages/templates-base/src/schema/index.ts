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

export type RuleVerdict = "PASS" | "WARN" | "FAIL";

export interface Constraint {
  id: string;
  field: string;
  message: string;
  severity: RuleVerdict;
  check: (value: unknown, context: RuleContext) => boolean;
}

export interface Ruleset {
  name: string;
  constraints: Constraint[];
}
