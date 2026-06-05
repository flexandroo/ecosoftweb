import Icon from "./Icon";

export default function ProductWhyThisModel({
  reasons,
}: {
  reasons: string[];
}) {
  if (reasons.length === 0) return null;

  return (
    <section className="pdp-section">
      <div className="pdp-section__head">
        <h2>Чому варто обрати цю модель</h2>
        <p>Чим вона відрізняється і де її краще застосовувати.</p>
      </div>
      <ul className="pdp-why">
        {reasons.map((r) => (
          <li key={r}>
            <span className="pdp-why__icon">
              <Icon name="check" size={18} />
            </span>
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
