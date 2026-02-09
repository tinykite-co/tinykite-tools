import { ValidationError } from "@tinykite/core";
import type { JsonPrettifyOptions } from "./types";

export function prettifyJson(input: string, options: JsonPrettifyOptions = {}): string {
  if (typeof input !== "string") {
    throw new ValidationError("JSON input must be a string.");
  }
  const indent = options.indent ?? 2;
  try {
    const parsed = JSON.parse(input);
    return JSON.stringify(parsed, null, indent);
  } catch {
    throw new ValidationError("Invalid JSON input.");
  }
}
