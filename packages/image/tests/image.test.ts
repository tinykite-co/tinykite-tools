import { describe, expect, it } from "vitest";
import { resizeImagePlaceholder } from "../src";

describe("image", () => {
  it("returns a placeholder message", () => {
    expect(resizeImagePlaceholder({ width: 10, height: 10 })).toContain("placeholder");
  });
});
