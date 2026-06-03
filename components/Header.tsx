"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import Icon from "./Icon";

const nav = [
  { href: "/catalog", label: "Каталог" },
  { href: "/catalog?category=reverse-osmosis", label: "Для квартири" },
  { href: "/catalog?category=filtration-systems", label: "Для будинку" },
  { href: "/#service", label: "Сервіс" },
  { href: "/contacts", label: "Контакти" },
];

export default function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    const base = href.split("?")[0].split("#")[0];
    if (base === "/catalog" && href.includes("?")) return false;
    if (base === "/") return pathname === "/";
    if (!base) return false;
    return pathname === base || pathname.startsWith(base + "/");
  };

  return (
    <header className={`header${scrolled ? " header--scrolled" : ""}`}>
      <div className="container header__inner">
        <Link href="/" className="logo" aria-label="Ecosoft — на головну">
          <Image
            src="/ecosoft-logo.png"
            alt="Ecosoft"
            width={900}
            height={226}
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
          <a href="tel:+380800000000" className="header__phone">
            <Icon name="phone" size={18} />
            <span>0 800 00 00 00</span>
          </a>
          <Link href="/#quiz" className="btn btn--sm header__cta">
            <Icon name="sparkle" />
            Підібрати систему
          </Link>
          <Link href="/cart" className="cart-button" aria-label="Кошик">
            <Icon name="jug" size={20} />
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
            <Link href="/#quiz" className="btn btn--block mobile-nav__cta">
              <Icon name="sparkle" />
              Підібрати систему
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
