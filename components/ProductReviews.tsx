"use client";

import { useState } from "react";
import Icon from "./Icon";
import type { Review } from "@/lib/products";

function Paragraphs({ text, max = 320 }: { text: string; max?: number }) {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const [expanded, setExpanded] = useState(false);
  const full = lines.join(" ");
  const needsClip = full.length > max;
  const shown = expanded || !needsClip ? lines : [full.slice(0, max).trim() + "…"];

  return (
    <>
      {shown.map((l, i) => (
        <p key={i}>{l}</p>
      ))}
      {needsClip && (
        <button
          type="button"
          className="review__more"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Згорнути" : "Розгорнути"}
        </button>
      )}
    </>
  );
}

const PREVIEW = 3;

export default function ProductReviews({
  reviews,
  reviewCount,
}: {
  reviews: Review[];
  reviewCount: number;
}) {
  const [showAll, setShowAll] = useState(false);

  if (reviews.length === 0) return null; // no fallback — kept the page short

  const visible = showAll ? reviews : reviews.slice(0, PREVIEW);
  const total = reviewCount || reviews.length;

  return (
    <section className="pdp-section">
      <div className="pdp-section__head pdp-reviews__head">
        <h2>
          Відгуки <span className="pdp-section__count">({total})</span>
        </h2>
      </div>
      <div className="reviews">
        {visible.map((r, i) => (
          <article className="review" key={i}>
            <div className="review__head">
              <span className="review__author">
                <Icon name="check" size={14} />
                {r.author}
              </span>
              <span className="review__date">{r.date}</span>
            </div>
            <div className="review__body">
              <Paragraphs text={r.text} />
            </div>
          </article>
        ))}
      </div>
      {reviews.length > PREVIEW && !showAll && (
        <div className="pdp-reviews__more">
          <button
            type="button"
            className="btn btn--outline"
            onClick={() => setShowAll(true)}
          >
            Показати всі відгуки
            <Icon name="arrow" size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
