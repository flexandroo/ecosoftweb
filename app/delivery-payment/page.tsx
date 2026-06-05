import Link from "next/link";
import Icon, { IconName } from "@/components/Icon";

export const metadata = {
  title: "Доставка і оплата",
  description:
    "Способи доставки та оплати замовлень Ecosoft: Нова пошта, кур'єрська доставка, доставка обладнання з монтажем, картка, готівка, безготівковий розрахунок.",
};

type Block = { icon: IconName; title: string; text: string };

const delivery: Block[] = [
  {
    icon: "truck",
    title: "Нова пошта",
    text: "Картриджі, аксесуари і компактні системи відправляємо в день оформлення або наступного робочого дня — відділеннями та поштоматами по всій Україні.",
  },
  {
    icon: "wrench",
    title: "Доставка з монтажем",
    text: "Велике обладнання (осмос, колонні системи, магістральні фільтри) привозимо нашим транспортом разом з монтажною бригадою у погоджений день.",
  },
  {
    icon: "headset",
    title: "Кур'єрська доставка",
    text: "У межах Києва та області — кур'єром у зручний час. Для замовлень з монтажем кур'єрська доставка не використовується.",
  },
];

const payment: Block[] = [
  {
    icon: "award",
    title: "Картою на сайті",
    text: "Visa, Mastercard, Apple Pay, Google Pay — оплата через захищений шлюз банку. Підтвердження приходить одразу після оплати.",
  },
  {
    icon: "gear",
    title: "Безготівковий розрахунок",
    text: "Для юридичних осіб та ФОП — за реквізитами з виставленим рахунком і всіма закривальними документами.",
  },
  {
    icon: "shield",
    title: "Готівкою при отриманні",
    text: "Доступно при кур'єрській доставці у Києві або під час монтажу системи бригадою Ecosoft.",
  },
];

const steps = [
  "Ви оформлюєте замовлення на сайті або через менеджера.",
  "Менеджер уточнює деталі: адресу, дату, наявність монтажу, спосіб оплати.",
  "Замовлення збираємо й передаємо перевізнику або планує виїзд монтажної бригади.",
  "Ви отримуєте трек-номер або погоджуєте час монтажу.",
  "Після встановлення передаємо документи, гарантію і регламент обслуговування.",
];

export default function DeliveryPaymentPage() {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>Доставка і оплата</h1>
          <p>
            Як ми доставляємо й монтуємо обладнання та які способи оплати
            доступні.
          </p>
        </div>
      </div>

      <div className="container">
        <section className="content">
          <h2>Способи доставки</h2>
        </section>
        <div className="info-grid">
          {delivery.map((b) => (
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
          <h2>Способи оплати</h2>
        </section>
        <div className="info-grid">
          {payment.map((b) => (
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
          <h2>Що відбувається після оформлення замовлення</h2>
          <ol>
            {steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </section>

        <section className="content">
          <h2>Терміни</h2>
          <ul>
            <li>
              Обробка замовлення — у робочий час, зазвичай протягом 1–2 годин.
            </li>
            <li>
              Картриджі та компактні системи — відправлення в день замовлення
              або наступного робочого дня.
            </li>
            <li>
              Велике обладнання з монтажем — виїзд бригади за 2–5 робочих днів
              залежно від регіону.
            </li>
            <li>
              Для складних об'єктів (свердловина, котельня, кафе) дату виїзду
              узгоджуємо після короткої консультації.
            </li>
          </ul>
        </section>

        <section className="info-note">
          <p>
            Маєте складний випадок або потрібен монтаж за межами Києва? Напишіть
            або зателефонуйте — підкажемо терміни й вартість для вашого регіону.
          </p>
          <div className="info-note__actions">
            <Link href="/contacts" className="btn btn--lg">
              <Icon name="headset" />
              Зв'язатися з менеджером
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
