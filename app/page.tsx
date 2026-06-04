import Link from "next/link";
import { products } from "@/lib/products";
import FeaturedProductCard from "@/components/FeaturedProductCard";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SystemQuiz from "@/components/SystemQuiz";
import BenefitsCarousel from "@/components/BenefitsCarousel";
import Icon, { IconName } from "@/components/Icon";

type ProblemCard = {
  icon: IconName;
  title: string;
  text: string;
  href: string;
};

const problems: ProblemCard[] = [
  {
    icon: "kettle",
    title: "Накип на чайнику та техніці",
    text: "Жорстка вода залишає білий наліт і скорочує строк служби техніки.",
    href: "/catalog?category=filtration-systems&subcategory=fs-softening",
  },
  {
    icon: "drop",
    title: "Рудий наліт і залізо",
    text: "Іржаві плями на сантехніці та жовтуватий колір води.",
    href: "/catalog?category=filtration-systems&subcategory=fs-iron-hardness",
  },
  {
    icon: "wave",
    title: "Запах або присмак води",
    text: "Хлор, сірководень чи сторонній присмак у питній воді.",
    href: "/catalog?category=filtration-systems&subcategory=fs-chlorine",
  },
  {
    icon: "grain",
    title: "Пісок і механічні домішки",
    text: "Каламутність та осад, що псують воду й сантехніку.",
    href: "/catalog?category=mainline-filters",
  },
  {
    icon: "softener",
    title: "Жорстка вода",
    text: "Сухість шкіри, накип і перевитрата мийних засобів.",
    href: "/catalog?category=filtration-systems&subcategory=fs-softening",
  },
  {
    icon: "jug",
    title: "Потрібна чиста питна вода",
    text: "Смачна та безпечна вода для пиття й приготування їжі.",
    href: "/catalog?category=reverse-osmosis",
  },
];

const benefits: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "flask",
    title: "Підбір не «на око»",
    text: "Враховуємо аналіз води, тип житла, кількість людей і вашу задачу, щоб система працювала стабільно.",
  },
  {
    icon: "shield",
    title: "Офіційне обладнання Ecosoft",
    text: "Працюємо із сертифікованими системами та комплектуючими, а не випадковими рішеннями.",
  },
  {
    icon: "wrench",
    title: "Монтаж без зайвого клопоту",
    text: "Доставимо, змонтуємо, налаштуємо систему і пояснимо, як нею користуватися.",
  },
  {
    icon: "headset",
    title: "Сервіс після встановлення",
    text: "Допоможемо з обслуговуванням, заміною картриджів і підтримкою системи після покупки.",
  },
  {
    icon: "drop",
    title: "Рішення для різної води",
    text: "Підбираємо системи для міського водопроводу, свердловини, колодязя, квартири, будинку або бізнесу.",
  },
];

const serviceSteps: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "sparkle",
    title: "Підбір системи",
    text: "Визначаємо рішення під вашу воду, житло та задачу.",
  },
  {
    icon: "truck",
    title: "Доставка і монтаж",
    text: "Привеземо, встановимо й налаштуємо систему під ключ.",
  },
  {
    icon: "wrench",
    title: "Регулярний сервіс",
    text: "Нагадаємо про заміну картриджів і підтримаємо систему.",
  },
];

export default function HomePage() {
  const featured = products.filter((p) => p.badge).slice(0, 4);

  return (
    <>
      <Hero />

      {/* WATER PROBLEMS */}
      <section className="section section--tight" id="problems">
        <div className="container">
          <Reveal className="section__head">
            <h2 style={{ marginTop: 12 }}>
              Оберіть те, що турбує — покажемо відповідні рішення.
            </h2>
          </Reveal>

          <div className="problems">
            {problems.map((p, i) => (
              <Reveal key={p.title} className="problem" delay={i * 50}>
                <Link href={p.href} className="problem__link">
                  <span className="problem__icon">
                    <Icon name={p.icon} size={22} />
                  </span>
                  <span className="problem__text">
                    <span className="problem__title">{p.title}</span>
                    <span className="problem__desc">{p.text}</span>
                  </span>
                  <Icon name="arrow" size={18} className="problem__arrow" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section section--tight">
        <div className="container">
          <Reveal className="section__head">
            <h2 style={{ marginTop: 12 }}>Популярні рішення для дому</h2>
            <p>
              Зібрали системи, які найчастіше обирають для квартир, будинків і
              щоденного використання.
            </p>
          </Reveal>

          <div className="fgrid">
            {featured.map((p) => (
              <FeaturedProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="section__cta">
            <Link href="/catalog" className="btn btn--lg btn--outline">
              Усі товари каталогу
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* QUIZ */}
      <section className="section section--tight" id="quiz">
        <div className="container">
          <div className="quiz-block">
            <span className="fx-blobs" aria-hidden="true" />
            <span className="fx-noise" aria-hidden="true" />
            <div className="quiz-block__head">
              <h2>Підберіть систему без технічних знань</h2>
              <p>
                Відповідайте на кілька простих питань — ми підкажемо, яке
                рішення підходить саме вам.
              </p>
              <ul className="quiz-block__points">
                <li>
                  <Icon name="check" size={16} />
                  Без технічних термінів
                </li>
                <li>
                  <Icon name="check" size={16} />
                  Враховуємо житло та джерело води
                </li>
                <li>
                  <Icon name="check" size={16} />
                  Готова рекомендація одразу
                </li>
              </ul>
            </div>
            <SystemQuiz />
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section section--tight">
        <div className="container">
          <Reveal className="section__head">
            <h2 style={{ marginTop: 12 }}>
              Чому варто підбирати систему з Ecosoft
            </h2>
          </Reveal>

          <BenefitsCarousel items={benefits} />
        </div>
      </section>

      {/* INSTALL & SERVICE */}
      <section className="section section--tight" id="service">
        <div className="container">
          <div className="service">
            <div className="service__head">
              <h2>
                Встановлення і сервіс — не залишаємо вас самих після покупки
              </h2>
              <p>
                Після підбору системи спеціалісти допоможуть з монтажем,
                налаштуванням і подальшим обслуговуванням. Вам не потрібно
                самостійно розбиратися в картриджах, підключеннях і регламенті
                заміни.
              </p>
              <Link href="/contacts" className="btn btn--lg">
                <Icon name="headset" />
                Запитати про монтаж
              </Link>
            </div>
            <ol className="service__steps">
              {serviceSteps.map((s, i) => (
                <li className="service-step" key={s.title}>
                  <span className="service-step__num">{i + 1}</span>
                  <span className="service-step__icon">
                    <Icon name={s.icon} size={22} />
                  </span>
                  <span className="service-step__body">
                    <span className="service-step__title">{s.title}</span>
                    <span className="service-step__text">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section section--tight">
        <div className="container">
          <div className="final-cta">
            <span className="fx-blobs fx-blobs--dark" aria-hidden="true" />
            <span className="fx-noise" aria-hidden="true" />
            <div className="final-cta__text">
              <h2>Не знаєте, з чого почати?</h2>
              <p>
                Опишіть вашу воду, тип житла або надішліть аналіз — ми підкажемо,
                яка система підійде саме вам.
              </p>
            </div>
            <div className="final-cta__actions">
              <Link href="/contacts" className="btn btn--lg btn--light">
                <Icon name="headset" />
                Отримати консультацію
              </Link>
              <Link href="/catalog" className="btn btn--lg btn--on-dark">
                Перейти до каталогу
                <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE STICKY CTA */}
      <Link href="/#quiz" className="sticky-cta">
        <Icon name="sparkle" size={18} />
        Підібрати систему
      </Link>
    </>
  );
}
