import { motionTokens } from "../motion/motionTokens";

export default function ProgressBar({ percent, label }: { percent: number; label: string }) {
  return (
    <div className="progress-wrapper">
      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${percent}%`, transitionDuration: `${motionTokens.progress.durationMs}ms` }}
        />
      </div>
      {[label].map((text) => (
        <div key={text} className="progress-label" aria-live="polite">
          {text}
        </div>
      ))}
    </div>
  );
}
