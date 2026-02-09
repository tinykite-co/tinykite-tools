import type { FlowDefinition } from "@tinykite/core";

export default function FlowRunner({ flow }: { flow: FlowDefinition }) {
  return (
    <section aria-label={`${flow.title} flow`}>
      <ol>
        {flow.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <button type="button">Start Flow</button>
    </section>
  );
}
