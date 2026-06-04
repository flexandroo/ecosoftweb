import Icon from "./Icon";

export default function ProductMaintenanceBlock({
  text,
  sourceText,
}: {
  text: string;
  /** Real maintenance section from product data, if any. */
  sourceText?: string;
}) {
  const body = sourceText && sourceText.trim() ? sourceText : text;
  const lines = body
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  return (
    <section className="pdp-section">
      <div className="pdp-section__head">
        <h2>Обслуговування</h2>
      </div>
      <div className="pdp-maintenance">
        <span className="pdp-maintenance__icon">
          <Icon name="wrench" size={22} />
        </span>
        <div className="prose">
          {lines.map((l, i) => (
            <p key={i}>{l}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
