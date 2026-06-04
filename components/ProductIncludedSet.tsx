import Icon from "./Icon";

export default function ProductIncludedSet({
  items,
}: {
  items: string[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="pdp-section">
      <div className="pdp-section__head">
        <h2>Що входить у комплект</h2>
      </div>
      <ul className="pdp-included">
        {items.map((it) => (
          <li key={it}>
            <span className="pdp-included__icon">
              <Icon name="check" size={18} />
            </span>
            <span className="pdp-included__text">{it}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
