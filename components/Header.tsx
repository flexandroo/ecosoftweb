"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";

const nav = [
  { href: "/", label: "Головна" },
  { href: "/catalog", label: "Каталог" },
  { href: "/about", label: "Про нас" },
  { href: "/terms", label: "Умови праці" },
  { href: "/contacts", label: "Контакти" },
];

export default function Header() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <header className="header">
      <div className="container header__inner">
        <Link href="/" className="logo">
          <span className="logo__drop">💧</span>
          <span className="logo__text">
            Eco<strong>soft</strong>
          </span>
        </Link>

        <nav className="nav">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav__link${active ? " nav__link--active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/cart" className="cart-button" aria-label="Кошик">
          🛒 Кошик
          {count > 0 && <span className="cart-button__badge">{count}</span>}
        </Link>
      </div>
    </header>
  );
}
