export type FieldType = "text" | "textarea" | "number" | "file" | "select";

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldSchema {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  options?: FieldOption[];
}

export interface UiSchema {
  fields: FieldSchema[];
}

export interface ValidationError {
  fieldId: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}
