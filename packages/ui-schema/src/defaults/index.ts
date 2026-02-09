import type { UiSchema } from "../schema";

export function applyDefaults(
  schema: UiSchema,
  values: Record<string, string> = {}
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const field of schema.fields) {
    const provided = values[field.id];
    if (provided !== undefined) {
      result[field.id] = provided;
    } else if (field.defaultValue !== undefined) {
      result[field.id] = field.defaultValue;
    } else {
      result[field.id] = "";
    }
  }
  return result;
}
