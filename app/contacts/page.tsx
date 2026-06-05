import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Контакти",
  description:
    "Контакти Ecosoft: телефон, email, графік роботи. Залиште заявку — підкажемо рішення під вашу воду.",
};

export default function ContactsPage() {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>Контакти</h1>
          <p>
            Зв'яжіться з нами зручним способом — підкажемо рішення та
            проконсультуємо щодо підбору системи очищення води.
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
              <a href="tel:+380800301525">0 800 30 15 25</a>
              <br />
              Безкоштовно зі стаціонарних і мобільних в Україні
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
              Відповідаємо у робочі години
            </p>
          </div>
          <div className="info-card">
            <div className="info-card__icon">
              <Icon name="pin" />
            </div>
            <h3>Регіон роботи</h3>
            <p>
              Україна, Київ
              <br />
              Доставка та монтаж по всій Україні
            </p>
          </div>
          <div className="info-card">
            <div className="info-card__icon">
              <Icon name="clock" />
            </div>
            <h3>Графік роботи</h3>
            <p>
              Пн–Пт: 09:00–18:00
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
            Опишіть проблему з водою або надішліть аналіз — ми підкажемо, яка
            система підійде саме вам.
          </p>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
