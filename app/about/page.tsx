import Link from "next/link";
import Icon, { IconName } from "@/components/Icon";

export const metadata = {
  title: "Про нас",
  description:
    "Ecosoft — підбір, монтаж і сервіс систем очищення води з 2003 року. Власне виробництво, рішення для квартир, будинків і бізнесу.",
};

const stats = [
  { num: "з 2003", label: "року на ринку водоочищення" },
  { num: "1 000 000+", label: "клієнтів в Україні та за кордоном" },
  { num: "99,8%", label: "ступінь очищення зворотним осмосом" },
  { num: "176+", label: "моделей у каталозі" },
];

type Block = { icon: IconName; title: string; text: string };

const whatWeDo: Block[] = [
  {
    icon: "flask",
    title: "Підбираємо рішення",
    text: "Аналізуємо якість води, тип житла, кількість мешканців і санвузлів. Жодних «універсальних» порад без розуміння вашої ситуації.",
  },
  {
    icon: "osmosis",
    title: "Продаємо обладнання Ecosoft",
    text: "Працюємо з повним каталогом: зворотний осмос, проточні фільтри, магістральні корпуси, колонні системи, картриджі та засипки.",
  },
  {
    icon: "wrench",
    title: "Монтуємо під ключ",
    text: "Доставляємо, підключаємо, налаштовуємо й пояснюємо, як користуватися. Ви отримуєте робочу систему, а не коробку з деталями.",
  },
  {
    icon: "headset",
    title: "Обслуговуємо",
    text: "Нагадуємо про планову заміну картриджів, регенерацію засипок, виїжджаємо на сервіс і консультуємо весь термін експлуатації.",
  },
];

const howWePick = [
  "Запитуємо про джерело: міський водопровід, свердловина чи колодязь.",
  "Дивимося на аналіз води — якщо немає, підкажемо, де і як його зробити.",
  "Враховуємо тип житла, кількість мешканців і санвузлів.",
  "Підбираємо етапи очищення: механіка → пом'якшення → знезалізнення → доочищення.",
  "Пропонуємо 1–2 конкретні моделі з обґрунтуванням.",
];

const trust: Block[] = [
  {
    icon: "shield",
    title: "Офіційна продукція Ecosoft",
    text: "Сертифіковане обладнання та оригінальні картриджі — не випадкові аналоги.",
  },
  {
    icon: "award",
    title: "Власне виробництво",
    text: "Контроль якості від мембрани й корпусу до фінальної збірки системи.",
  },
  {
    icon: "gear",
    title: "Гарантія від виробника",
    text: "До 5 років на системи зворотного осмосу та колонні фільтри.",
  },
  {
    icon: "truck",
    title: "Доставка і монтаж по Україні",
    text: "Працюємо у всіх регіонах — від однієї системи до проектного оснащення об'єкта.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>Про компанію Ecosoft</h1>
          <p>
            Підбираємо, продаємо, монтуємо й обслуговуємо системи очищення води
            для квартир, приватних будинків і бізнесу. З 2003 року.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat__num">{s.num}</div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>

        <section className="content">
          <h2>Що ми робимо</h2>
          <p>
            Робота з водою починається не з товару, а із запиту: яка у вас вода,
            яке житло, які проблеми треба прибрати. Тільки після цього починаємо
            пропонувати конкретні системи. Це наш стандарт.
          </p>
        </section>

        <div className="info-grid info-grid--4">
          {whatWeDo.map((b) => (
            <div className="info-card" key={b.title}>
              <div className="info-card__icon">
                <Icon name={b.icon} />
              </div>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </div>
          ))}
        </div>

        <section className="content">
          <h2>Як ми підбираємо рішення</h2>
          <p>
            Підбір не «на око», а від конкретних даних. Це робить систему
            передбачуваною: правильні етапи очищення, реалістичний ресурс
            картриджів, відсутність переплати за зайве обладнання.
          </p>
          <ol>
            {howWePick.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="content">
          <h2>Монтаж і сервіс</h2>
          <p>
            Привеземо систему, виконаємо монтаж і налаштування, пояснимо
            регламент обслуговування. У більшості випадків монтаж займає від 1
            до 4 годин. Далі — нагадування про заміну картриджів, регенерацію
            засипок і виїзд сервісного спеціаліста за потреби.
          </p>
        </section>

        <section className="content">
          <h2>Чому обирають Ecosoft</h2>
          <div
            className="info-grid info-grid--4"
            style={{ marginTop: 4, marginBottom: 0 }}
          >
            {trust.map((b) => (
              <div className="info-card" key={b.title}>
                <div className="info-card__icon">
                  <Icon name={b.icon} />
                </div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="info-note">
          <p>
            Хочете перевірити, яка система підходить саме вам? Опишіть джерело
            води або надішліть аналіз — підкажемо рішення без зайвих витрат.
          </p>
          <div className="info-note__actions">
            <Link href="/contacts" className="btn btn--lg">
              <Icon name="headset" />
              Отримати консультацію
            </Link>
            <Link href="/catalog" className="btn btn--lg btn--outline">
              До каталогу
              <Icon name="arrow" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
