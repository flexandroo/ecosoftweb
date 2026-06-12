import Link from "next/link";
import HeroBanners from "@/components/HeroBanners";
import Reveal from "@/components/Reveal";
import SystemQuiz from "@/components/SystemQuiz";
import QuizLink from "@/components/QuizLink";
import FAQ, { FAQItem } from "@/components/FAQ";
import Icon, { IconName } from "@/components/Icon";

/* ---------------------------------------------------------------- */
/*  Home page is intentionally short: 7 sections, no duplicates.    */
/*  Flow: Hero → problem → quiz → process → trust → FAQ → final CTA */
/* ---------------------------------------------------------------- */

type ProblemCard = {
  icon: IconName;
  title: string;
  text: string;
  solution: string;
  href: string;
};

const problems: ProblemCard[] = [
  {
    icon: "kettle",
    title: "Накип на чайнику та техніці",
    text: "Жорстка вода залишає білий наліт і скорочує ресурс техніки.",
    solution: "Пом'якшувач або комплексна система.",
    href: "/catalog?category=filtration-systems&subcategory=fs-softening",
  },
  {
    icon: "drop",
    title: "Рудий наліт і залізо у воді",
    text: "Іржаві плями на сантехніці й жовтуватий відтінок води.",
    solution: "Колонна система знезалізнення.",
    href: "/catalog?category=filtration-systems&subcategory=fs-iron-hardness",
  },
  {
    icon: "wave",
    title: "Запах або присмак води",
    text: "Хлор, сірководень чи сторонній присмак у воді.",
    solution: "Вугільний картридж або зворотний осмос.",
    href: "/catalog?category=filtration-systems&subcategory=fs-chlorine",
  },
  {
    icon: "grain",
    title: "Пісок і механічні домішки",
    text: "Каламутність, осад і пісок, що псують воду й сантехніку.",
    solution: "Магістральний фільтр на вході води.",
    href: "/catalog?category=mainline-filters",
  },
  {
    icon: "softener",
    title: "Жорстка вода",
    text: "Сухість шкіри, накип у бойлері й перевитрата засобів.",
    solution: "Пом'якшувач кабінетного або колонного типу.",
    href: "/catalog?category=filtration-systems&subcategory=fs-softening",
  },
  {
    icon: "jug",
    title: "Потрібна чиста питна вода",
    text: "Смачна й безпечна вода для пиття та готування.",
    solution: "Зворотний осмос або CROSS під мийку.",
    href: "/catalog?category=reverse-osmosis",
  },
];

const process: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "flask",
    title: "Опис проблеми або аналіз води",
    text: "Ви описуєте проблему або надсилаєте аналіз — ми визначаємо, що саме потрібно очищувати.",
  },
  {
    icon: "osmosis",
    title: "Підбір обладнання",
    text: "Підбираємо 1–2 рішення Ecosoft під вашу воду, житло, кількість людей і санвузлів.",
  },
  {
    icon: "wrench",
    title: "Монтаж під ключ",
    text: "Доставляємо, встановлюємо, налаштовуємо систему й перевіряємо її роботу.",
  },
  {
    icon: "headset",
    title: "Сервіс після встановлення",
    text: "Допомагаємо з обслуговуванням, заміною картриджів і регламентом сервісу.",
  },
];

const trust: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "shield",
    title: "Офіційне обладнання Ecosoft",
    text: "Працюємо з оригінальними системами, комплектуючими та картриджами.",
  },
  {
    icon: "flask",
    title: "Підбір не на око",
    text: "Враховуємо аналіз води, тип житла, кількість людей і санвузлів.",
  },
  {
    icon: "question",
    title: "Пояснюємо простими словами",
    text: "Показуємо різницю між системами без технічного перевантаження.",
  },
  {
    icon: "headset",
    title: "Супровід після покупки",
    text: "Допомагаємо з обслуговуванням, картриджами й сервісом.",
  },
];

const faqItems: FAQItem[] = [
  {
    q: "Як зрозуміти, яка система мені потрібна?",
    a: "Орієнтуємось на джерело води, тип житла й проблему, яку треба прибрати. Найкраще — пройти короткий підбір вище або надіслати аналіз води, і ми підкажемо 1–2 конкретні моделі.",
  },
  {
    q: "Чи потрібен аналіз води?",
    a: "Для квартирного осмосу — необов'язково. Для будинку зі свердловиною або колодязем аналіз бажаний: без нього легко поставити невідповідну систему або переплатити.",
  },
  {
    q: "Чим відрізняється зворотний осмос від комплексної системи?",
    a: "Осмос — окремий фільтр під мийку для пиття. Комплексна (колонна) система ставиться на вході в будинок і готує воду для душу, техніки й сантехніки. Часто ставлять разом.",
  },
  {
    q: "Як часто потрібно міняти картриджі?",
    a: "Картриджі попереднього очищення в осмосі — раз на 6–12 місяців, мембрана — раз на 2–3 роки. Для колонних систем — регенерація сіллю за регламентом, заміна засипки — раз на 5–8 років.",
  },
  {
    q: "Чи можна замовити монтаж?",
    a: "Так, монтаж — наша основна послуга. Компактні системи — 1–2 години, колонні — 3–4. Працюємо у Києві та області, для будинків виїжджаємо по всій Україні.",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroBanners />

      {/* 2 — WATER PROBLEMS */}
      <section className="section section--tight" id="problems">
        <div className="container">
          <Reveal className="section__head">
            <h2 style={{ marginTop: 12 }}>Яку проблему з водою треба вирішити?</h2>
            <p>Оберіть знайому ситуацію — підкажемо тип системи, який її закриває.</p>
          </Reveal>

          <div className="problem-grid">
            {problems.map((p, i) => (
              <Reveal className="problem-card" key={p.title} delay={i * 40}>
                <span className="problem-card__icon">
                  <Icon name={p.icon} size={24} />
                </span>
                <h3>{p.title}</h3>
                <p className="problem-card__text">{p.text}</p>
                <p className="problem-card__solution">
                  <strong>Рішення:</strong> {p.solution}
                </p>
                <Link
                  href={p.href}
                  className="btn btn--block btn--outline problem-card__cta"
                >
                  Підібрати рішення
                  <Icon name="arrow" size={16} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — QUIZ */}
      <section className="section section--tight" id="quiz">
        <div className="container">
          <div className="quiz-block">
            <span className="fx-blobs" aria-hidden="true" />
            <span className="fx-noise" aria-hidden="true" />
            <div className="quiz-block__head">
              <h2>Підберіть систему без технічних знань</h2>
              <p>
                Відповідайте на кілька простих питань — покажемо, яке рішення
                підходить саме вам.
              </p>
              <ul className="quiz-block__points">
                <li>
                  <Icon name="check" size={16} />
                  Без складних термінів
                </li>
                <li>
                  <Icon name="check" size={16} />
                  Враховуємо житло і джерело води
                </li>
                <li>
                  <Icon name="check" size={16} />
                  Даємо готову рекомендацію
                </li>
              </ul>
            </div>
            <SystemQuiz />
          </div>
        </div>
      </section>

      {/* 4 — HOW WE WORK */}
      <section className="section section--tight" id="process">
        <div className="container">
          <Reveal className="section__head">
            <h2 style={{ marginTop: 12 }}>Як ми працюємо</h2>
            <p>
              Від першого запиту до сервісу після встановлення — все в одному
              процесі.
            </p>
          </Reveal>

          <ol className="howwework howwework--4">
            {process.map((s, i) => (
              <li className="howwework__step" key={s.title}>
                <span className="howwework__num">{i + 1}</span>
                <span className="howwework__icon">
                  <Icon name={s.icon} size={22} />
                </span>
                <div className="howwework__body">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="section__cta">
            <Link href="/contacts" className="btn btn--lg">
              <Icon name="flask" />
              Надіслати аналіз води
            </Link>
            <QuizLink className="btn btn--lg btn--outline">
              <Icon name="sparkle" />
              Підібрати систему
            </QuizLink>
          </div>
        </div>
      </section>

      {/* 5 — TRUST */}
      <section className="section section--tight" id="trust">
        <div className="container">
          <Reveal className="section__head">
            <h2 style={{ marginTop: 12 }}>Чому нам можна довіряти</h2>
          </Reveal>

          <div className="trust-grid trust-grid--4">
            {trust.map((b, i) => (
              <Reveal className="trust-card" key={b.title} delay={i * 40}>
                <span className="trust-card__icon">
                  <Icon name={b.icon} size={22} />
                </span>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — FAQ */}
      <section className="section section--tight" id="faq">
        <div className="container">
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* 7 — FINAL CTA */}
      <section className="section section--tight">
        <div className="container">
          <div className="final-cta">
            <span className="fx-blobs fx-blobs--dark" aria-hidden="true" />
            <span className="fx-noise" aria-hidden="true" />
            <div className="final-cta__text">
              <h2>Не знаєте, з чого почати?</h2>
              <p>
                Опишіть проблему з водою або надішліть аналіз — підкажемо, яка
                система підійде саме вам.
              </p>
            </div>
            <div className="final-cta__actions">
              <Link href="/contacts" className="btn btn--lg btn--light">
                <Icon name="headset" />
                Отримати консультацію
              </Link>
              <Link href="/contacts" className="btn btn--lg btn--on-dark">
                <Icon name="flask" />
                Надіслати аналіз води
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE STICKY CTA */}
      <QuizLink className="sticky-cta">
        <Icon name="sparkle" size={18} />
        Підібрати систему
      </QuizLink>
    </>
  );
}
