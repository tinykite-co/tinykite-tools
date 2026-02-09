import { describe, expect, it } from "vitest";
import type { FieldSchema, UiSchema, ValidationResult } from "../src";
import { applyDefaults } from "../src";
import { validateSchema } from "../src";

describe("ui-schema", () => {
  it("supports required text fields", () => {
    const field: FieldSchema = {
      id: "name",
      label: "Name",
      type: "text",
      required: true
    };
    expect(field.required).toBe(true);
  });

  it("supports defaultValue on fields", () => {
    const field: FieldSchema = {
      id: "separator",
      label: "Separator",
      type: "text",
      defaultValue: ","
    };
    expect(field.defaultValue).toBe(",");
  });
});

describe("applyDefaults", () => {
  const schema: UiSchema = {
    fields: [
      { id: "name", label: "Name", type: "text", required: true },
      { id: "sep", label: "Separator", type: "text", defaultValue: "," },
      { id: "count", label: "Count", type: "number", defaultValue: "10" }
    ]
  };

  it("fills missing values with defaultValue", () => {
    const result = applyDefaults(schema);
    expect(result.sep).toBe(",");
    expect(result.count).toBe("10");
  });

  it("fills missing values without defaultValue as empty string", () => {
    const result = applyDefaults(schema);
    expect(result.name).toBe("");
  });

  it("preserves provided values over defaults", () => {
    const result = applyDefaults(schema, { sep: "|", name: "test" });
    expect(result.sep).toBe("|");
    expect(result.name).toBe("test");
    expect(result.count).toBe("10");
  });

  it("returns all field ids in result", () => {
    const result = applyDefaults(schema, {});
    expect(Object.keys(result).sort()).toEqual(["count", "name", "sep"]);
  });

  it("preserves unknown keys not in schema", () => {
    const result = applyDefaults(schema, { name: "test", extra: "hidden" });
    expect(result.extra).toBe("hidden");
    expect(result.name).toBe("test");
  });
});

describe("validateSchema", () => {
  const schema: UiSchema = {
    fields: [
      { id: "name", label: "Name", type: "text", required: true },
      { id: "count", label: "Count", type: "number" },
      {
        id: "format",
        label: "Format",
        type: "select",
        options: [
          { label: "CSV", value: "csv" },
          { label: "JSON", value: "json" }
        ]
      }
    ]
  };

  it("returns valid for correct values", () => {
    const result = validateSchema(schema, { name: "test", count: "5", format: "csv" });
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("returns error for missing required field", () => {
    const result = validateSchema(schema, { name: "", count: "", format: "" });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toEqual({ fieldId: "name", message: "Name is required" });
  });

  it("returns error for whitespace-only required field", () => {
    const result = validateSchema(schema, { name: "   ", count: "", format: "" });
    expect(result.valid).toBe(false);
    expect(result.errors[0]?.fieldId).toBe("name");
  });

  it("returns error for non-numeric number field", () => {
    const result = validateSchema(schema, { name: "ok", count: "abc", format: "" });
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toEqual({
      fieldId: "count",
      message: "Count must be a number"
    });
  });

  it("accepts scientific notation and leading-dot numbers", () => {
    expect(validateSchema(schema, { name: "ok", count: "1e3", format: "" }).valid).toBe(true);
    expect(validateSchema(schema, { name: "ok", count: ".5", format: "" }).valid).toBe(true);
    expect(validateSchema(schema, { name: "ok", count: "+1", format: "" }).valid).toBe(true);
  });

  it("returns error for invalid select option", () => {
    const result = validateSchema(schema, { name: "ok", count: "", format: "xml" });
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toEqual({
      fieldId: "format",
      message: "Format must be one of the available options"
    });
  });

  it("allows empty optional fields", () => {
    const result = validateSchema(schema, { name: "test", count: "", format: "" });
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("collects multiple errors", () => {
    const result = validateSchema(schema, { name: "", count: "abc", format: "xml" });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(3);
  });

  it("returns deterministic ValidationResult shape", () => {
    const result: ValidationResult = validateSchema(schema, { name: "ok" });
    expect(typeof result.valid).toBe("boolean");
    expect(Array.isArray(result.errors)).toBe(true);
  });

  it("returns deterministic ValidationResult shape on failure", () => {
    const result: ValidationResult = validateSchema(schema, { name: "" });
    expect(typeof result.valid).toBe("boolean");
    expect(result.valid).toBe(false);
    expect(Array.isArray(result.errors)).toBe(true);
    expect(result.errors.length).toBeGreaterThan(0);
    for (const err of result.errors) {
      expect(typeof err.fieldId).toBe("string");
      expect(typeof err.message).toBe("string");
    }
  });

  it("treats whitespace-only values as empty for optional number fields", () => {
    const result = validateSchema(schema, { name: "ok", count: "   ", format: "" });
    expect(result.valid).toBe(true);
  });
});
