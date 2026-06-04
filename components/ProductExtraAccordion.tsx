"use client";

import { useState } from "react";
import Icon from "./Icon";
import type { Section } from "@/lib/products";

type Item = {
  id: string;
  title: string;
  body: string;
};

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .map((line, i) => (
          <p key={i}>{line}</p>
        ))}
    </>
  );
}

/**
 * Collapsible block for supplementary content that we don't want to dominate
 * the page: full description, warranty section, comparison sections, etc.
 * Nothing is removed — just moved deeper so the friendly blocks come first.
 */
export default function ProductExtraAccordion({
  description,
  extras,
}: {
  description?: string;
  extras: Section[];
}) {
  const items: Item[] = [];

  if (description && description.trim()) {
    items.push({ id: "desc", title: "Детальний опис", body: description });
  }
  for (const s of extras) {
    items.push({ id: "s-" + s.title, title: s.title, body: s.body });
  }

  const [open, setOpen] = useState<string | null>(null);

  if (items.length === 0) return null;

  return (
    <section className="pdp-section">
      <div className="pdp-section__head">
        <h2>Додаткова інформація</h2>
      </div>
      <div className="accordion">
        {items.map((it) => {
          const isOpen = open === it.id;
          return (
            <div
              key={it.id}
              className={`accordion__item${isOpen ? " is-open" : ""}`}
            >
              <button
                type="button"
                className="accordion__head"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : it.id)}
              >
                <span className="accordion__title">{it.title}</span>
                <Icon name="arrow" size={20} />
              </button>
              {isOpen && (
                <div className="accordion__panel">
                  <div className="prose">
                    <Paragraphs text={it.body} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
