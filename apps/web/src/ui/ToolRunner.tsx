import type { ToolDefinition } from "@tinykite/core";
import type { FieldSchema } from "@tinykite/ui-schema";
import { useMemo } from "react";

function FieldInput({ field }: { field: FieldSchema }) {
  if (field.type === "textarea") {
    return <textarea id={field.id} name={field.id} placeholder={field.placeholder} />;
  }
  if (field.type === "select") {
    return (
      <select id={field.id} name={field.id}>
        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
  return (
    <input
      id={field.id}
      name={field.id}
      type={field.type === "number" ? "number" : "text"}
      placeholder={field.placeholder}
    />
  );
}

export default function ToolRunner({ tool }: { tool: ToolDefinition }) {
  const fields = useMemo(() => tool.params, [tool.params]);

  return (
    <section aria-label={`${tool.title} runner`}>
      <p>Runner: {tool.runner}</p>
      <form>
        {fields.map((field) => (
          <label key={field.id} style={{ display: "block", marginBottom: "1rem" }}>
            <span>{field.label}</span>
            <FieldInput field={field} />
          </label>
        ))}
        <button type="button">Run</button>
      </form>
    </section>
  );
}
