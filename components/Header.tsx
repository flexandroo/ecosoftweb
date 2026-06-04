"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartContext";
import Icon from "./Icon";

type NavLink = { href: string; label: string };
type NavGroup = { label: string; children: NavLink[] };
type NavItem = NavLink | NavGroup;

const nav: NavItem[] = [
  { href: "/catalog", label: "Каталог" },
  { href: "/schemes", label: "Схеми" },
  { href: "/#service", label: "Сервіс" },
  { href: "/delivery-payment", label: "Доставка і оплата" },
  { href: "/returns-exchange", label: "Повернення та обмін" },
  { href: "/about", label: "Про нас" },
  { href: "/contacts", label: "Контакти" },
];

const isGroup = (it: NavItem): it is NavGroup =>
  (it as NavGroup).children !== undefined;

export default function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const groupRef = useRef<HTMLDivElement | null>(null);

  // Close mobile menu and any open dropdown on route change.
  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Click-outside closes the dropdown.
  useEffect(() => {
    if (!openGroup) return;
    const onDown = (e: MouseEvent) => {
      if (
        groupRef.current &&
        !groupRef.current.contains(e.target as Node)
      ) {
        setOpenGroup(null);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [openGroup]);

  const isActive = (href: string) => {
    const base = href.split("?")[0].split("#")[0];
    if (base === "/catalog" && href.includes("?")) return false;
    if (base === "/") return pathname === "/";
    if (!base) return false;
    return pathname === base || pathname.startsWith(base + "/");
  };

  const isGroupActive = (group: NavGroup) =>
    group.children.some((c) => isActive(c.href));

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
          {nav.map((item) => {
            if (isGroup(item)) {
              const isOpen = openGroup === item.label;
              const isActiveGroup = isGroupActive(item);
              return (
                <div
                  key={item.label}
                  className="nav__group"
                  ref={isOpen ? groupRef : undefined}
                >
                  <button
                    type="button"
                    className={`nav__link nav__group-toggle${
                      isActiveGroup ? " nav__link--active" : ""
                    }${isOpen ? " is-open" : ""}`}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenGroup(isOpen ? null : item.label)
                    }
                  >
                    {item.label}
                    <Icon name="arrow" size={14} className="nav__caret" />
                  </button>
                  {isOpen && (
                    <div className="nav__dropdown" role="menu">
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          role="menuitem"
                          className={`nav__dropdown-link${
                            isActive(c.href)
                              ? " nav__dropdown-link--active"
                              : ""
                          }`}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav__link${
                  isActive(item.href) ? " nav__link--active" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
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
            {nav.map((item) => {
              if (isGroup(item)) {
                return (
                  <div className="mobile-nav__group" key={item.label}>
                    <span className="mobile-nav__group-title">
                      {item.label}
                    </span>
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={`mobile-nav__link mobile-nav__link--sub${
                          isActive(c.href) ? " mobile-nav__link--active" : ""
                        }`}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`mobile-nav__link${
                    isActive(item.href) ? " mobile-nav__link--active" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
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
