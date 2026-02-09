import { describe, expect, it } from "vitest";
import { ${pkg}Placeholder } from "../src";

describe("${pkg}", () => {
  it("returns a placeholder message", () => {
    expect(${pkg}Placeholder()).toContain("placeholder");
  });
});
