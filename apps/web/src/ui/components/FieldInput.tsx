import type { FieldSchema } from "@tinykite/ui-schema";

export default function FieldInput({
  field,
  value,
  onChange,
  compact
}: {
  field: FieldSchema;
  value: string;
  onChange: (value: string) => void;
  compact: boolean;
}) {
  if (field.type === "textarea") {
    return (
      <textarea
        id={field.id}
        name={field.id}
        rows={compact ? 4 : 8}
        placeholder={field.placeholder}
        required={field.required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        id={field.id}
        name={field.id}
        value={value}
        required={field.required}
        onChange={(event) => onChange(event.target.value)}
      >
        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "file") {
    return <input id={field.id} name={field.id} type="file" />;
  }

  return (
    <input
      id={field.id}
      name={field.id}
      type={field.type === "number" ? "number" : "text"}
      placeholder={field.placeholder}
      required={field.required}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
