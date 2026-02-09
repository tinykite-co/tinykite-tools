import type { UiSchema, ValidationResult, ValidationError } from "../schema";

export function validateSchema(
  schema: UiSchema,
  values: Record<string, string>
): ValidationResult {
  const errors: ValidationError[] = [];

  for (const field of schema.fields) {
    const value = values[field.id];

    if (field.required && (!value || value.trim() === "")) {
      errors.push({ fieldId: field.id, message: `${field.label} is required` });
      continue;
    }

    if (field.type === "number" && value && value.trim() !== "") {
      if (Number.isNaN(Number(value))) {
        errors.push({
          fieldId: field.id,
          message: `${field.label} must be a number`
        });
      }
    }

    if (field.type === "select" && field.options && value && value.trim() !== "") {
      const validValues = field.options.map((o) => o.value);
      if (!validValues.includes(value)) {
        errors.push({
          fieldId: field.id,
          message: `${field.label} must be one of the available options`
        });
      }
    }
  }

  return { valid: errors.length === 0, errors };
}
