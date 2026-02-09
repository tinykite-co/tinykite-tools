import { describe, expect, it } from "vitest";
import { countWords, prettifyJson, titleCase } from "../src";

describe("text tools", () => {
  it("counts words", () => {
    const result = countWords("hello world\nnext");
    expect(result.words).toBe(3);
    expect(result.lines).toBe(2);
  });

  it("prettifies json", () => {
    const result = prettifyJson("{\"a\":1}");
    expect(result).toContain("\n");
  });

  it("title cases", () => {
    expect(titleCase("hello tinykite")).toBe("Hello Tinykite");
  });
});
