import Link from "next/link";
import Icon, { IconName } from "@/components/Icon";

export const metadata = {
  title: "Повернення та обмін",
  description:
    "Умови повернення та обміну товарів Ecosoft: терміни, процедура, гарантійні випадки, як діяти при пошкодженні товару.",
};

type Block = { icon: IconName; title: string; text: string };

const cases: Block[] = [
  {
    icon: "shield",
    title: "Товар не підійшов",
    text: "Можете повернути впродовж 14 днів від моменту отримання, якщо товар не був у використанні та збережено товарний вигляд, пломби й оригінальну упаковку.",
  },
  {
    icon: "wrench",
    title: "Гарантійний випадок",
    text: "Якщо обладнання вийшло з ладу у межах гарантійного терміну — заміна, ремонт або повернення коштів за рішенням сервісного центру Ecosoft.",
  },
  {
    icon: "truck",
    title: "Товар пошкоджений під час доставки",
    text: "Зафіксуйте пошкодження у присутності кур'єра або у відділенні Нової пошти, надішліть фото менеджеру — заміну надсилаємо без додаткової оплати.",
  },
];

const procedure = [
  "Зв'яжіться з менеджером телефоном 0 800 30 15 25 або поштою info@ecosoft.ua.",
  "Надайте номер замовлення та коротко опишіть причину повернення.",
  "Узгодьте з менеджером спосіб повернення (Нова пошта, кур'єр або самовивіз).",
  "Передайте товар у комплектації, отриманій від нас, разом з документами.",
  "Дочекайтеся перевірки технічного стану — зазвичай це 1–3 робочих дні.",
  "Кошти повертаємо тим самим способом, яким була здійснена оплата.",
];

const notReturnable = [
  "Використане обладнання з порушеною герметичністю або картриджі без оригінальної упаковки.",
  "Засипки й реагенти у відкритих мішках.",
  "Товари, виготовлені або сконфігуровані під індивідуальний об'єкт.",
];

export default function ReturnsExchangePage() {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>Повернення та обмін</h1>
          <p>
            Умови повернення, обміну та дій у гарантійних випадках.
          </p>
        </div>
      </div>

      <div className="container">
        <section className="content">
          <h2>Коли можна повернути або обміняти товар</h2>
        </section>
        <div className="info-grid">
          {cases.map((b) => (
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
          <h2>Процедура повернення</h2>
          <ol>
            {procedure.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </section>

        <section className="content">
          <h2>Що повернути не вийде</h2>
          <p>
            Згідно з постановою КМУ № 172 (товари належної якості, які не
            підлягають обміну), не приймаємо назад:
          </p>
          <ul>
            {notReturnable.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p>
            Якщо сумніваєтеся, чи підійде вам конкретна система, краще обговорити
            це з консультантом до оформлення замовлення.
          </p>
        </section>

        <section className="info-note">
          <p>
            Не впевнені, що товар вам підходить? Розкажіть про вашу воду й тип
            житла — менеджер допоможе обрати правильно з першого разу.
          </p>
          <div className="info-note__actions">
            <Link href="/contacts" className="btn btn--lg">
              <Icon name="headset" />
              Проконсультуватися перед замовленням
            </Link>
            <Link href="/delivery-payment" className="btn btn--lg btn--outline">
              Умови доставки
              <Icon name="arrow" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
