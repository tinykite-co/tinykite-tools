import { describe, expect, it } from "vitest";
import { zipOutputsPlaceholder } from "../src";

describe("zip", () => {
  it("returns a placeholder message", () => {
    expect(zipOutputsPlaceholder()).toContain("placeholder");
  });
});
