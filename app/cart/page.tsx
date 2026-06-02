"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { products, formatPrice, getCategory } from "@/lib/products";
import Icon from "@/components/Icon";

export default function CartPage() {
  const { items, setQty, remove, total, clear } = useCart();
  const [submitted, setSubmitted] = useState(false);

  const rows = items
    .map((i) => {
      const product = products.find((p) => p.id === i.id);
      return product ? { product, qty: i.qty } : null;
    })
    .filter(Boolean) as { product: (typeof products)[number]; qty: number }[];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Skeleton checkout: no backend yet. Mark order as "placed" locally.
    setSubmitted(true);
    clear();
  }

  if (submitted) {
    return (
      <div className="container">
        <div className="empty" style={{ margin: "48px 0" }}>
          <div className="empty__icon">
            <Icon name="check" />
          </div>
          <h2>Дякуємо за замовлення!</h2>
          <p>
            Ваше замовлення прийнято. Менеджер зв'яжеться з вами найближчим часом
            для підтвердження.
          </p>
          <div style={{ marginTop: 16 }}>
            <Link href="/catalog" className="btn btn--lg">
              Продовжити покупки
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="container">
        <div className="empty" style={{ margin: "48px 0" }}>
          <div className="empty__icon">
            <Icon name="drop" />
          </div>
          <h2>Кошик порожній</h2>
          <p>Додайте товари з каталогу, щоб оформити замовлення.</p>
          <div style={{ marginTop: 16 }}>
            <Link href="/catalog" className="btn btn--lg">
              Перейти до каталогу
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>Кошик</h1>
          <p>Перевірте замовлення та заповніть дані для доставки</p>
        </div>
      </div>

      <div className="container">
        <div className="cart">
          <div>
            <div className="cart__items">
              {rows.map(({ product, qty }) => {
                const cat = getCategory(product.category);
                return (
                  <div className="cart-row" key={product.id}>
                    <div className="cart-row__media">
                      <Icon name={cat?.icon ?? "drop"} />
                    </div>
                    <div className="cart-row__info">
                      <Link
                        href={`/catalog/${product.slug}`}
                        className="cart-row__name"
                      >
                        {product.name}
                      </Link>
                      <div className="cart-row__cat">{cat?.title}</div>
                    </div>
                    <div className="qty">
                      <button
                        onClick={() => setQty(product.id, qty - 1)}
                        aria-label="Зменшити"
                      >
                        −
                      </button>
                      <span>{qty}</span>
                      <button
                        onClick={() => setQty(product.id, qty + 1)}
                        aria-label="Збільшити"
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-row__price">
                      {formatPrice(product.price * qty)}
                    </div>
                    <button
                      className="cart-row__remove"
                      onClick={() => remove(product.id)}
                      aria-label="Видалити"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>

            <form className="checkout" onSubmit={handleSubmit}>
              <h3>Оформлення замовлення</h3>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="name">Ім'я та прізвище *</label>
                  <input id="name" name="name" required placeholder="Іван Петренко" />
                </div>
                <div className="field">
                  <label htmlFor="phone">Телефон *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+38 (0__) ___-__-__"
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="field">
                  <label htmlFor="city">Місто</label>
                  <input id="city" name="city" placeholder="Київ" />
                </div>
                <div className="field field--full">
                  <label htmlFor="delivery">Спосіб доставки</label>
                  <select id="delivery" name="delivery" defaultValue="np">
                    <option value="np">Нова пошта (відділення)</option>
                    <option value="np-courier">Нова пошта (кур'єр)</option>
                    <option value="pickup">Самовивіз з магазину</option>
                  </select>
                </div>
                <div className="field field--full">
                  <label htmlFor="comment">Коментар до замовлення</label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={3}
                    placeholder="Зручний час для дзвінка, відділення пошти тощо"
                  />
                </div>
              </div>
              <div className="note">
                <Icon name="sparkle" />
                <span>
                  Це демо-оформлення. Замовлення поки не відправляється на
                  сервер — обробку платежів та збереження заявок буде підключено
                  пізніше.
                </span>
              </div>
              <div style={{ marginTop: 18, maxWidth: 280 }}>
                <button type="submit" className="btn btn--lg">
                  Підтвердити замовлення
                </button>
              </div>
            </form>
          </div>

          <aside className="summary">
            <h3>Разом</h3>
            <div className="summary__row">
              <span>Товари ({rows.length})</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="summary__row">
              <span>Доставка</span>
              <span>За тарифами перевізника</span>
            </div>
            <div className="summary__total">
              <span>До сплати</span>
              <span>{formatPrice(total)}</span>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
