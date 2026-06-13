"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

type Accent = "green" | "teal" | "blue";
type ProductKind = "ro" | "compact" | "column";
type CtaLink = { label: string; href: string };
type Stat = { v: string; l: string };

type Slide = {
  key: ProductKind;
  accent: Accent;
  image: string;
  eyebrow: string;
  title: string[];
  sub: string;
  chips: string[];
  primary: CtaLink;
  ghost: CtaLink;
  stats: Stat[];
};

const SLIDES: Slide[] = [
  {
    key: "ro",
    accent: "green",
    image: "/banner-ro.png",
    eyebrow: "Зворотні осмоси",
    title: ["Питна вода ", "преміум-якості", " прямо з вашого крана"],
    sub: "Мембрана зворотного осмосу видаляє до 99,8% домішок, а мінералізатор повертає воді корисний склад і природний смак. Система компактно ховається під мийкою.",
    chips: ["Очищення до 99,8%", "Мінералізація", "Монтаж під мийку"],
    primary: { label: "Переглянути осмоси", href: "/catalog?category=reverse-osmosis" },
    ghost: { label: "Підібрати систему", href: "/#quiz" },
    stats: [
      { v: "99,8%", l: "видалення домішок" },
      { v: "12 л/год", l: "чистої води" },
    ],
  },
  {
    key: "compact",
    accent: "teal",
    image: "/banner-compact.webp",
    eyebrow: "Компактні системи",
    title: ["Комплексне очищення, що ", "вміщується в шафу"],
    sub: "Кабінетні системи пом'якшення та комплексного очищення працюють на весь дім, але займають менше місця, ніж пральна машина. Ідеально для котеджів і квартир з обмеженим простором.",
    chips: ["Все в одному корпусі", "Тиха регенерація", "Захист техніки від накипу"],
    primary: { label: "Переглянути компактні", href: "/catalog?category=filtration-systems&subcategory=fs-softening" },
    ghost: { label: "Підібрати систему", href: "/#quiz" },
    stats: [
      { v: "0,35 м²", l: "площа установки" },
      { v: "2-в-1", l: "фільтр + пом'якшувач" },
    ],
  },
  {
    key: "column",
    accent: "blue",
    image: "/banner-column.webp",
    eyebrow: "Колонні фільтри",
    title: ["Потужне очищення ", "для всього будинку"],
    sub: "Колонні системи знезалізнення та пом'якшення прибирають залізо, жорсткість і марганець із води зі свердловини чи магістралі. Чиста вода в кожному крані — без рудих плям і накипу.",
    chips: ["Залізо та жорсткість", "Для будинку та свердловини", "Автоматична регенерація"],
    primary: { label: "Переглянути колонні", href: "/catalog?category=filtration-systems&subcategory=fs-iron-hardness" },
    ghost: { label: "Надіслати аналіз води", href: "/contacts" },
    stats: [
      { v: "3 м³/год", l: "продуктивність" },
      { v: "0 мг/л", l: "заліза на виході" },
    ],
  },
];

const DUR = 7000;

const Check = () => (
  <svg fill="none" strokeWidth="2.6" viewBox="0 0 24 24">
    <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Arrow = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
    <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function HeroBanners() {
  const [i, setI] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const reduce = useRef(false);

  const go = useCallback((n: number) => setI(() => (n + SLIDES.length) % SLIDES.length), []);

  const restart = useCallback(() => {
    clearTimeout(timer.current);
    if (!reduce.current) timer.current = setTimeout(() => setI((p) => (p + 1) % SLIDES.length), DUR);
  }, []);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    restart();
    return () => clearTimeout(timer.current);
  }, [i, restart]);

  // swipe
  const x0 = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    x0.current = e.touches[0].clientX;
    clearTimeout(timer.current);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (x0.current === null) return;
    const dx = e.changedTouches[0].clientX - x0.current;
    if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
    else restart();
    x0.current = null;
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(i + 1);
    if (e.key === "ArrowLeft") go(i - 1);
  };

  return (
    <section
      className="hb"
      aria-roledescription="карусель"
      aria-label="Категорії систем очищення води"
      onMouseEnter={() => clearTimeout(timer.current)}
      onMouseLeave={restart}
      onKeyDown={onKey}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="hb-blobs" />
      <div className="hb-wave" aria-hidden="true">
        <svg viewBox="0 0 1240 120" preserveAspectRatio="none" fill="none">
          <path d="M0 70c120-26 240-26 360 0s240 26 360 0 240-26 360 0 120 18 160 22v28H0V70Z" fill="#dbeaf8" />
          <path d="M0 92c140-20 280-20 420 0s280 20 420 0 280-20 400-4v32H0V92Z" fill="#cfe6f7" opacity=".8" />
        </svg>
      </div>

      <div className="hb-inner">
        <div className="hb-track">
          {SLIDES.map((s, idx) => {
            const active = idx === i;
            return (
              <article
                className={`hb-slide${active ? " is-active" : ""}`}
                data-accent={s.accent}
                key={s.key}
                aria-hidden={!active}
              >
                <div className="hb-content">
                  <span className="hb-eyebrow"><span className="hb-dot" />{s.eyebrow}</span>
                  {React.createElement(
                    active ? "h1" : "div",
                    { className: "hb-title" },
                    s.title.map((t, k) =>
                      k % 2 ? <em key={k}>{t}</em> : <span key={k}>{t}</span>
                    )
                  )}
                  <p className="hb-sub">{s.sub}</p>
                  <div className="hb-chips">
                    {s.chips.map((c) => (
                      <span className="hb-chip" key={c}><Check />{c}</span>
                    ))}
                  </div>
                  <div className="hb-ctas">
                    <Link className="hb-btn hb-btn--primary" href={s.primary.href} tabIndex={active ? 0 : -1}>
                      {s.primary.label}<Arrow />
                    </Link>
                    <Link className="hb-btn hb-btn--ghost" href={s.ghost.href} tabIndex={active ? 0 : -1}>{s.ghost.label}</Link>
                  </div>
                </div>

                <div className="hb-visual">
                  <div className="hb-halo" />
                  <div className="hb-rings" aria-hidden="true"><i /><i /><i /></div>
                  <Image
                    className="hb-photo"
                    src={s.image}
                    alt={s.eyebrow}
                    width={460}
                    height={460}
                    priority={idx === 0}
                    sizes="(max-width: 980px) 300px, 440px"
                  />
                  <div className="hb-stats">
                    {s.stats.map((st) => (
                      <div className="hb-stat" key={st.l}>
                        <b>{st.v}</b>
                        <span>{st.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="hb-controls">
          <div className="hb-tabs" role="tablist" aria-label="Перемикання банерів">
            {SLIDES.map((s, k) => (
              <button
                key={s.key}
                className={`hb-tab${k === i ? " is-active" : ""}`}
                role="tab"
                aria-selected={k === i}
                onClick={() => go(k)}
              >
                {s.eyebrow}
                <span className="hb-bar" />
              </button>
            ))}
          </div>
          <div className="hb-arrows">
            <button className="hb-arrow" aria-label="Попередній банер" onClick={() => go(i - 1)}>
              <svg fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="hb-arrow" aria-label="Наступний банер" onClick={() => go(i + 1)}>
              <svg fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hb {
          --ink: #0b1f33;
          --muted: var(--body, #5f6b7a);
          --green: var(--primary, #0057b8);
          --green-dark: var(--primary-700, #003e85);
          --teal: var(--aqua, #00a6d6);
          --blue: var(--primary-600, #004ba0);
          --card: #fff;
          --line: #d8e8f5;
          position: relative;
          width: 100%;
          overflow: hidden;
          background: linear-gradient(150deg, #fff 0%, var(--sky-100, #eef7ff) 55%, var(--sky-200, #dbeaf8) 100%);
          border-bottom: 1px solid var(--line);
          isolation: isolate;
          font-family: var(--font, "Manrope", sans-serif);
          color: var(--ink);
        }
        .hb-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
        }
        .hb-blobs {
          position: absolute; inset: -15%; z-index: 0; pointer-events: none; opacity: 0.9;
          background:
            radial-gradient(closest-side, color-mix(in srgb, var(--green) 14%, transparent), transparent 70%) 80% 20% / 620px 620px no-repeat,
            radial-gradient(closest-side, rgba(0, 166, 214, 0.1), transparent 70%) 12% 85% / 560px 560px no-repeat,
            radial-gradient(closest-side, rgba(0, 87, 184, 0.08), transparent 70%) 55% 0% / 480px 480px no-repeat;
          animation: hb-drift 24s ease-in-out infinite alternate;
        }
        @keyframes hb-drift {
          from { transform: translate3d(-1.5%, -1%, 0) scale(1); }
          to { transform: translate3d(1.5%, 1.5%, 0) scale(1.05); }
        }
        .hb-wave { position: absolute; left: 0; right: 0; bottom: 0; z-index: 0; height: 120px; opacity: 0.5; pointer-events: none; }
        .hb-wave svg { width: 100%; height: 100%; }
        .hb-track { position: relative; z-index: 1; display: grid; }
        .hb-slide {
          grid-area: 1 / 1;
          display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 32px; align-items: center;
          min-height: 560px; padding: 64px 72px 92px;
          opacity: 0; visibility: hidden; transform: translateY(14px);
          transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.22, 0.8, 0.3, 1),
            visibility 0.55s;
        }
        .hb-slide.is-active { opacity: 1; visibility: visible; transform: none; }
        .hb-slide:not(.is-active) { pointer-events: none; }
        .hb-slide[data-accent="green"] { --accent: var(--green); --accent-dark: var(--green-dark); }
        .hb-slide[data-accent="teal"] { --accent: var(--teal); --accent-dark: #007a9c; }
        .hb-slide[data-accent="blue"] { --accent: var(--blue); --accent-dark: var(--primary-900, #003b73); }
        .hb-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 13px; font-weight: 800; letter-spacing: 0.13em; text-transform: uppercase;
          color: var(--accent-dark); padding: 8px 16px; border-radius: 999px;
          background: color-mix(in srgb, var(--accent) 12%, #fff);
          border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
          margin-bottom: 26px;
        }
        .hb-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); }
        .hb-title {
          font-family: var(--font, "Unbounded", sans-serif);
          font-weight: 700; font-size: clamp(28px, 3.6vw, 44px); line-height: 1.15;
          letter-spacing: -0.01em; margin: 0 0 18px; color: var(--ink);
        }
        .hb-title :global(em) { font-style: normal; color: var(--accent-dark); }
        .hb-sub { font-size: 17px; line-height: 1.65; color: var(--muted); max-width: 47ch; margin: 0 0 28px; }
        .hb-chips { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 34px; }
        .hb-chip {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 14px; font-weight: 700; color: var(--ink);
          padding: 10px 16px; border-radius: 14px; background: var(--card);
          border: 1px solid var(--line); box-shadow: 0 4px 14px -8px rgba(11, 31, 51, 0.18);
        }
        .hb-chip :global(svg) { width: 16px; height: 16px; stroke: var(--accent-dark); }
        .hb-ctas { display: flex; flex-wrap: wrap; gap: 14px; }
        :global(.hb-btn) {
          font-weight: 800; font-size: 15px; padding: 16px 28px; border-radius: 16px;
          text-decoration: none; display: inline-flex; align-items: center; gap: 10px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s, color 0.25s;
        }
        :global(.hb-btn svg) { width: 18px; height: 18px; }
        :global(.hb-btn:focus-visible) { outline: 3px solid var(--accent); outline-offset: 3px; }
        :global(.hb-btn--primary) {
          color: #fff; background: linear-gradient(135deg, var(--accent), var(--accent-dark));
          box-shadow: 0 14px 28px -12px color-mix(in srgb, var(--accent-dark) 70%, transparent);
        }
        :global(.hb-btn--primary:hover) { transform: translateY(-2px); }
        :global(.hb-btn--ghost) { color: var(--ink); background: #fff; border: 1.5px solid var(--line); }
        :global(.hb-btn--ghost:hover) { border-color: var(--accent); color: var(--accent-dark); }
        .hb-visual { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 380px; }
        .hb-halo {
          position: absolute; width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, color-mix(in srgb, var(--accent) 18%, transparent) 0%, transparent 70%);
          animation: hb-pulse 6s ease-in-out infinite;
        }
        @keyframes hb-pulse { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.07); opacity: 1; } }
        .hb-rings { position: absolute; inset: 0; display: grid; place-items: center; pointer-events: none; }
        .hb-rings i { position: absolute; border-radius: 50%; border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent); }
        .hb-rings i:nth-child(1) { width: 300px; height: 300px; }
        .hb-rings i:nth-child(2) { width: 400px; height: 400px; border-color: color-mix(in srgb, var(--accent) 18%, transparent); }
        .hb-rings i:nth-child(3) { width: 500px; height: 500px; border-color: color-mix(in srgb, var(--accent) 9%, transparent); }
        .hb-visual :global(.hb-photo) { position: relative; z-index: 1; width: clamp(220px, 30vw, 440px); height: auto; object-fit: contain; filter: drop-shadow(0 26px 38px rgba(11, 31, 51, 0.22)); animation: hb-floaty 6s ease-in-out infinite; }
        @keyframes hb-floaty { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .hb-stats {
          position: relative; z-index: 2; display: flex; align-items: stretch;
          margin-top: 28px; padding: 6px 8px; background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(8px); border: 1px solid var(--line); border-radius: 18px;
          box-shadow: 0 14px 30px -18px rgba(11, 31, 51, 0.25);
        }
        .hb-stat { flex: 1; text-align: center; padding: 10px 18px; position: relative; }
        .hb-stat + .hb-stat::before { content: ""; position: absolute; left: 0; top: 18%; bottom: 18%; width: 1px; background: var(--line); }
        .hb-stat b { display: block; font-family: var(--font, "Unbounded", sans-serif); font-size: 18px; font-weight: 700; color: var(--accent-dark); white-space: nowrap; }
        .hb-stat span { font-size: 12px; color: var(--muted); font-weight: 700; }
        .hb-controls { position: absolute; left: 72px; right: 72px; bottom: 26px; z-index: 3; display: flex; align-items: center; gap: 20px; }
        .hb-tabs { display: flex; gap: 8px; flex: 1; min-width: 0; }
        .hb-tab {
          flex: 1; min-width: 0; cursor: pointer; border: 0; text-align: left; background: transparent;
          color: var(--muted); font-family: inherit; font-size: 13px; font-weight: 800;
          padding: 10px 4px 12px; position: relative; white-space: nowrap; overflow: hidden;
          text-overflow: ellipsis; transition: color 0.25s;
        }
        .hb-tab:focus-visible { outline: 2px solid var(--green); outline-offset: 2px; border-radius: 8px; }
        .hb-tab::after { content: ""; position: absolute; left: 0; bottom: 0; height: 3px; width: 100%; background: var(--line); border-radius: 99px; }
        .hb-bar { position: absolute; left: 0; bottom: 0; height: 3px; width: 0; background: var(--green); border-radius: 99px; z-index: 1; }
        .hb-tab.is-active { color: var(--ink); }
        .hb-tab.is-active .hb-bar { animation: hb-fill ${DUR}ms linear forwards; }
        @keyframes hb-fill { from { width: 0; } to { width: 100%; } }
        .hb-arrows { display: flex; gap: 10px; }
        .hb-arrow {
          width: 46px; height: 46px; border-radius: 50%; cursor: pointer; background: #fff;
          border: 1px solid var(--line); color: var(--ink); display: grid; place-items: center;
          box-shadow: 0 6px 16px -8px rgba(11, 31, 51, 0.25);
          transition: border-color 0.25s, color 0.25s, transform 0.25s;
        }
        .hb-arrow:hover { border-color: var(--green); color: var(--green-dark); transform: scale(1.06); }
        .hb-arrow:focus-visible { outline: 2px solid var(--green); outline-offset: 2px; }
        .hb-arrow :global(svg) { width: 18px; height: 18px; }
        @media (max-width: 980px) {
          .hb-slide { grid-template-columns: 1fr; padding: 48px 36px 112px; min-height: auto; }
          .hb-rings i:nth-child(3) { width: 420px; height: 420px; }
          .hb-visual { min-height: 320px; order: -1; }
          .hb-controls { left: 36px; right: 36px; }
        }
        @media (max-width: 560px) {
          .hb-slide { padding: 38px 22px 132px; }
          .hb-controls { left: 22px; right: 22px; flex-direction: column-reverse; align-items: stretch; gap: 12px; }
          .hb-arrows { justify-content: flex-end; }
          .hb-tab { font-size: 11.5px; }
          .hb-sub { font-size: 15.5px; }
          .hb-visual { min-height: 250px; }
          .hb-halo { width: 250px; height: 250px; }
          .hb-visual :global(.hb-photo) { width: 190px; height: auto; }
          .hb-rings i:nth-child(3) { display: none; }
          .hb-stat b { font-size: 15px; }
          .hb-stat { padding: 8px 10px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hb-blobs, .hb-halo { animation: none; }
          .hb-slide { transition: opacity 0.2s linear; transform: none; }
          .hb-visual :global(.hb-photo) { animation: none; }
          .hb-tab.is-active .hb-bar { animation: none; width: 100%; }
        }
      `}</style>
    </section>
  );
}
