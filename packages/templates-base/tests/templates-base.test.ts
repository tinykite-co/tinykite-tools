import { describe, expect, it } from "vitest";
import { applyTemplateRules } from "../src";

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
