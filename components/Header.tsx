"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import Icon from "./Icon";

const nav = [
  { href: "/", label: "Головна" },
  { href: "/catalog", label: "Каталог" },
  { href: "/about", label: "Про нас" },
  { href: "/terms", label: "Оплата і доставка" },
  { href: "/contacts", label: "Контакти" },
];

export default function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link href="/" className="logo" aria-label="Ecosoft — на головну">
          <Image
            src="/ecosoft-logo.png"
            alt="Ecosoft"
            width={801}
            height={301}
            className="logo__img"
            priority
          />
        </Link>

        <nav className="nav">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav__link${
                isActive(item.href) ? " nav__link--active" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          <Link href="/#select" className="btn btn--sm header__cta">
            <Icon name="sparkle" />
            Підібрати систему
          </Link>
          <Link href="/cart" className="cart-button" aria-label="Кошик">
            <Icon name="drop" />
            <span className="cart-button__label">Кошик</span>
            {count > 0 && <span className="cart-button__badge">{count}</span>}
          </Link>
          <button
            className="burger"
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "arrow" : "menu"} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-nav">
          <div className="container">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`mobile-nav__link${
                  isActive(item.href) ? " mobile-nav__link--active" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/#select" className="btn btn--block mobile-nav__cta">
              <Icon name="sparkle" />
              Підібрати систему
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
