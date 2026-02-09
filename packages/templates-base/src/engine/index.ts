import type { Constraint, RuleContext, Ruleset, RuleVerdict, TemplateDefinition } from "../schema";
import type { EvaluationReport, RuleResult } from "../reports";

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

const VERDICT_PRIORITY: Record<RuleVerdict, number> = {
  PASS: 0,
  WARN: 1,
  FAIL: 2
};

function resolveOverallVerdict(results: RuleResult[]): RuleVerdict {
  let worst: RuleVerdict = "PASS";
  for (const r of results) {
    if (VERDICT_PRIORITY[r.verdict] > VERDICT_PRIORITY[worst]) {
      worst = r.verdict;
    }
  }
  return worst;
}

function getFieldValue(template: TemplateDefinition, field: string): unknown {
  if (field in template) {
    return template[field as keyof TemplateDefinition];
  }
  return (template.content as Record<string, unknown>)[field];
}

function evaluateConstraint(
  constraint: Constraint,
  template: TemplateDefinition,
  context: RuleContext
): RuleResult {
  const value = getFieldValue(template, constraint.field);
  const passed = constraint.check(value, context);
  return {
    constraintId: constraint.id,
    field: constraint.field,
    verdict: passed ? "PASS" : constraint.severity,
    message: passed ? "" : constraint.message
  };
}

export function evaluate(
  template: TemplateDefinition,
  ruleset: Ruleset,
  context: RuleContext
): EvaluationReport {
  const sorted = [...ruleset.constraints].sort((a, b) => a.id.localeCompare(b.id));
  const results = sorted.map((c) => evaluateConstraint(c, template, context));
  return {
    templateId: template.id,
    results,
    overallVerdict: resolveOverallVerdict(results)
  };
}

export function mergeRulesets(base: Ruleset, ...overrides: Ruleset[]): Ruleset {
  const constraintMap = new Map<string, Constraint>();
  for (const c of base.constraints) {
    constraintMap.set(c.id, c);
  }
  for (const ruleset of overrides) {
    for (const c of ruleset.constraints) {
      constraintMap.set(c.id, c);
    }
  }
  const merged = [...constraintMap.values()].sort((a, b) => a.id.localeCompare(b.id));
  return {
    name: overrides.length > 0 ? overrides[overrides.length - 1]!.name : base.name,
    constraints: merged
  };
}
