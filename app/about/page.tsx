import Link from "next/link";
import Icon, { IconName } from "@/components/Icon";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Про нас",
  description:
    "Підбираємо надійні системи очищення води Ecosoft для дому, бізнесу та комерційних об'єктів. Допомагаємо обрати, встановити та обслуговувати рішення під вашу воду.",
};

type Card = { icon: IconName; title: string; text: string };

const audiences: Card[] = [
  {
    icon: "building",
    title: "Квартири",
    text: "Компактні системи під мийку для пиття, готування та щоденних побутових потреб.",
  },
  {
    icon: "home",
    title: "Приватні будинки",
    text: "Комплексне очищення на вході в будинок — захист сантехніки, бойлера й техніки.",
  },
  {
    icon: "gear",
    title: "Офіси",
    text: "Тиха фонова робота, стабільна вода для кави, чаю та кулерів у переговорних.",
  },
  {
    icon: "award",
    title: "Кав'ярні та ресторани",
    text: "Підготовка води під кавомашини, пароконвектомати й льодогенератори без сюрпризів.",
  },
  {
    icon: "shield",
    title: "Комерційні об'єкти",
    text: "Готелі, торгові центри, медичні заклади — рішення з обліковим режимом і сервісом.",
  },
  {
    icon: "wrench",
    title: "Невеликі виробництва",
    text: "Технологічна вода для процесів, де якість і стабільні параметри критично важливі.",
  },
];

const reasons: Card[] = [
  {
    icon: "flask",
    title: "Підбір під реальні умови",
    text: "Дивимось на ваш аналіз води, тип об'єкта і сценарій використання — не пропонуємо «універсальних» систем.",
  },
  {
    icon: "shield",
    title: "Перевірене обладнання Ecosoft",
    text: "Працюємо з оригінальними системами, мембранами та картриджами українського виробника з 1991 року.",
  },
  {
    icon: "question",
    title: "Просте пояснення без термінів",
    text: "Різниця між лінійками, навіщо мінералізатор, як змінювати картриджі — людською мовою.",
  },
  {
    icon: "headset",
    title: "Підтримка після покупки",
    text: "Нагадуємо про регламент, виїжджаємо на сервіс, допомагаємо з оригінальними змінними елементами.",
  },
];

const steps = [
  {
    title: "Аналізуємо задачу",
    text: "Тип об'єкта, джерело води, аналіз або опис проблеми — без цього не пропонуємо рішення.",
  },
  {
    title: "Підбираємо рішення",
    text: "Конкретна модель або зв'язка систем під вашу воду, кількість людей і санвузлів.",
  },
  {
    title: "Пояснюємо різницю",
    text: "Показуємо, чому саме ця конфігурація — і що вона дасть у щоденному використанні.",
  },
  {
    title: "Підтримуємо після покупки",
    text: "Монтаж, налаштування, регламент і сервіс — щоб система працювала роками.",
  },
];

export default function AboutPage() {
  return (
    <div className="about">
      {/* Hero */}
      <section className="about-hero">
        <div className="container about-hero__inner">
          <Reveal className="about-hero__content">
            <span className="about-hero__eyebrow">Про нас</span>
            <h1 className="about-hero__title">
              Підбираємо надійні системи очищення води для дому, бізнесу та
              комерційних об'єктів
            </h1>
            <p className="about-hero__lead">
              Допомагаємо обрати правильну систему очищення води, виконуємо
              монтаж і супроводжуємо її сервісно. Працюємо з обладнанням
              українського виробника <strong>Ecosoft</strong>, який розвиває
              напрямок водопідготовки з 1991 року.
            </p>
            <div className="about-hero__actions">
              <Link href="/contacts" className="about-btn about-btn--primary">
                <Icon name="headset" />
                Отримати консультацію
              </Link>
            </div>
          </Reveal>

          <div className="about-hero__visual" aria-hidden="true">
            <span className="about-hero__ring about-hero__ring--1" />
            <span className="about-hero__ring about-hero__ring--2" />
            <span className="about-hero__ring about-hero__ring--3" />
            <span className="about-hero__drop">
              <Icon name="drop" size={84} />
            </span>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Хто ми */}
        <section className="about-section">
          <Reveal className="about-section__head about-section__head--narrow">
            <span className="about-eyebrow">Хто ми</span>
            <h2>Партнер з підбору і сервісу систем Ecosoft</h2>
          </Reveal>
          <Reveal className="about-prose">
            <p>
              Ми не виробник, а команда, яка щодня допомагає клієнтам обрати
              правильне обладнання для очищення води, привезти, встановити та
              обслуговувати його. Наш фокус — не великий каталог заради
              каталогу, а рішення, яке справді закриває проблему з водою у
              конкретному об'єкті.
            </p>
            <p>
              Працюємо з обладнанням{" "}
              <strong>Ecosoft</strong> — українського виробника систем
              водопідготовки, заснованого <strong>1991 року</strong>. У них
              власне виробництво, сертифікація й сервісна мережа. Ми, своєю
              чергою, відповідаємо за грамотний підбір, монтаж під ключ і
              супровід після покупки.
            </p>
          </Reveal>
        </section>

        {/* Для кого ми працюємо */}
        <section className="about-section">
          <Reveal className="about-section__head">
            <span className="about-eyebrow">Для кого ми працюємо</span>
            <h2>Шість типових сценаріїв</h2>
            <p>
              Кожен об'єкт має свої умови — джерело води, об'єм споживання,
              задачі. Ми працюємо з усіма основними категоріями.
            </p>
          </Reveal>

          <div className="about-grid about-grid--3">
            {audiences.map((c, i) => (
              <Reveal className="about-card" key={c.title} delay={i * 40}>
                <span className="about-card__icon">
                  <Icon name={c.icon} size={22} />
                </span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Чому обирають нас */}
        <section className="about-section">
          <Reveal className="about-section__head">
            <span className="about-eyebrow">Чому обирають нас</span>
            <h2>Чотири причини довіряти підбір саме нам</h2>
          </Reveal>

          <div className="about-grid about-grid--4">
            {reasons.map((c, i) => (
              <Reveal className="about-card" key={c.title} delay={i * 40}>
                <span className="about-card__icon">
                  <Icon name={c.icon} size={22} />
                </span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Наш підхід */}
        <section className="about-section">
          <Reveal className="about-section__head">
            <span className="about-eyebrow">Наш підхід</span>
            <h2>Чотири кроки від запиту до сервісу</h2>
          </Reveal>

          <ol className="about-steps">
            {steps.map((s, i) => (
              <Reveal className="about-step" key={s.title} delay={i * 50}>
                <span className="about-step__num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* Що для нас важливо */}
        <section className="about-section">
          <Reveal className="about-section__head about-section__head--narrow">
            <span className="about-eyebrow">Що для нас важливо</span>
            <h2>Якісна вода — це спокій, здоров'я і стабільність</h2>
          </Reveal>
          <Reveal className="about-values">
            <div className="about-values__row">
              <span className="about-values__icon">
                <Icon name="shield" size={20} />
              </span>
              <div>
                <h4>Комфорт у щоденному житті</h4>
                <p>
                  Смачна питна вода, відсутність накипу, м'якша шкіра після
                  душу — речі, які помічаєш, коли вони перестають дратувати.
                </p>
              </div>
            </div>
            <div className="about-values__row">
              <span className="about-values__icon">
                <Icon name="drop" size={20} />
              </span>
              <div>
                <h4>Здоров'я родини</h4>
                <p>
                  Вода, у якій ви впевнені, — для пиття, готування й купання
                  дітей.
                </p>
              </div>
            </div>
            <div className="about-values__row">
              <span className="about-values__icon">
                <Icon name="gear" size={20} />
              </span>
              <div>
                <h4>Захист обладнання</h4>
                <p>
                  Бойлер, посудомийна, кавомашина, сантехніка — все це служить
                  довше, коли вода підготовлена.
                </p>
              </div>
            </div>
            <div className="about-values__row">
              <span className="about-values__icon">
                <Icon name="award" size={20} />
              </span>
              <div>
                <h4>Стабільність для бізнесу</h4>
                <p>
                  Передбачувана якість води — це передбачуваний смак напоїв,
                  ресурс техніки та задоволені гості.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Final CTA */}
        <section className="about-cta">
          <div className="about-cta__text">
            <h2>Не знаєте, яка система підійде саме вам?</h2>
            <p>
              Залиште заявку — ми допоможемо підібрати рішення під вашу воду,
              бюджет і тип об'єкта.
            </p>
          </div>
          <div className="about-cta__actions">
            <Link href="/contacts" className="about-btn about-btn--accent">
              Підібрати систему очищення води
              <Icon name="arrow" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
