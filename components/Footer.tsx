import Link from "next/link";
import Image from "next/image";
import Icon from "./Icon";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__col">
          <div className="logo">
            <Image
              src="/ecosoft-logo.png"
              alt="Ecosoft"
              width={801}
              height={301}
              className="logo__img logo__img--chip"
            />
          </div>
          <p className="footer__about">
            Системи очищення води для дому, квартири, офісу та виробництва.
            Підбираємо рішення під вашу воду та встановлюємо під ключ.
          </p>
        </div>

        <div className="footer__col">
          <h4>Навігація</h4>
          <Link href="/catalog">Каталог</Link>
          <Link href="/about">Про нас</Link>
          <Link href="/terms">Оплата і доставка</Link>
          <Link href="/contacts">Контакти</Link>
        </div>

        <div className="footer__col">
          <h4>Рішення</h4>
          <Link href="/catalog?category=reverse-osmosis">Зворотний осмос</Link>
          <Link href="/catalog?category=filter-jugs">Фільтри-глечики</Link>
          <Link href="/catalog?category=mainline-filters">
            Магістральні фільтри
          </Link>
          <Link href="/catalog?category=softeners">Пом'якшення води</Link>
        </div>

        <div className="footer__col">
          <h4>Контакти</h4>
          <a href="tel:+380800000000">
            <Icon name="phone" />
            0 800 00 00 00
          </a>
          <a href="mailto:info@ecosoft.ua">
            <Icon name="mail" />
            info@ecosoft.ua
          </a>
          <span>
            <Icon name="pin" />
            Київ, Україна
          </span>
          <span>
            <Icon name="clock" />
            Пн–Пт 9:00–18:00
          </span>
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
