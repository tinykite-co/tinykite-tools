import { describe, expect, it } from "vitest";
import { mergePdfPlaceholder } from "../src";

describe("pdf", () => {
  it("returns a placeholder message", () => {
    expect(mergePdfPlaceholder()).toContain("placeholder");
  });
});
