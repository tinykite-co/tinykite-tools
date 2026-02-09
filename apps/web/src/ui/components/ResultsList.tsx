import Icon from "./Icon";

export default function ResultsList({ result }: { result: unknown }) {
  if (result === null || result === undefined) {
    return null;
  }

  const body = typeof result === "string" ? result : JSON.stringify(result, null, 2);

  return (
    <div className="result-wrap">
      <div className="result-status">
        <Icon name="check" /> Result ready
      </div>
      <pre className="result-block">{body}</pre>
    </div>
  );
}
