import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Доставка і оплата",
  description:
    "Умови доставки та оплати: способи оплати, варіанти доставки по Україні, терміни та витрати.",
};

export default function DeliveryPaymentPage() {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>Доставка і оплата</h1>
          <p>Способи оплати, варіанти доставки та терміни.</p>
        </div>
      </div>

      <div className="container">
        <div className="info-grid">
          <div className="info-card">
            <div className="info-card__icon">
              <Icon name="truck" />
            </div>
            <h3>Доставка</h3>
            <p>
              Доставляємо по всій Україні Новою поштою або власним кур'єром
              у межах Києва та області. Деталі та терміни — за погодженням з
              менеджером після оформлення замовлення.
            </p>
          </div>
          <div className="info-card">
            <div className="info-card__icon">
              <Icon name="award" />
            </div>
            <h3>Оплата</h3>
            <p>
              Готівкою при отриманні, карткою на сайті чи при доставці,
              безготівковий розрахунок для юридичних осіб. Для великих
              замовлень доступна часткова передоплата.
            </p>
          </div>
          <div className="info-card">
            <div className="info-card__icon">
              <Icon name="wrench" />
            </div>
            <h3>Монтаж під ключ</h3>
            <p>
              За окремим запитом — доставка з монтажем і налаштуванням
              системи. Спеціаліст приїжджає у зручний для вас час.
            </p>
          </div>
        </div>

        <div className="info-note">
          <p>
            Розділ оновлюється — детальні тарифи та умови буде розміщено
            найближчим часом. Якщо потрібна інформація саме зараз,
            зв'яжіться з нами:
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
        </div>
      </div>
    </>
  );
}
