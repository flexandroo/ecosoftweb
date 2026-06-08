"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Icon from "./Icon";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

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
            Підбираємо, встановлюємо та обслуговуємо системи очищення води Ecosoft
            для квартири, будинку, офісу та бізнесу. Працюємо з аналізом води та
            монтажем під ключ.
          </p>
          <a href="tel:+380800301525" className="footer__phone">
            <Icon name="phone" size={18} />0 800 30 15 25
          </a>
          <p className="footer__sub-label">Поради та новини на пошту</p>
          <form
            className="footer__subscribe"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              setDone(true);
              setEmail("");
            }}
          >
            <input
              type="email"
              required
              placeholder="ваш@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email для розсилки"
            />
            <button type="submit" aria-label="Підписатися">
              <Icon name="arrow" />
            </button>
          </form>
          {done && (
            <p className="footer__sub-ok">Дякуємо! Ми додамо вас до розсилки.</p>
          )}
        </div>

        <div className="footer__col">
          <h4>Каталог</h4>
          <Link href="/catalog?category=reverse-osmosis">Зворотний осмос</Link>
          <Link href="/catalog?category=flow-filters">Проточні фільтри</Link>
          <Link href="/catalog?category=filtration-systems">
            Системи для будинку
          </Link>
          <Link href="/catalog?category=mainline-filters">
            Магістральні фільтри
          </Link>
          <Link href="/catalog?category=ro-cartridges">Картриджі</Link>
          <Link href="/catalog">Усі товари</Link>
        </div>

        <div className="footer__col">
          <h4>Сайт</h4>
          <Link href="/">Головна</Link>
          <Link href="/about">Про нас</Link>
          <Link href="/contacts">Контакти</Link>
        </div>

        <div className="footer__col">
          <h4>Покупцю</h4>
          <Link href="/delivery-payment">Доставка і оплата</Link>
          <Link href="/returns-exchange">Повернення та обмін</Link>
          <Link href="/privacy">Політика конфіденційності</Link>
          <Link href="/contacts">Замовити консультацію</Link>
        </div>

        <div className="footer__col">
          <h4>Контакти</h4>
          <a href="tel:+380800301525">
            <Icon name="phone" />0 800 30 15 25
          </a>
          <a href="mailto:info@ecosoft.ua">
            <Icon name="mail" />
            info@ecosoft.ua
          </a>
          <span>
            <Icon name="pin" />
            Україна, Київ
          </span>
          <span>
            <Icon name="clock" />
            Пн–Пт 09:00–18:00
          </span>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© {new Date().getFullYear()} Ecosoft. Усі права захищено.</span>
          <span className="footer__cookies">
            Використовуючи сайт, ви погоджуєтеся зі збором cookie для роботи
            сервісу та аналітики.
          </span>
        </div>
      </div>
    </footer>
  );
}
