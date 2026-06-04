import Icon from "./Icon";
import type { Review } from "@/lib/products";

const trustItems: { icon: "shield" | "headset" | "flask" | "wrench" | "award"; text: string }[] = [
  { icon: "award", text: "Офіційна продукція Ecosoft" },
  { icon: "headset", text: "Сервісна підтримка та консультація" },
  { icon: "flask", text: "Підбір під аналіз вашої води" },
  { icon: "shield", text: "Гарантія від виробника" },
  { icon: "wrench", text: "Монтаж та обслуговування" },
];

export default function ProductReviews({
  reviews,
  reviewCount,
}: {
  reviews: Review[];
  reviewCount: number;
}) {
  if (reviews.length === 0) {
    return (
      <section className="pdp-section">
        <div className="pdp-section__head">
          <h2>Чому обирають Ecosoft</h2>
        </div>
        <ul className="pdp-trustlist">
          {trustItems.map((t) => (
            <li key={t.text}>
              <Icon name={t.icon} size={20} />
              <span>{t.text}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="pdp-section">
      <div className="pdp-section__head">
        <h2>Відгуки {reviewCount ? <span className="pdp-section__count">({reviewCount})</span> : null}</h2>
      </div>
      <div className="reviews">
        {reviews.map((r, i) => (
          <article className="review" key={i}>
            <div className="review__head">
              <span className="review__author">{r.author}</span>
              <span className="review__date">{r.date}</span>
            </div>
            <div className="review__body">
              {r.text
                .split("\n")
                .map((l) => l.trim())
                .filter(Boolean)
                .map((line, k) => (
                  <p key={k}>{line}</p>
                ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
