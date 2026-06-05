"use client";

import { useState } from "react";
import Icon from "./Icon";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="note">
        <Icon name="check" />
        <span>
          Дякуємо! Заявка прийнята — менеджер зв'яжеться з вами найближчим часом
          і допоможе підібрати рішення під вашу воду.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="cname">Ім'я *</label>
          <input id="cname" name="name" required placeholder="Ваше ім'я" />
        </div>
        <div className="field">
          <label htmlFor="cphone">Телефон *</label>
          <input
            id="cphone"
            name="phone"
            type="tel"
            required
            placeholder="+38 (0__) ___-__-__"
          />
        </div>
        <div className="field">
          <label htmlFor="cemail">Email</label>
          <input
            id="cemail"
            name="email"
            type="email"
            placeholder="необов'язково"
          />
        </div>
        <div className="field">
          <label htmlFor="ctype">Тип об'єкта</label>
          <select id="ctype" name="object" defaultValue="apartment">
            <option value="apartment">Квартира</option>
            <option value="house">Приватний будинок</option>
            <option value="business">Бізнес / HoReCa</option>
            <option value="other">Інше</option>
          </select>
        </div>
        <div className="field field--full">
          <label htmlFor="cmsg">Коментар</label>
          <textarea
            id="cmsg"
            name="message"
            rows={4}
            placeholder="Опишіть проблему з водою або джерело (свердловина, водопровід тощо)"
          />
        </div>
        <div className="field field--full field--check">
          <label className="check">
            <input type="checkbox" name="analysis" />
            <span>У мене є аналіз води — можу надіслати менеджеру</span>
          </label>
        </div>
      </div>
      <div style={{ marginTop: 18, maxWidth: 320 }}>
        <button type="submit" className="btn btn--lg btn--block">
          <Icon name="headset" />
          Отримати консультацію
        </button>
      </div>
    </form>
  );
}
