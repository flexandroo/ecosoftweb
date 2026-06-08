import Icon from "./Icon";
import type { KeyBenefit } from "@/lib/product-template";

export default function ProductKeyBenefits({
  items,
}: {
  items: KeyBenefit[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="pdp-section">
      <div className="pdp-section__head">
        <h2>Чому варто обрати цю модель</h2>
        <p>Три головні переваги цього рішення — без загальних слів.</p>
      </div>
      <div className="pdp-benefits pdp-benefits--detailed">
        {items.map((b) => (
          <div className="pdp-benefit" key={b.title}>
            <div className="pdp-benefit__icon">
              <Icon name={b.icon} size={22} />
            </div>
            <h3>{b.title}</h3>
            <p>{b.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
