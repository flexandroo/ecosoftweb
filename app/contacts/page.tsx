import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Контакти",
};

export default function ContactsPage() {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>Контакти</h1>
          <p>Зв'яжіться з нами зручним способом</p>
        </div>
      </div>

      <div className="container">
        <div className="info-grid">
          <div className="info-card">
            <div className="info-card__icon">📞</div>
            <h3>Телефон</h3>
            <p>
              <a href="tel:+380443334455">+38 (044) 333-44-55</a>
              <br />
              <a href="tel:+380671234567">+38 (067) 123-45-67</a>
            </p>
          </div>
          <div className="info-card">
            <div className="info-card__icon">✉️</div>
            <h3>Email</h3>
            <p>
              <a href="mailto:info@ecosoft.example">info@ecosoft.example</a>
              <br />
              <a href="mailto:sales@ecosoft.example">sales@ecosoft.example</a>
            </p>
          </div>
          <div className="info-card">
            <div className="info-card__icon">📍</div>
            <h3>Адреса</h3>
            <p>
              м. Київ, вул. Прикладна, 1<br />
              Пн–Пт: 9:00–18:00
              <br />
              Сб: 10:00–15:00
            </p>
          </div>
        </div>

        <div className="checkout" style={{ marginBottom: 40 }}>
          <h3>Напишіть нам</h3>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
