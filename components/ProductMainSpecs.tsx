import type { Spec } from "@/lib/products";

export default function ProductMainSpecs({
  items,
}: {
  items: Spec[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="pdp-section">
      <div className="pdp-section__head">
        <h2>Основні характеристики</h2>
        <p>Найважливіші параметри, на які варто звернути увагу.</p>
      </div>
      <div className="pdp-specs">
        {items.map((s) => (
          <div className="pdp-spec" key={s.name}>
            <span className="pdp-spec__name">{s.name}</span>
            <span className="pdp-spec__value">{s.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
