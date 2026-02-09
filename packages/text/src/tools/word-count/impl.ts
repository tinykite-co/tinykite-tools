import { ValidationError } from "@tinykite/core";
import type { WordCountResult } from "./types";

export function countWords(input: string): WordCountResult {
  if (typeof input !== "string") {
    throw new ValidationError("Input must be a string.");
  }
  const trimmed = input.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const lines = input ? input.split(/\r?\n/).length : 0;
  return {
    words,
    characters: input.length,
    lines
  };
}
