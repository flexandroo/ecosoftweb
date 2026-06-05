import Link from "next/link";
import Icon from "./Icon";
import HeroDevice from "./HeroDevice";
import QuizLink from "./QuizLink";

const trust = [
  "Очищення до 99,8%",
  "Підбір за аналізом води",
  "Монтаж під ключ",
  "Сервісне обслуговування",
];

export default function Hero() {
  return (
    <section className="hero2">
      <span className="hero2__grid" aria-hidden="true" />
      <span className="hero2__halo" aria-hidden="true" />
      <div className="container hero2__inner">
        <div className="hero2__content">
          <h1 className="hero2__title">
            Підберемо систему очищення води під ваш дім
          </h1>
          <p className="hero2__lead">
            Аналізуємо якість води, підбираємо обладнання Ecosoft, виконуємо
            монтаж і сервісне обслуговування для квартири, будинку, офісу або
            свердловини.
          </p>

          <div className="hero2__actions">
            <QuizLink className="btn btn--lg">
              <Icon name="sparkle" />
              Підібрати систему
            </QuizLink>
            <Link href="/catalog" className="btn btn--lg btn--outline">
              Переглянути каталог
            </Link>
            <Link href="/contacts" className="btn btn--lg btn--outline">
              <Icon name="headset" />
              Отримати консультацію
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
