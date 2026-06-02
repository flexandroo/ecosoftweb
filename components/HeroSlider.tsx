"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Icon, { IconName } from "./Icon";

type CTA = { href: string; label: string; icon?: IconName };

type Slide = {
  key: string;
  variant: "a" | "b" | "c" | "d";
  eyebrow: { icon: IconName; text: string };
  title: string;
  subtitle: string;
  cta: CTA;
  secondary?: CTA;
  visual: "device" | "expert";
  chip: { num: string; label: string };
  trust?: boolean;
};

const slides: Slide[] = [
  {
    key: "home",
    variant: "a",
    eyebrow: { icon: "sparkle", text: "Експерти з очищення води з 2003 року" },
    title: "Чиста вода для вашого дому",
    subtitle:
      "Системи очищення води Ecosoft для питної води, щоденного комфорту та захисту техніки.",
    cta: { href: "/#select", label: "Підібрати систему", icon: "sparkle" },
    secondary: { href: "/catalog", label: "Перейти до каталогу" },
    visual: "device",
    chip: { num: "99,8%", label: "очищення води" },
    trust: true,
  },
  {
    key: "apartment",
    variant: "b",
    eyebrow: { icon: "drop", text: "Рішення для квартири" },
    title: "Рішення для квартири",
    subtitle:
      "Компактні фільтри та системи зворотного осмосу для чистої води щодня.",
    cta: {
      href: "/catalog?category=reverse-osmosis",
      label: "Дивитися рішення",
      icon: "arrow",
    },
    secondary: { href: "/catalog?category=flow-filters", label: "Проточні фільтри" },
    visual: "device",
    chip: { num: "200 л", label: "чистої води на добу" },
  },
  {
    key: "house",
    variant: "c",
    eyebrow: { icon: "shield", text: "Комплексні рішення для будинку" },
    title: "Системи для будинку",
    subtitle:
      "Комплексне очищення води для всієї оселі — від питної води до захисту сантехніки та техніки.",
    cta: {
      href: "/catalog?category=mainline-filters",
      label: "Обрати систему",
      icon: "arrow",
    },
    secondary: {
      href: "/catalog?category=filtration-systems&subcategory=fs-softening",
      label: "Пом'якшення води",
    },
    visual: "device",
    chip: { num: "24/7", label: "захист усього дому" },
  },
  {
    key: "consult",
    variant: "d",
    eyebrow: { icon: "headset", text: "Експертний підбір" },
    title: "Не знаєте, що підійде саме вам?",
    subtitle:
      "Допоможемо підібрати систему очищення води за аналізом, типом житла та вашими потребами.",
    cta: { href: "/#select", label: "Отримати консультацію", icon: "headset" },
    secondary: { href: "/contacts", label: "Зв'язатися з нами" },
    visual: "expert",
    chip: { num: "20+", label: "років досвіду" },
  },
];

const AUTOPLAY_MS = 6000;
const COUNT = slides.length;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [interacting, setInteracting] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  const regionRef = useRef<HTMLElement>(null);

  const goTo = useCallback((i: number) => setIndex(((i % COUNT) + COUNT) % COUNT), []);
  const next = useCallback(() => setIndex((p) => (p + 1) % COUNT), []);
  const prev = useCallback(() => setIndex((p) => (p - 1 + COUNT) % COUNT), []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const autoplay = !interacting && !hidden && !reduced && COUNT > 1;

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setTimeout(next, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, autoplay, next]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      prev();
    } else if (e.key === "ArrowRight") {
      next();
    }
  }

  return (
    <section
      ref={regionRef}
      className="hb"
      aria-roledescription="carousel"
      aria-label="Системи очищення води Ecosoft"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={() => setInteracting(false)}
      onKeyDown={onKeyDown}
    >
      <div className="hb__track">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <article
              key={s.key}
              className={`hb__slide hb__slide--${s.variant}${
                active ? " is-active" : ""
              }`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} з ${COUNT}: ${s.title}`}
              aria-hidden={!active}
            >
              <span className="hb__bg" aria-hidden="true">
                <span className="fx-blobs fx-blobs--dark" />
                <span className="hb__glow hb__glow--1" />
                <span className="hb__glow hb__glow--2" />
                <span className="hb__bubble hb__bubble--1" />
                <span className="hb__bubble hb__bubble--2" />
                <span className="hb__bubble hb__bubble--3" />
                <span className="hb__bubble hb__bubble--4" />
                <span className="fx-noise" />
                <svg
                  className="hb__wave"
                  viewBox="0 0 1440 120"
                  preserveAspectRatio="none"
                >
                  <path
                    className="hb__wave-back"
                    d="M0 64L60 58.7C120 53 240 43 360 48C480 53 600 75 720 80C840 85 960 75 1080 64C1200 53 1320 43 1380 48L1440 53V120H0V64Z"
                  />
                  <path
                    className="hb__wave-front"
                    d="M0 88L60 82.7C120 77 240 67 360 69.3C480 72 600 88 720 90.7C840 93 960 83 1080 80C1200 77 1320 83 1380 85.3L1440 88V120H0V88Z"
                  />
                </svg>
              </span>

              <div className="container hb__inner">
                <div className="hb__content">
                  <span className="hb__eyebrow">
                    <Icon name={s.eyebrow.icon} size={16} />
                    {s.eyebrow.text}
                  </span>
                  {i === 0 ? (
                    <h1 className="hb__title">{s.title}</h1>
                  ) : (
                    <h2 className="hb__title">{s.title}</h2>
                  )}
                  <p className="hb__subtitle">{s.subtitle}</p>
                  <div className="hb__actions">
                    <Link
                      href={s.cta.href}
                      className="btn btn--lg btn--light"
                      tabIndex={active ? 0 : -1}
                    >
                      {s.cta.icon && <Icon name={s.cta.icon} />}
                      {s.cta.label}
                    </Link>
                    {s.secondary && (
                      <Link
                        href={s.secondary.href}
                        className="btn btn--lg btn--on-dark"
                        tabIndex={active ? 0 : -1}
                      >
                        {s.secondary.label}
                      </Link>
                    )}
                  </div>
                  {s.trust && (
                    <div className="hb__trust">
                      <span>
                        <Icon name="check" size={18} />1 000 000+ клієнтів
                      </span>
                      <span>
                        <Icon name="check" size={18} />
                        Власне виробництво
                      </span>
                      <span>
                        <Icon name="check" size={18} />
                        Гарантія та сервіс
                      </span>
                    </div>
                  )}
                </div>

                <div className="hb__visual" aria-hidden="true">
                  {s.visual === "device" ? (
                    <div className="hb__stage">
                      <span className="hb__stage-glow" />
                      <Image
                        className="hb__device"
                        src="/hero-device.png"
                        alt=""
                        width={564}
                        height={564}
                        priority={i === 0}
                        sizes="(max-width: 900px) 0px, 420px"
                      />
                      <span className="hb__chip">
                        <Icon name="shield" />
                        <span>
                          <span className="hb__chip-num">{s.chip.num}</span>
                          <span className="hb__chip-label">{s.chip.label}</span>
                        </span>
                      </span>
                    </div>
                  ) : (
                    <div className="hb__stage hb__stage--expert">
                      <span className="hb__stage-glow" />
                      <span className="hb__expert-mark">
                        <Icon name="headset" size={64} />
                      </span>
                      <span className="hb__chip hb__chip--float1">
                        <Icon name="award" />
                        <span>
                          <span className="hb__chip-num">20+</span>
                          <span className="hb__chip-label">років досвіду</span>
                        </span>
                      </span>
                      <span className="hb__chip hb__chip--float2">
                        <Icon name="check" />
                        <span>
                          <span className="hb__chip-num">Безкоштовно</span>
                          <span className="hb__chip-label">підбір системи</span>
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <button
        type="button"
        className="hb__arrow hb__arrow--prev"
        onClick={prev}
        aria-label="Попередній банер"
      >
        <Icon name="arrow" />
      </button>
      <button
        type="button"
        className="hb__arrow hb__arrow--next"
        onClick={next}
        aria-label="Наступний банер"
      >
        <Icon name="arrow" />
      </button>

      <div className="hb__dots" role="tablist" aria-label="Вибір банера">
        {slides.map((s, i) => (
          <button
            key={s.key}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Банер ${i + 1}: ${s.title}`}
            className={`hb__dot${i === index ? " is-active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
