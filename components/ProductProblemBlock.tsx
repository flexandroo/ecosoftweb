import Icon from "./Icon";
import type { ProblemPoint } from "@/lib/product-template";

export default function ProductProblemBlock({
  items,
}: {
  items: ProblemPoint[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="pdp-section">
      <div className="pdp-section__head">
        <h2>Яку проблему вирішує</h2>
        <p>Найчастіші ситуації, у яких допомагає цей товар.</p>
      </div>
      <div className="pdp-problems">
        {items.map((p, i) => (
          <div className="pdp-problem" key={i}>
            <span className="pdp-problem__icon">
              <Icon name={p.icon} size={22} />
            </span>
            <span className="pdp-problem__text">{p.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
