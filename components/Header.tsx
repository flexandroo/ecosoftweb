"use client";

import Link from "next/link";
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
        <Link href="/" className="logo">
          <span className="logo__mark">
            <Icon name="drop" />
          </span>
          <span className="logo__text">
            Eco<strong>soft</strong>
          </span>
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
