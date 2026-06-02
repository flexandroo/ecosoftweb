import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Контакти",
};

export default function ContactsPage() {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>Контакти</h1>
          <p>
            Зв'яжіться з нами зручним способом — підкажемо рішення та
            проконсультуємо щодо підбору системи.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="info-grid">
          <div className="info-card">
            <div className="info-card__icon">
              <Icon name="phone" />
            </div>
            <h3>Телефон</h3>
            <p>
              <a href="tel:+380800000000">0 800 00 00 00</a>
              <br />
              Безкоштовно по Україні
            </p>
          </div>
          <div className="info-card">
            <div className="info-card__icon">
              <Icon name="mail" />
            </div>
            <h3>Email</h3>
            <p>
              <a href="mailto:info@ecosoft.ua">info@ecosoft.ua</a>
              <br />
              <a href="mailto:sales@ecosoft.ua">sales@ecosoft.ua</a>
            </p>
          </div>
          <div className="info-card">
            <div className="info-card__icon">
              <Icon name="clock" />
            </div>
            <h3>Графік роботи</h3>
            <p>
              Пн–Пт: 9:00–18:00
              <br />
              Сб: 10:00–15:00
              <br />
              Нд: вихідний
            </p>
          </div>
        </div>

        <div className="checkout" style={{ marginBottom: 48 }}>
          <h3>Отримати консультацію</h3>
          <p style={{ color: "var(--muted)", marginBottom: 20 }}>
            Залиште заявку — менеджер зв'яжеться з вами та допоможе підібрати
            систему під вашу воду.
          </p>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
