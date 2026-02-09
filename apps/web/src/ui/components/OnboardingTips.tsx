import { useEffect, useState } from "react";

export default function OnboardingTips({ tips, storageKey }: { tips: string[]; storageKey: string }) {
  const [visible, setVisible] = useState<boolean[]>(() => tips.map(() => true));

  useEffect(() => {
    if (typeof localStorage === "undefined") return;
    const stored = localStorage.getItem(storageKey);
    if (!stored) return;
    const dismissed = stored.split(",");
    setVisible(tips.map((_, index) => !dismissed.includes(String(index))));
  }, [storageKey, tips]);

  const dismiss = (index: number) => {
    setVisible((current) => {
      const next = [...current];
      next[index] = false;
      if (typeof localStorage !== "undefined") {
        const dismissed = next
          .map((show, idx) => (show ? null : String(idx)))
          .filter(Boolean)
          .join(",");
        localStorage.setItem(storageKey, dismissed);
      }
      return next;
    });
  };

  if (!tips.some((_, index) => visible[index])) {
    return null;
  }

  return (
    <div className="onboarding">
      {tips.map((tip, index) =>
        visible[index] ? (
          <div key={tip} className="onboarding-card">
            <span>{tip}</span>
            <button type="button" onClick={() => dismiss(index)}>
              Dismiss
            </button>
          </div>
        ) : null
      )}
    </div>
  );
}
