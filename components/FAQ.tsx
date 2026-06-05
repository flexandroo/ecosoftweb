"use client";

import { useState } from "react";
import Icon from "./Icon";

export type FAQItem = { q: string; a: string };

export default function FAQ({
  items,
  title = "Поширені запитання",
  subtitle,
}: {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="faq">
      <div className="faq__head">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <ul className="faq__list">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <li className={`faq__item${isOpen ? " is-open" : ""}`} key={it.q}>
              <button
                type="button"
                className="faq__q"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{it.q}</span>
                <Icon name="arrow" size={20} className="faq__caret" />
              </button>
              {isOpen && (
                <div className="faq__a">
                  <p>{it.a}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
