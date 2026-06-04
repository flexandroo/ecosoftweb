export type Step = { title: string; text: string };

export default function ProductHowItWorks({
  steps,
  fallbackText,
}: {
  steps: Step[];
  fallbackText?: string;
}) {
  if (steps.length === 0 && !fallbackText) return null;

  return (
    <section className="pdp-section">
      <div className="pdp-section__head">
        <h2>Як це працює</h2>
      </div>

      {steps.length > 0 ? (
        <ol className="pdp-steps">
          {steps.map((s, i) => (
            <li className="pdp-step" key={i}>
              <span className="pdp-step__num">{i + 1}</span>
              <div className="pdp-step__body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className="prose pdp-section__prose">
          {fallbackText!.split("\n").map((l, i) =>
            l.trim() ? <p key={i}>{l.trim()}</p> : null
          )}
        </div>
      )}
    </section>
  );
}
