import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__col">
          <div className="logo logo--footer">
            <span className="logo__drop">💧</span>
            <span className="logo__text">
              Eco<strong>soft</strong>
            </span>
          </div>
          <p className="footer__about">
            Системи очищення води для дому, офісу та виробництва. Чиста вода —
            щодня.
          </p>
        </div>

        <div className="footer__col">
          <h4>Навігація</h4>
          <Link href="/catalog">Каталог</Link>
          <Link href="/about">Про нас</Link>
          <Link href="/terms">Умови праці</Link>
          <Link href="/contacts">Контакти</Link>
        </div>

        <div className="footer__col">
          <h4>Контакти</h4>
          <a href="tel:+380443334455">+38 (044) 333-44-55</a>
          <a href="mailto:info@ecosoft.example">info@ecosoft.example</a>
          <span>м. Київ, вул. Прикладна, 1</span>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          © {new Date().getFullYear()} Ecosoft. Усі права захищено.
        </div>
      </div>
    </footer>
  );
}
