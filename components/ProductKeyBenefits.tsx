import Icon, { IconName } from "./Icon";

type Card = { icon: IconName; title: string; text?: string };

const defaultCards: Card[] = [
  {
    icon: "drop",
    title: "Чиста вода щодня",
    text: "Допомагає отримувати воду для пиття, приготування їжі та напоїв.",
  },
  {
    icon: "wrench",
    title: "Зручне встановлення",
    text: "Підходить для монтажу у звичну систему водопостачання.",
  },
  {
    icon: "gear",
    title: "Просте обслуговування",
    text: "Елементи можна замінювати за зрозумілим регламентом.",
  },
  {
    icon: "shield",
    title: "Офіційна продукція Ecosoft",
    text: "Сумісність, гарантія та сервісна підтримка.",
  },
];

const iconForFeature = (text: string): IconName => {
  const t = text.toLowerCase();
  if (/гаранті/.test(t)) return "shield";
  if (/монтаж|встановл/.test(t)) return "wrench";
  if (/обслуг|сервіс|регламент|замін/.test(t)) return "gear";
  if (/осмо|мембран|очищ/.test(t)) return "osmosis";
  if (/мінерал/.test(t)) return "sparkle";
  if (/смак|присмак|запах/.test(t)) return "wave";
  if (/жорстк|накип|пом'якш/.test(t)) return "softener";
  if (/залізо|іржа/.test(t)) return "drop";
  if (/ресурс|строк|років/.test(t)) return "award";
  return "check";
};

export default function ProductKeyBenefits({
  features,
}: {
  features: string[];
}) {
  // Prefer real product features (4-6 cards). Each feature becomes a card
  // with a short auto-picked icon. Title = the feature, no extra prose to
  // avoid the "long block of marketing text" anti-pattern.
  const cards: Card[] =
    features.length > 0
      ? features.slice(0, 6).map((f) => ({
          icon: iconForFeature(f),
          title: f,
        }))
      : defaultCards;

  return (
    <section className="pdp-section">
      <div className="pdp-section__head">
        <h2>Основні переваги</h2>
      </div>
      <div className="pdp-benefits">
        {cards.map((c, i) => (
          <div className="pdp-benefit" key={i}>
            <div className="pdp-benefit__icon">
              <Icon name={c.icon} size={22} />
            </div>
            <h3>{c.title}</h3>
            {c.text && <p>{c.text}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
