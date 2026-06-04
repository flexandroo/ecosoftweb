import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Повернення та обмін",
  description:
    "Умови повернення та обміну товарів Ecosoft: терміни, документи, процедура звернення.",
};

export default function ReturnsExchangePage() {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>Повернення та обмін</h1>
          <p>Терміни, умови та процедура повернення або обміну товару.</p>
        </div>
      </div>

      <div className="container">
        <div className="info-grid">
          <div className="info-card">
            <div className="info-card__icon">
              <Icon name="shield" />
            </div>
            <h3>14 днів на повернення</h3>
            <p>
              Товар належної якості можна повернути впродовж 14 днів від
              моменту отримання, якщо він не був у використанні та збережено
              товарний вигляд і пакування.
            </p>
          </div>
          <div className="info-card">
            <div className="info-card__icon">
              <Icon name="wrench" />
            </div>
            <h3>Гарантійні випадки</h3>
            <p>
              За дефекту або несправності системи протягом гарантійного
              терміну — заміна, ремонт або повернення коштів за рішенням
              сервісного центру.
            </p>
          </div>
          <div className="info-card">
            <div className="info-card__icon">
              <Icon name="headset" />
            </div>
            <h3>Як звернутися</h3>
            <p>
              Зв'яжіться з нашим менеджером телефоном або через форму на
              сторінці контактів — підкажемо процедуру й допоможемо
              підготувати потрібні документи.
            </p>
          </div>
        </div>

        <div className="info-note">
          <p>
            Розділ оновлюється — повний регламент повернення та обміну буде
            розміщено найближчим часом. Якщо потрібна інформація саме зараз,
            зв'яжіться з нами:
          </p>
          <div className="info-note__actions">
            <Link href="/contacts" className="btn btn--lg">
              <Icon name="headset" />
              Зв'язатися з менеджером
            </Link>
            <Link href="/terms" className="btn btn--lg btn--outline">
              Загальні умови
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
