"use client";

import { useState } from "react";
import Icon from "./Icon";
import type { Spec, Section, DocumentLink, Review } from "@/lib/products";

type Panel = {
  id: string;
  title: string;
  count?: number;
  render: () => React.ReactNode;
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

export default function ProductDetails({
  description,
  specs,
  sections,
  documents,
  reviews,
  reviewCount,
}: {
  description: string;
  specs: Spec[];
  sections: Section[];
  documents: DocumentLink[];
  reviews: Review[];
  reviewCount: number;
}) {
  const panels: Panel[] = [];

  if (specs.length > 0) {
    panels.push({
      id: "specs",
      title: "Характеристики",
      render: () => (
        <table className="specs">
          <tbody>
            {specs.map((s, i) => (
              <tr key={i}>
                <th scope="row">{s.name}</th>
                <td>{s.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    });
  }

  if (description) {
    panels.push({
      id: "desc",
      title: "Опис",
      render: () => (
        <div className="prose">
          <Paragraphs text={description} />
        </div>
      ),
    });
  }

  for (const sec of sections) {
    panels.push({
      id: "sec-" + sec.title,
      title: sec.title,
      render: () => (
        <div className="prose">
          <Paragraphs text={sec.body} />
        </div>
      ),
    });
  }

  if (documents.length > 0) {
    panels.push({
      id: "docs",
      title: "Документи",
      count: documents.length,
      render: () => (
        <ul className="doc-list">
          {documents.map((d, i) => (
            <li key={i}>
              <a href={d.url} target="_blank" rel="noopener noreferrer">
                <Icon name="check" size={18} />
                <span>{d.title}</span>
              </a>
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (reviews.length > 0) {
    panels.push({
      id: "reviews",
      title: "Відгуки",
      count: reviewCount || reviews.length,
      render: () => (
        <div className="reviews">
          {reviews.map((r, i) => (
            <article className="review" key={i}>
              <div className="review__head">
                <span className="review__author">{r.author}</span>
                <span className="review__date">{r.date}</span>
              </div>
              <div className="review__body">
                <Paragraphs text={r.text} />
              </div>
            </article>
          ))}
        </div>
      ),
    });
  }

  const [open, setOpen] = useState<string | null>(panels[0]?.id ?? null);

  if (panels.length === 0) return null;

  return (
    <div className="accordion">
      {panels.map((p) => {
        const isOpen = open === p.id;
        return (
          <div className={`accordion__item${isOpen ? " is-open" : ""}`} key={p.id}>
            <button
              type="button"
              className="accordion__head"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : p.id)}
            >
              <span className="accordion__title">
                {p.title}
                {p.count ? <span className="accordion__count">{p.count}</span> : null}
              </span>
              <Icon name="arrow" size={20} />
            </button>
            {isOpen && <div className="accordion__panel">{p.render()}</div>}
          </div>
        );
      })}
    </div>
  );
}
