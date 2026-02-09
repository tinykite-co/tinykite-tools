import type { FlowDefinition } from "@tinykite/core";
import Icon from "../components/Icon";

export default function FlowRunner({ flow }: { flow: FlowDefinition }) {
  return (
    <section className="flow-runner page">
      <ol>
        {flow.steps.map((step) => (
          <li key={step} className="flow-step">
            <Icon name="check" />
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <button type="button">Start Flow</button>
    </section>
  );
}
