import Link from "next/link";
import Icon, { IconName } from "./Icon";
import HeroDevice from "./HeroDevice";
import QuizLink from "./QuizLink";

const trust = [
  "За аналізом води",
  "Для квартири, будинку й бізнесу",
  "Монтаж під ключ",
];

type Chip = {
  modifier: string;
  icon: IconName;
  num: string;
  label: string;
};

const chips: Chip[] = [
  {
    modifier: "hero2__chip--tl",
    icon: "shield",
    num: "до 99,8%",
    label: "очищення води",
  },
  {
    modifier: "hero2__chip--tr",
    icon: "softener",
    num: "Захист техніки",
    label: "від накипу",
  },
  {
    modifier: "hero2__chip--bl",
    icon: "flask",
    num: "Підбір",
    label: "під аналіз",
  },
  {
    modifier: "hero2__chip--br",
    icon: "drop",
    num: "Чиста",
    label: "питна вода",
  },
];

export default function Hero() {
  return (
    <section className="hero2">
      <span className="hero2__grid" aria-hidden="true" />
      <span className="hero2__halo" aria-hidden="true" />
      <span className="hero2__halo hero2__halo--bl" aria-hidden="true" />
      <span className="hero2__stream" aria-hidden="true" />
      <div className="container hero2__inner">
        <div className="hero2__content">
          <span className="hero2__badge">
            <span className="hero2__badge-dot" aria-hidden="true" />
            Підбір <span className="hero2__badge-sep">•</span> Монтаж{" "}
            <span className="hero2__badge-sep">•</span> Сервіс
          </span>
          <h1 className="hero2__title">
            Підберемо систему очищення води під ваш дім
          </h1>
          <p className="hero2__lead">
            Аналізуємо якість води, підбираємо обладнання Ecosoft, виконуємо
            монтаж і сервісне обслуговування.
          </p>

          <div className="hero2__actions">
            <QuizLink className="btn btn--lg hero2__cta">
              <Icon name="sparkle" />
              Підібрати систему
            </QuizLink>
            <Link href="/catalog" className="btn btn--lg btn--outline">
              Переглянути каталог
            </Link>
          </div>

          <ul className="hero2__trust">
            {trust.map((t) => (
              <li key={t}>
                <Icon name="check" size={16} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero2__visual" aria-hidden="true">
          <div className="hero2__stage">
            <span className="hero2__stage-ring" />
            <span className="hero2__stage-glow" />
            <HeroDevice />
            {chips.map((c) => (
              <span
                className={`hero2__chip ${c.modifier}`}
                key={c.modifier}
              >
                <span className="hero2__chip-icon">
                  <Icon name={c.icon} size={20} />
                </span>
                <span>
                  <span className="hero2__chip-num">{c.num}</span>
                  <span className="hero2__chip-label">{c.label}</span>
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <span className="hero2__edge" aria-hidden="true" />
    </section>
  );
}
