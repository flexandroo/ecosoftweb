import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SystemQuiz from "@/components/SystemQuiz";
import BenefitsCarousel from "@/components/BenefitsCarousel";
import QuizLink from "@/components/QuizLink";
import FAQ, { FAQItem } from "@/components/FAQ";
import Icon, { IconName } from "@/components/Icon";

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
    text: "Жорстка вода залишає білий наліт і скорочує строк служби побутової техніки.",
    solution: "Пом'якшувач або комплексна система для будинку.",
    href: "/catalog?category=filtration-systems&subcategory=fs-softening",
  },
  {
    icon: "drop",
    title: "Рудий наліт і залізо у воді",
    text: "Іржаві плями на сантехніці й жовтуватий відтінок води — типовий знак заліза у джерелі.",
    solution: "Колонна система знезалізнення або картриджний фільтр.",
    href: "/catalog?category=filtration-systems&subcategory=fs-iron-hardness",
  },
  {
    icon: "wave",
    title: "Запах або присмак води",
    text: "Хлор, сірководень або сторонній присмак у питній воді.",
    solution: "Вугільний картридж, аератор або зворотний осмос для пиття.",
    href: "/catalog?category=filtration-systems&subcategory=fs-chlorine",
  },
  {
    icon: "grain",
    title: "Пісок і механічні домішки",
    text: "Каламутність, осад і дрібний пісок, що псують воду та сантехніку.",
    solution: "Магістральний фільтр механічного очищення на вході.",
    href: "/catalog?category=mainline-filters",
  },
  {
    icon: "softener",
    title: "Жорстка вода",
    text: "Сухість шкіри, перевитрата мийних засобів, накип у бойлері й трубах.",
    solution: "Пом'якшувач кабінетного або колонного типу.",
    href: "/catalog?category=filtration-systems&subcategory=fs-softening",
  },
  {
    icon: "jug",
    title: "Потрібна чиста питна вода",
    text: "Хочете смачну й безпечну воду без бутильованої з магазину.",
    solution: "Фільтр зворотного осмосу або CROSS під мийку.",
    href: "/catalog?category=reverse-osmosis",
  },
];

type Scenario = {
  icon: IconName;
  title: string;
  text: string;
  picks: string;
  href: string;
};

const scenarios: Scenario[] = [
  {
    icon: "building",
    title: "Для квартири",
    text: "Міський водопровід, компактний монтаж під мийкою, безпечна вода для пиття та кави.",
    picks: "Зворотний осмос, CROSS, проточний фільтр",
    href: "/catalog?category=reverse-osmosis",
  },
  {
    icon: "home",
    title: "Для приватного будинку",
    text: "Комплексне очищення на вході в будинок: захист сантехніки, техніки й бойлера.",
    picks: "Колонна система, пом'якшувач, магістральний фільтр",
    href: "/catalog?category=filtration-systems",
  },
  {
    icon: "osmosis",
    title: "Для свердловини або колодязя",
    text: "Власне джерело: зазвичай вода жорстка, з підвищеним залізом, манганом і органікою.",
    picks: "Знезалізнення, пом'якшення, осмос для пиття",
    href: "/catalog?category=filtration-systems&subcategory=fs-iron-hardness",
  },
  {
    icon: "award",
    title: "Для бізнесу та HoReCa",
    text: "Кав'ярні, ресторани, готелі — стабільна вода для кавомашин і пароконвектоматів.",
    picks: "Професійні системи RObust та водопідготовка",
    href: "/catalog?category=horeca",
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

const howWeWork: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "headset",
    title: "Опис проблеми або аналіз",
    text: "Ви описуєте проблему з водою або надсилаєте аналіз — підкажемо, де його зробити, якщо ще немає.",
  },
  {
    icon: "flask",
    title: "Визначаємо етапи очищення",
    text: "Дивимося на показники, тип житла, кількість мешканців, санвузли й сценарій використання.",
  },
  {
    icon: "osmosis",
    title: "Підбираємо обладнання Ecosoft",
    text: "Пропонуємо 1–2 моделі з обґрунтуванням — без зайвих вузлів і переплат.",
  },
  {
    icon: "wrench",
    title: "Монтаж під ключ",
    text: "Привозимо, монтуємо, налаштовуємо й передаємо систему вам у роботу.",
  },
  {
    icon: "gear",
    title: "Обслуговування і нагадування",
    text: "Нагадуємо про заміну картриджів і регенерацію засипок, виїжджаємо на сервіс за запитом.",
  },
];

const faqItems: FAQItem[] = [
  {
    q: "Як зрозуміти, яка система мені потрібна?",
    a: "Орієнтуємось на джерело води (водопровід, свердловина), тип житла й проблему, яку треба прибрати. Найкраще — надіслати аналіз води або заповнити форму консультації, і ми підкажемо 1–2 конкретні моделі.",
  },
  {
    q: "Чи потрібен аналіз води?",
    a: "Для зворотного осмосу під мийку в квартирі — необов'язково, ми відштовхуємось від типових показників водопроводу. Для будинку зі свердловиною або колодязем аналіз дуже бажаний: він показує жорсткість, залізо, манган і органіку — без цього легко переплатити або поставити невідповідну систему.",
  },
  {
    q: "Чим відрізняється зворотний осмос від комплексної системи?",
    a: "Зворотний осмос — це окремий фільтр під мийку для пиття та готування. Комплексна (колонна) система ставиться на вході в будинок і готує воду для всього житла: душа, сантехніки, техніки, бойлера. У більшості випадків їх ставлять разом: одна для дому, інша — для пиття.",
  },
  {
    q: "Чи можна встановити систему у квартирі?",
    a: "Так. Для квартири підходять компактні системи під мийку: зворотний осмос, CROSS або проточний фільтр. Магістральний фільтр на вході в квартиру теж можливий, але потребує місця на стояку.",
  },
  {
    q: "Як часто потрібно міняти картриджі?",
    a: "Картриджі попереднього очищення в осмосі — раз на 6–12 місяців, мембрана — раз на 2–3 роки, постфільтр — раз на рік. Для колонних систем — регенерація сіллю або реагентом за регламентом, заміна засипки — раз на 5–8 років. Точні терміни залежать від води та інтенсивності використання.",
  },
  {
    q: "Чи потрібне обслуговування комплексної системи?",
    a: "Так. Колонні системи регенеруються самостійно за розкладом, але треба підтримувати рівень солі або реагенту й періодично перевіряти клапан. Ми нагадуємо клієнтам про регламент і виїжджаємо на сервіс за потреби.",
  },
  {
    q: "Що робити, якщо у воді залізо або запах?",
    a: "Це класичний випадок для свердловинної води. Потрібна колонна система знезалізнення, інколи — з аерацією. Перед підбором обов'язково потрібен аналіз води, бо параметри сильно змінюють конфігурацію.",
  },
  {
    q: "Чи можна замовити монтаж?",
    a: "Так, монтаж — наша основна послуга разом з продажем. Для компактних систем монтаж займає 1–2 години, для колонних — 3–4 години. Працюємо у Києві та області, а для будинків з монтажем виїжджаємо по всій Україні.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* WATER PROBLEMS */}
      <section className="section section--tight" id="problems">
        <div className="container">
          <Reveal className="section__head">
            <h2 style={{ marginTop: 12 }}>Яку проблему з водою треба вирішити?</h2>
            <p>
              Оберіть знайому ситуацію — покажемо тип системи, який її закриває.
            </p>
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

      {/* SCENARIOS */}
      <section className="section section--tight" id="scenarios">
        <div className="container">
          <Reveal className="section__head">
            <h2 style={{ marginTop: 12 }}>А під який об'єкт потрібна система?</h2>
            <p>
              Оберіть тип житла — підкажемо, які системи Ecosoft зазвичай беруть
              для нього.
            </p>
          </Reveal>

          <div className="scenarios-grid">
            {scenarios.map((s, i) => (
              <Reveal className="scenario-card" key={s.title} delay={i * 40}>
                <span className="scenario-card__icon">
                  <Icon name={s.icon} size={24} />
                </span>
                <h3>{s.title}</h3>
                <p className="scenario-card__text">{s.text}</p>
                <p className="scenario-card__picks">
                  <span>Що зазвичай беруть:</span> {s.picks}
                </p>
                <Link href={s.href} className="scenario-card__cta">
                  Перейти до підбору
                  <Icon name="arrow" size={16} />
                </Link>
              </Reveal>
            ))}
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
                Відповідайте на кілька простих питань — підкажемо, яке рішення
                підходить саме вам.
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

      {/* HOW WE PICK */}
      <section className="section section--tight" id="how-we-pick">
        <div className="container">
          <Reveal className="section__head">
            <h2 style={{ marginTop: 12 }}>Як ми підбираємо систему</h2>
            <p>
              П'ять зрозумілих кроків — від запиту й аналізу води до сервісу
              після монтажу.
            </p>
          </Reveal>

          <ol className="howwework">
            {howWeWork.map((s, i) => (
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
                Після підбору системи спеціалісти допомагають з монтажем,
                налаштуванням і обслуговуванням. Вам не потрібно самостійно
                розбиратися в картриджах, підключеннях і регламенті заміни.
              </p>
              <Link href="/contacts" className="btn btn--lg">
                <Icon name="headset" />
                Запитати про монтаж
              </Link>
            </div>
            <ol className="service__steps">
              <li className="service-step">
                <span className="service-step__num">1</span>
                <span className="service-step__icon">
                  <Icon name="sparkle" size={22} />
                </span>
                <span className="service-step__body">
                  <span className="service-step__title">Підбір системи</span>
                  <span className="service-step__text">
                    Визначаємо рішення під вашу воду, житло та задачу.
                  </span>
                </span>
              </li>
              <li className="service-step">
                <span className="service-step__num">2</span>
                <span className="service-step__icon">
                  <Icon name="truck" size={22} />
                </span>
                <span className="service-step__body">
                  <span className="service-step__title">Доставка і монтаж</span>
                  <span className="service-step__text">
                    Привеземо, встановимо й налаштуємо систему під ключ.
                  </span>
                </span>
              </li>
              <li className="service-step">
                <span className="service-step__num">3</span>
                <span className="service-step__icon">
                  <Icon name="wrench" size={22} />
                </span>
                <span className="service-step__body">
                  <span className="service-step__title">Регулярний сервіс</span>
                  <span className="service-step__text">
                    Нагадаємо про заміну картриджів і підтримаємо систему.
                  </span>
                </span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="section section--tight" id="trust">
        <div className="container">
          <Reveal className="section__head">
            <h2 style={{ marginTop: 12 }}>Чому нам можна довіряти</h2>
            <p>
              Що саме ми робимо інакше — щоб ви не залишилися сам на сам зі
              своєю системою.
            </p>
          </Reveal>

          <div className="trust-grid">
            {[
              {
                icon: "shield" as const,
                title: "Офіційне обладнання Ecosoft",
                text: "Працюємо з повним каталогом виробника й оригінальними картриджами — а не випадковими аналогами.",
              },
              {
                icon: "flask" as const,
                title: "Підбираємо не на око",
                text: "Дивимося на ваш аналіз води, тип житла, кількість людей і санвузлів — і тільки потім пропонуємо систему.",
              },
              {
                icon: "question" as const,
                title: "Пояснюємо простими словами",
                text: "Різниця між лінійками, навіщо мінералізатор, як часто міняти картриджі — без технічного перевантаження.",
              },
              {
                icon: "wrench" as const,
                title: "Монтуємо та налаштовуємо",
                text: "Привозимо, підключаємо, перевіряємо тиск і регламент. Передаємо систему вам у роботу, а не в коробках.",
              },
              {
                icon: "headset" as const,
                title: "Допомагаємо після покупки",
                text: "Нагадаємо про заміну картриджів і регенерацію, виїдемо на сервіс, підкажемо, якщо щось змінилося у воді.",
              },
            ].map((b, i) => (
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

      {/* FAQ */}
      <section className="section section--tight" id="faq">
        <div className="container">
          <FAQ
            items={faqItems}
            subtitle="Якщо тут немає вашого запитання — напишіть, відповімо особисто."
          />
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
                Опишіть вашу воду, тип житла або надішліть аналіз — підкажемо,
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
      <QuizLink className="sticky-cta">
        <Icon name="sparkle" size={18} />
        Підібрати систему
      </QuizLink>
    </>
  );
}
