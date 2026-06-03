import Link from "next/link";
import Image from "next/image";
import Icon from "./Icon";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__col footer__col--brand">
          <div className="logo">
            <Image
              src="/ecosoft-logo.png"
              alt="Ecosoft"
              width={900}
              height={226}
              className="logo__img logo__img--chip"
            />
          </div>
          <p className="footer__about">
            Підбираємо, встановлюємо та обслуговуємо системи очищення води для
            квартири, будинку, офісу та бізнесу.
          </p>
          <a href="tel:+380800000000" className="footer__phone">
            <Icon name="phone" size={18} />0 800 00 00 00
          </a>
        </div>

        <div className="footer__col">
          <h4>Каталог</h4>
          <Link href="/catalog?category=reverse-osmosis">Зворотний осмос</Link>
          <Link href="/catalog?category=flow-filters">Проточні фільтри</Link>
          <Link href="/catalog?category=mainline-filters">
            Магістральні фільтри
          </Link>
          <Link href="/catalog">Усі товари</Link>
        </div>

        <div className="footer__col">
          <h4>Рішення</h4>
          <Link href="/catalog?category=reverse-osmosis">Для квартири</Link>
          <Link href="/catalog?category=filtration-systems">Для будинку</Link>
          <Link href="/catalog?category=filtration-systems&subcategory=fs-softening">
            Пом'якшення води
          </Link>
          <Link href="/#quiz">Підбір за 1 хвилину</Link>
        </div>

        <div className="footer__col">
          <h4>Сервіс</h4>
          <Link href="/#service">Монтаж під ключ</Link>
          <Link href="/contacts">Консультація</Link>
          <Link href="/terms">Оплата і доставка</Link>
          <Link href="/about">Про нас</Link>
        </div>

        <div className="footer__col">
          <h4>Контакти</h4>
          <a href="tel:+380800000000">
            <Icon name="phone" />0 800 00 00 00
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
