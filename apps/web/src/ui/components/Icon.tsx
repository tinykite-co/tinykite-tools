const icons = {
  check: (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M7.8 14.6 3.6 10.4l1.4-1.4 2.8 2.8 7-7 1.4 1.4z" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 2 1 18h18L10 2zm1 12H9v-2h2v2zm0-4H9V7h2v3z" />
    </svg>
  ),
  spinner: (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="7" strokeWidth="2" stroke="currentColor" fill="none" opacity="0.25" />
      <path d="M17 10a7 7 0 0 1-7 7" strokeWidth="2" stroke="currentColor" fill="none" />
    </svg>
  )
};

export default function Icon({ name, label }: { name: keyof typeof icons; label?: string }) {
  return (
    <span className="icon" role={label ? "img" : "presentation"} aria-label={label}>
      {icons[name]}
    </span>
  );
}
