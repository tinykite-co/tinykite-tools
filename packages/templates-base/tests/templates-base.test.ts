import { describe, expect, it } from "vitest";
import { applyTemplateRules, evaluate, mergeRulesets } from "../src";
import type { Constraint, Ruleset, TemplateDefinition, RuleContext } from "../src";

describe("templates-base", () => {
  it("filters templates by rules", () => {
    const templates = [
      { id: "a", title: "A", description: "", tags: ["us"], content: {} },
      { id: "b", title: "B", description: "", tags: ["uk"], content: {} }
    ];
    const result = applyTemplateRules(templates, [(tpl) => tpl.tags.includes("us")], {});
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("a");
  });
});

const template: TemplateDefinition = {
  id: "tpl-1",
  title: "My Template",
  description: "A test template",
  tags: ["us"],
  content: { width: "800", height: "600" }
};

const ctx: RuleContext = {};

describe("evaluate", () => {
  it("returns PASS when all constraints pass", () => {
    const ruleset: Ruleset = {
      name: "basic",
      constraints: [
        {
          id: "has-title",
          field: "title",
          message: "Title is required",
          severity: "FAIL",
          check: (v) => typeof v === "string" && v.length > 0
        }
      ]
    };
    const report = evaluate(template, ruleset, ctx);
    expect(report.templateId).toBe("tpl-1");
    expect(report.overallVerdict).toBe("PASS");
    expect(report.results).toHaveLength(1);
    expect(report.results[0]?.verdict).toBe("PASS");
    expect(report.results[0]?.message).toBe("");
  });

  it("returns FAIL when a FAIL-severity constraint fails", () => {
    const ruleset: Ruleset = {
      name: "strict",
      constraints: [
        {
          id: "title-length",
          field: "title",
          message: "Title must be at least 50 characters",
          severity: "FAIL",
          check: (v) => typeof v === "string" && v.length >= 50
        }
      ]
    };
    const report = evaluate(template, ruleset, ctx);
    expect(report.overallVerdict).toBe("FAIL");
    expect(report.results[0]?.verdict).toBe("FAIL");
    expect(report.results[0]?.message).toBe("Title must be at least 50 characters");
  });

  it("returns WARN when a WARN-severity constraint fails", () => {
    const ruleset: Ruleset = {
      name: "advisory",
      constraints: [
        {
          id: "desc-length",
          field: "description",
          message: "Description is short",
          severity: "WARN",
          check: (v) => typeof v === "string" && v.length >= 100
        }
      ]
    };
    const report = evaluate(template, ruleset, ctx);
    expect(report.overallVerdict).toBe("WARN");
    expect(report.results[0]?.verdict).toBe("WARN");
  });

  it("overall verdict is the worst across all results", () => {
    const ruleset: Ruleset = {
      name: "mixed",
      constraints: [
        {
          id: "a-pass",
          field: "title",
          message: "Title required",
          severity: "FAIL",
          check: (v) => typeof v === "string" && v.length > 0
        },
        {
          id: "b-warn",
          field: "description",
          message: "Description is short",
          severity: "WARN",
          check: (v) => typeof v === "string" && v.length >= 100
        },
        {
          id: "c-fail",
          field: "tags",
          message: "Must have 3+ tags",
          severity: "FAIL",
          check: (v) => Array.isArray(v) && v.length >= 3
        }
      ]
    };
    const report = evaluate(template, ruleset, ctx);
    expect(report.overallVerdict).toBe("FAIL");
    const verdicts = report.results.map((r) => r.verdict);
    expect(verdicts).toContain("PASS");
    expect(verdicts).toContain("WARN");
    expect(verdicts).toContain("FAIL");
  });

  it("evaluates constraints in deterministic order by id", () => {
    const ruleset: Ruleset = {
      name: "ordering",
      constraints: [
        { id: "z-check", field: "title", message: "z", severity: "WARN", check: () => false },
        { id: "a-check", field: "title", message: "a", severity: "WARN", check: () => false },
        { id: "m-check", field: "title", message: "m", severity: "WARN", check: () => false }
      ]
    };
    const report = evaluate(template, ruleset, ctx);
    expect(report.results.map((r) => r.constraintId)).toEqual([
      "a-check",
      "m-check",
      "z-check"
    ]);
  });

  it("reads content fields when field is not a top-level property", () => {
    const ruleset: Ruleset = {
      name: "content-check",
      constraints: [
        {
          id: "width-check",
          field: "width",
          message: "Width is required",
          severity: "FAIL",
          check: (v) => v === "800"
        }
      ]
    };
    const report = evaluate(template, ruleset, ctx);
    expect(report.overallVerdict).toBe("PASS");
  });

  it("passes context to constraint check functions", () => {
    const ruleset: Ruleset = {
      name: "locale-aware",
      constraints: [
        {
          id: "locale-check",
          field: "tags",
          message: "Must include locale tag",
          severity: "FAIL",
          check: (v, c) => Array.isArray(v) && v.includes(c.locale ?? "")
        }
      ]
    };
    const passReport = evaluate(template, ruleset, { locale: "us" });
    expect(passReport.overallVerdict).toBe("PASS");

    const failReport = evaluate(template, ruleset, { locale: "uk" });
    expect(failReport.overallVerdict).toBe("FAIL");
  });

  it("returns PASS with empty constraints", () => {
    const ruleset: Ruleset = { name: "empty", constraints: [] };
    const report = evaluate(template, ruleset, ctx);
    expect(report.overallVerdict).toBe("PASS");
    expect(report.results).toHaveLength(0);
  });

  it("does not match prototype keys as top-level fields", () => {
    const ruleset: Ruleset = {
      name: "proto-safety",
      constraints: [
        {
          id: "proto-check",
          field: "toString",
          message: "Should not resolve from prototype",
          severity: "FAIL",
          check: (v) => v === undefined
        }
      ]
    };
    const report = evaluate(template, ruleset, ctx);
    expect(report.overallVerdict).toBe("PASS");
  });

  it("returns FAIL with a message when a constraint throws", () => {
    const ruleset: Ruleset = {
      name: "throwing",
      constraints: [
        {
          id: "boom",
          field: "title",
          message: "This message is not used",
          severity: "WARN",
          check: () => { throw new Error("unexpected"); }
        }
      ]
    };
    const report = evaluate(template, ruleset, ctx);
    expect(report.overallVerdict).toBe("FAIL");
    expect(report.results[0]?.verdict).toBe("FAIL");
    expect(report.results[0]?.message).toBe('Constraint "boom" threw during evaluation');
  });
});

describe("mergeRulesets", () => {
  const baseConstraint: Constraint = {
    id: "title-required",
    field: "title",
    message: "Title is required",
    severity: "FAIL",
    check: (v) => typeof v === "string" && v.length > 0
  };

  it("returns the base ruleset when no overrides are provided", () => {
    const base: Ruleset = { name: "base", constraints: [baseConstraint] };
    const merged = mergeRulesets(base);
    expect(merged.name).toBe("base");
    expect(merged.constraints).toHaveLength(1);
    expect(merged.constraints[0]?.id).toBe("title-required");
  });

  it("overrides constraints with matching ids", () => {
    const base: Ruleset = { name: "base", constraints: [baseConstraint] };
    const override: Ruleset = {
      name: "strict",
      constraints: [
        {
          id: "title-required",
          field: "title",
          message: "Title must be at least 10 chars",
          severity: "FAIL",
          check: (v) => typeof v === "string" && v.length >= 10
        }
      ]
    };
    const merged = mergeRulesets(base, override);
    expect(merged.name).toBe("strict");
    expect(merged.constraints).toHaveLength(1);
    expect(merged.constraints[0]?.message).toBe("Title must be at least 10 chars");
  });

  it("adds new constraints from overrides", () => {
    const base: Ruleset = { name: "base", constraints: [baseConstraint] };
    const override: Ruleset = {
      name: "extended",
      constraints: [
        {
          id: "desc-required",
          field: "description",
          message: "Description is required",
          severity: "WARN",
          check: (v) => typeof v === "string" && v.length > 0
        }
      ]
    };
    const merged = mergeRulesets(base, override);
    expect(merged.constraints).toHaveLength(2);
    const ids = merged.constraints.map((c) => c.id);
    expect(ids).toContain("title-required");
    expect(ids).toContain("desc-required");
  });

  it("produces deterministic constraint order by id", () => {
    const base: Ruleset = {
      name: "base",
      constraints: [
        { id: "z-rule", field: "title", message: "", severity: "WARN", check: () => true },
        { id: "a-rule", field: "title", message: "", severity: "WARN", check: () => true }
      ]
    };
    const override: Ruleset = {
      name: "extra",
      constraints: [
        { id: "m-rule", field: "title", message: "", severity: "WARN", check: () => true }
      ]
    };
    const merged = mergeRulesets(base, override);
    expect(merged.constraints.map((c) => c.id)).toEqual(["a-rule", "m-rule", "z-rule"]);
  });

  it("applies multiple overrides in order", () => {
    const base: Ruleset = { name: "base", constraints: [baseConstraint] };
    const first: Ruleset = {
      name: "first",
      constraints: [
        { ...baseConstraint, message: "From first override" }
      ]
    };
    const second: Ruleset = {
      name: "second",
      constraints: [
        { ...baseConstraint, message: "From second override" }
      ]
    };
    const merged = mergeRulesets(base, first, second);
    expect(merged.name).toBe("second");
    expect(merged.constraints[0]?.message).toBe("From second override");
  });
});
