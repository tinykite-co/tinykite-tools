import { useState } from "react";
import Icon from "./Icon";

export default function SettingsPanel({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <section className={`panel ${open ? "panel-open" : ""}`}>
      <button
        type="button"
        className="panel-toggle"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{title}</span>
        <Icon name={open ? "check" : "warning"} />
      </button>
      <div className="panel-body" aria-hidden={!open}>
        {children}
      </div>
    </section>
  );
}
