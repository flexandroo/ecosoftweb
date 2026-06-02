import Link from "next/link";
import { categories, products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/components/HeroSlider";
import Reveal from "@/components/Reveal";
import WaveDivider from "@/components/WaveDivider";
import SystemQuiz from "@/components/SystemQuiz";
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
  {
    icon: "drop",
    title: "Підбір за аналізом води",
    text: "Враховуємо склад води, щоб система працювала максимально ефективно.",
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
      {/* HERO SLIDER */}
      <HeroSlider />

      {/* BENEFITS */}
      <section className="section">
        <div className="container">
          <div className="features">
            {benefits.map((b, i) => (
              <Reveal className="feature" delay={i * 70} key={b.title}>
                <div className="feature__icon">
                  <Icon name={b.icon} />
                </div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="section section--tight">
        <div className="container">
          <Reveal className="section__head">
            <span className="eyebrow">
              <Icon name="drop" size={16} />
              Рішення
            </span>
            <h2 style={{ marginTop: 14 }}>Рішення для фільтрації води</h2>
            <p>Оберіть напрям під ваше житло та якість води</p>
          </Reveal>
          <Reveal className="cats">
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
          </Reveal>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section section--tight">
        <div className="container">
          <Reveal className="section__head">
            <span className="eyebrow">
              <Icon name="star" size={16} />
              Популярне
            </span>
            <h2 style={{ marginTop: 14 }}>Рекомендовані системи</h2>
            <p>Найпопулярніші рішення для дому та квартири</p>
          </Reveal>
          <Reveal className="grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </Reveal>
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
            <span className="fx-blobs" aria-hidden="true" />
            <span className="fx-noise" aria-hidden="true" />
            <div className="select__grid">
              <div className="select__head">
                <span className="eyebrow">
                  <Icon name="sparkle" size={16} />
                  Підбір за 1 хвилину
                </span>
                <h2>Підберіть систему за 1 хвилину</h2>
                <p>
                  Дайте відповідь на 3 короткі питання — і ми порекомендуємо
                  оптимальне рішення під ваше житло, джерело та якість води.
                </p>
                <div className="select__steps select__steps--compact">
                  {steps.map((s, i) => (
                    <div className="step" key={s.title}>
                      <div className="step__num">{i + 1}</div>
                      <div>
                        <h3>{s.title}</h3>
                        <p>{s.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="select__actions">
                  <Link href="/contacts" className="btn btn--lg btn--secondary">
                    <Icon name="headset" />
                    Або отримати консультацію
                  </Link>
                </div>
              </div>
              <SystemQuiz />
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="section section--tight">
        <div className="container">
          <div className="cta-band">
            <span className="fx-blobs fx-blobs--dark" aria-hidden="true" />
            <span className="fx-noise" aria-hidden="true" />
            <WaveDivider className="cta-band__wave" flip />
            <div className="cta-band__text">
              <h2>Не знаєте, яка система потрібна?</h2>
              <p>
                Підберемо рішення під вашу воду, житло та потреби — з доставкою
                по Україні та монтажем під ключ.
              </p>
            </div>
            <div className="cta-band__actions">
              <Link href="/#select" className="btn btn--lg btn--light">
                <Icon name="sparkle" />
                Підібрати систему
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
