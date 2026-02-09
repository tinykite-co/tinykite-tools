import Icon from "./Icon";

export interface StatusPill {
  label: string;
  tone: "success" | "warning" | "neutral";
}

export default function StatusPills({ items }: { items: StatusPill[] }) {
  return (
    <div className="status-pills">
      {items.map((item) => (
        <span key={item.label} className={`pill pill-${item.tone}`}>
          {item.tone === "success" && <Icon name="check" />}
          {item.tone === "warning" && <Icon name="warning" />}
          {item.label}
        </span>
      ))}
    </div>
  );
}
