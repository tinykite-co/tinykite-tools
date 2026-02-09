export interface TemplateReport {
  templateId: string;
  warnings: string[];
}

export interface RuleResult {
  constraintId: string;
  field: string;
  verdict: import("../schema").RuleVerdict;
  message: string;
}

export interface EvaluationReport {
  templateId: string;
  results: RuleResult[];
  overallVerdict: import("../schema").RuleVerdict;
}
