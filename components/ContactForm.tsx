"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="note">
        ✅ Дякуємо! Ваше повідомлення надіслано (демо). Менеджер зв'яжеться з
        вами найближчим часом.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="cname">Ім'я *</label>
          <input id="cname" required placeholder="Ваше ім'я" />
        </div>
        <div className="field">
          <label htmlFor="cphone">Телефон *</label>
          <input
            id="cphone"
            type="tel"
            required
            placeholder="+38 (0__) ___-__-__"
          />
        </div>
        <div className="field field--full">
          <label htmlFor="cmsg">Повідомлення</label>
          <textarea
            id="cmsg"
            rows={4}
            placeholder="Ваше запитання чи коментар"
          />
        </div>
      </div>
      <div style={{ marginTop: 16, maxWidth: 260 }}>
        <button type="submit" className="btn btn--lg">
          Надіслати
        </button>
      </div>
    </form>
  );
}
