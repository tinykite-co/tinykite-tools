import { describe, expect, it } from "vitest";
import type { FieldSchema } from "../src";

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
});
