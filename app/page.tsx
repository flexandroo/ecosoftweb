import Link from "next/link";
import { categories, products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Icon, { IconName } from "@/components/Icon";

const benefits: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "shield",
    title: "Гарантія якості",
    text: "Сертифікована продукція та офіційна гарантія на все обладнання.",
  },
  {
    icon: "truck",
    title: "Доставка по Україні",
    text: "Відправлення Новою поштою у день оформлення замовлення.",
  },
  {
    icon: "wrench",
    title: "Монтаж під ключ",
    text: "Професійне встановлення та сервісне обслуговування систем.",
  },
  {
    icon: "headset",
    title: "Експертна консультація",
    text: "Безкоштовно підберемо рішення під аналіз вашої води.",
  },
];

const steps: { title: string; text: string }[] = [
  {
    title: "Розкажіть про воду",
    text: "Тип житла, кількість мешканців та особливості води — централізована, свердловина чи колодязь.",
  },
  {
    title: "Отримайте рекомендацію",
    text: "Спеціаліст Ecosoft підбере оптимальну систему під ваші потреби та бюджет.",
  },
  {
    title: "Замовте з монтажем",
    text: "Доставимо та встановимо систему під ключ, навчимо користуватися й обслуговувати.",
  },
];

export default function HomePage() {
  const featured = products.filter((p) => p.badge).slice(0, 4);
  const solutions = categories;

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <span className="eyebrow">
              <Icon name="sparkle" size={16} />
              Експерти з очищення води з 2003 року
            </span>
            <h1>
              Підберемо систему очищення води{" "}
              <span className="accent">під ваш дім</span>
            </h1>
            <p className="hero__lead">
              Фільтри та системи Ecosoft для питної води, захисту техніки та
              комплексного очищення. Допоможемо обрати рішення під вашу воду,
              житло та потреби.
            </p>
            <div className="hero__actions">
              <Link href="/#select" className="btn btn--lg">
                <Icon name="sparkle" />
                Підібрати систему
              </Link>
              <Link href="/catalog" className="btn btn--lg btn--secondary">
                Перейти до каталогу
              </Link>
            </div>
            <div className="hero__trust">
              <span className="hero__trust-item">
                <Icon name="check" />1 000 000+ клієнтів
              </span>
              <span className="hero__trust-item">
                <Icon name="check" />
                Власне виробництво
              </span>
              <span className="hero__trust-item">
                <Icon name="check" />
                Гарантія та сервіс
              </span>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__orb">
              <Icon name="drop" />
            </div>
            <div className="glass-card glass-card--tl">
              <Icon name="shield" />
              <div>
                <div className="gc__num">99,8%</div>
                <div className="gc__label">очищення води</div>
              </div>
            </div>
            <div className="glass-card glass-card--br">
              <Icon name="award" />
              <div>
                <div className="gc__num">20+</div>
                <div className="gc__label">років досвіду</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section">
        <div className="container">
          <div className="features">
            {benefits.map((b) => (
              <div className="feature" key={b.title}>
                <div className="feature__icon">
                  <Icon name={b.icon} />
                </div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="section section--tight">
        <div className="container">
          <div className="section__head">
            <span className="eyebrow">
              <Icon name="drop" size={16} />
              Рішення
            </span>
            <h2 style={{ marginTop: 14 }}>Рішення для фільтрації води</h2>
            <p>Оберіть напрям під ваше житло та якість води</p>
          </div>
          <div className="cats">
            {solutions.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalog?category=${cat.slug}`}
                className="cat-tile"
              >
                <div className="cat-tile__icon">
                  <Icon name={cat.icon} />
                </div>
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
                <span className="cat-tile__more">
                  Детальніше
                  <Icon name="arrow" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section section--tight">
        <div className="container">
          <div className="section__head">
            <span className="eyebrow">
              <Icon name="star" size={16} />
              Популярне
            </span>
            <h2 style={{ marginTop: 14 }}>Рекомендовані системи</h2>
            <p>Найпопулярніші рішення для дому та квартири</p>
          </div>
          <div className="grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/catalog" className="btn btn--lg btn--outline">
              Усі товари каталогу
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* EXPERT SELECTION */}
      <section className="section section--tight" id="select">
        <div className="container">
          <div className="select">
            <div className="select__head">
              <span className="eyebrow">
                <Icon name="headset" size={16} />
                Підбір системи
              </span>
              <h2>Підбір системи професіоналами Ecosoft</h2>
              <p>
                Не знаєте, який фільтр потрібен саме вам? Враховуємо аналіз води,
                кількість людей і тип житла — квартира, будинок або офіс — і
                пропонуємо готове рішення.
              </p>
            </div>
            <div className="select__steps">
              {steps.map((s, i) => (
                <div className="step" key={s.title}>
                  <div className="step__num">{i + 1}</div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
            <div className="select__actions">
              <Link href="/contacts" className="btn btn--lg">
                <Icon name="headset" />
                Отримати консультацію
              </Link>
              <Link href="/catalog" className="btn btn--lg btn--secondary">
                Переглянути каталог
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="section section--tight">
        <div className="container">
          <div className="cta-band">
            <div className="cta-band__text">
              <h2>Чиста вода у вашому домі вже сьогодні</h2>
              <p>
                Залиште заявку — підберемо систему під вашу воду та встановимо
                під ключ.
              </p>
            </div>
            <div className="cta-band__actions">
              <Link href="/contacts" className="btn btn--lg btn--light">
                Залишити заявку
              </Link>
              <a href="tel:+380800000000" className="btn btn--lg btn--on-dark">
                <Icon name="phone" />0 800 00 00 00
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
