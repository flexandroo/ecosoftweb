import Link from "next/link";
import Icon from "./Icon";
import HeroDevice from "./HeroDevice";

const trust = [
  "1 000 000+ клієнтів",
  "Власне виробництво",
  "Гарантія та сервіс",
  "З 2003 року",
];

export default function Hero() {
  return (
    <section className="hero2">
      <span className="hero2__grid" aria-hidden="true" />
      <span className="hero2__halo" aria-hidden="true" />
      <div className="container hero2__inner">
        <div className="hero2__content">
          <span className="hero2__eyebrow">
            <Icon name="sparkle" size={16} />
            Експертний підбір систем очищення води
          </span>
          <h1 className="hero2__title">
            Підберемо систему очищення води під ваш дім
          </h1>
          <p className="hero2__lead">
            Допомагаємо обрати, встановити та обслуговувати системи очищення
            води для квартири, будинку, офісу або свердловини.
          </p>

          <div className="hero2__actions">
            <Link href="/#quiz" className="btn btn--lg">
              <Icon name="sparkle" />
              Отримати підбір системи
            </Link>
            <Link href="/catalog" className="btn btn--lg btn--outline">
              Подивитися готові рішення
            </Link>
          </div>

          <p className="hero2__micro">
            Безкоштовна консультація · Підбір за аналізом води · Монтаж під ключ
          </p>

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
            <span className="hero2__stage-glow" />
            <HeroDevice />
            <span className="hero2__chip hero2__chip--1">
              <span className="hero2__chip-icon">
                <Icon name="shield" size={20} />
              </span>
              <span>
                <span className="hero2__chip-num">99,8%</span>
                <span className="hero2__chip-label">очищення води</span>
              </span>
            </span>
            <span className="hero2__chip hero2__chip--2">
              <span className="hero2__chip-icon">
                <Icon name="wrench" size={20} />
              </span>
              <span>
                <span className="hero2__chip-num">Монтаж</span>
                <span className="hero2__chip-label">під ключ</span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
