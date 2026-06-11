"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Link from "next/link";
import QuizLink from "./QuizLink";
import Icon, { IconName } from "./Icon";

/* ------------------------------------------------------------------ */
/* Data shape                                                          */
/* ------------------------------------------------------------------ */

type Hotspot = { x: number; y: number; label: string };
type CTA = { label: string; href: string; quiz?: boolean; icon?: IconName };
type VisualType = "osmosis" | "home" | "promo" | "quiz" | "business";

type Scenario = {
  id: VisualType;
  tabLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: CTA;
  secondaryCta?: CTA;
  visualType: VisualType;
  chips: string[];
  hotspots: Hotspot[];
};

export const heroScenarios: Scenario[] = [
  {
    id: "osmosis",
    tabLabel: "Квартира",
    eyebrow: "Питна вода щодня",
    title: "Системи зворотного осмосу для квартири",
    description:
      "Компактні рішення для чистої, безпечної та смачної води вдома.",
    primaryCta: {
      label: "Переглянути осмоси",
      href: "/catalog?category=reverse-osmosis",
      icon: "arrow",
    },
    secondaryCta: {
      label: "Підібрати систему",
      href: "/#quiz",
      quiz: true,
      icon: "sparkle",
    },
    visualType: "osmosis",
    chips: ["Компактно", "Мінералізація", "Щоденний комфорт"],
    hotspots: [
      { x: 32, y: 22, label: "Мембрана" },
      { x: 64, y: 42, label: "Мінералізатор" },
      { x: 28, y: 72, label: "Сервіс" },
    ],
  },
  {
    id: "home",
    tabLabel: "Будинок",
    eyebrow: "Для приватного будинку",
    title: "Комплексне очищення води для всієї оселі",
    description:
      "Пом'якшення, захист техніки та стабільна якість води у кожній точці.",
    primaryCta: {
      label: "Обрати систему для будинку",
      href: "/catalog?category=filtration-systems",
      icon: "arrow",
    },
    secondaryCta: {
      label: "Отримати консультацію",
      href: "/contacts",
      icon: "headset",
    },
    visualType: "home",
    chips: ["Захист сантехніки", "М'яка вода", "Для всієї оселі"],
    hotspots: [
      { x: 26, y: 38, label: "Пом'якшення" },
      { x: 56, y: 60, label: "Захист техніки" },
      { x: 78, y: 28, label: "Стабільний тиск" },
    ],
  },
  {
    id: "promo",
    tabLabel: "Акції",
    eyebrow: "Спеціальна пропозиція",
    title: "Акції на популярні системи Ecosoft",
    description:
      "Вигідні пропозиції на рішення для питної води та очищення для дому.",
    primaryCta: {
      label: "Дивитися акції",
      href: "/catalog?promo=1",
      icon: "arrow",
    },
    secondaryCta: {
      label: "Популярні товари",
      href: "/catalog",
      icon: "star",
    },
    visualType: "promo",
    chips: ["Обмежена пропозиція", "Популярні моделі", "Вигідні умови"],
    hotspots: [
      { x: 30, y: 30, label: "Популярний вибір" },
      { x: 70, y: 56, label: "Готове рішення" },
    ],
  },
  {
    id: "quiz",
    tabLabel: "Підбір",
    eyebrow: "Експертний підбір",
    title: "Підберемо систему за 1 хвилину",
    description:
      "Дайте відповідь на кілька коротких запитань — і ми порекомендуємо оптимальне рішення.",
    primaryCta: {
      label: "Пройти підбір",
      href: "/#quiz",
      quiz: true,
      icon: "sparkle",
    },
    secondaryCta: { label: "Консультація", href: "/contacts", icon: "headset" },
    visualType: "quiz",
    chips: ["Безкоштовно", "Швидко", "Під ваші умови"],
    hotspots: [],
  },
  {
    id: "business",
    tabLabel: "Бізнес",
    eyebrow: "Для кав'ярень, офісів і бізнесу",
    title: "Стабільна якість води для закладів",
    description:
      "Рішення для офісів, кав'ярень, ресторанів та професійного використання.",
    primaryCta: {
      label: "Рішення для бізнесу",
      href: "/catalog?category=horeca",
      icon: "arrow",
    },
    secondaryCta: {
      label: "Зв'язатися з нами",
      href: "/contacts",
      icon: "headset",
    },
    visualType: "business",
    chips: ["HoReCa", "Офіси", "Професійне використання"],
    hotspots: [
      { x: 30, y: 32, label: "Стабільний смак кави" },
      { x: 68, y: 50, label: "Захист обладнання" },
      { x: 48, y: 78, label: "Сервіс" },
    ],
  },
];

const AUTOPLAY_MS = 7000;

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

function CTAButton({ cta, primary = false }: { cta: CTA; primary?: boolean }) {
  const cls = `ihero-btn ${
    primary ? "ihero-btn--primary" : "ihero-btn--ghost"
  }`;
  const body = (
    <>
      {primary ? (
        <>
          <span>{cta.label}</span>
          {cta.icon && <Icon name={cta.icon} size={16} />}
        </>
      ) : (
        <>
          {cta.icon && <Icon name={cta.icon} size={16} />}
          <span>{cta.label}</span>
        </>
      )}
    </>
  );
  return cta.quiz ? (
    <QuizLink className={cls}>{body}</QuizLink>
  ) : (
    <Link href={cta.href} className={cls}>
      {body}
    </Link>
  );
}

function HeroScenarioTabs({
  list,
  active,
  onChange,
  paused,
  reduced,
}: {
  list: Scenario[];
  active: number;
  onChange: (i: number) => void;
  paused: boolean;
  reduced: boolean;
}) {
  return (
    <div
      className="ihero-tabs"
      role="tablist"
      aria-label="Сценарії підбору системи"
    >
      {list.map((s, i) => {
        const isActive = i === active;
        const fillStyle: CSSProperties =
          isActive && !paused && !reduced
            ? { animationDuration: `${AUTOPLAY_MS}ms` }
            : isActive
              ? { width: "100%" }
              : { width: "0%" };
        return (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`ihero-panel-${s.id}`}
            className={`ihero-tab${isActive ? " is-active" : ""}`}
            onClick={() => onChange(i)}
            onFocus={() => {}}
          >
            <span className="ihero-tab__row">
              <span className="ihero-tab__num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="ihero-tab__label">{s.tabLabel}</span>
            </span>
            <span className="ihero-tab__bar" aria-hidden="true">
              <span className="ihero-tab__bar-fill" style={fillStyle} />
            </span>
          </button>
        );
      })}
    </div>
  );
}

function HeroHotspots({ items }: { items: Hotspot[] }) {
  const [open, setOpen] = useState<number | null>(null);
  if (items.length === 0) return null;
  return (
    <>
      {items.map((h, i) => (
        <span
          key={i}
          className={`ihero-hot${open === i ? " is-open" : ""}`}
          style={{ left: `${h.x}%`, top: `${h.y}%` }}
          onMouseEnter={() => setOpen(i)}
          onMouseLeave={() => setOpen(null)}
          onFocus={() => setOpen(i)}
          onBlur={() => setOpen(null)}
          tabIndex={0}
          role="button"
          aria-label={h.label}
        >
          <span className="ihero-hot__dot" />
          <span className="ihero-hot__card">{h.label}</span>
        </span>
      ))}
    </>
  );
}

function HeroFloatingCards({ chips }: { chips: string[] }) {
  return (
    <div className="ihero-floats" aria-hidden="true">
      {chips.map((c, i) => (
        <span className={`ihero-float ihero-float--${i + 1}`} key={c}>
          <span className="ihero-float__dot" />
          {c}
        </span>
      ))}
    </div>
  );
}

function HeroQuizCard() {
  const [choice, setChoice] = useState<string | null>(null);
  const opts: { key: string; label: string; hint: string }[] = [
    {
      key: "apt",
      label: "Квартира",
      hint: "Швидше за все — компактний осмос під мийку.",
    },
    {
      key: "house",
      label: "Будинок",
      hint: "Найімовірніше — комплексна система на вході в будинок.",
    },
    {
      key: "biz",
      label: "Бізнес",
      hint: "Підбір з лінії RObust або професійних рішень.",
    },
  ];
  const chosen = opts.find((o) => o.key === choice);
  return (
    <div className="ihero-quizcard">
      <ul className="ihero-quizcard__stepper" aria-hidden="true">
        <li className="is-active">1. Вода</li>
        <li>2. Потреби</li>
        <li>3. Рішення</li>
      </ul>
      <h4 className="ihero-quizcard__q">Де плануєте очищати воду?</h4>
      <div className="ihero-quizcard__opts">
        {opts.map((o) => (
          <button
            key={o.key}
            type="button"
            className={`ihero-quizcard__opt${
              choice === o.key ? " is-chosen" : ""
            }`}
            onClick={() => setChoice(o.key)}
          >
            {o.label}
          </button>
        ))}
      </div>
      <p
        className={`ihero-quizcard__hint${chosen ? " is-shown" : ""}`}
        aria-live="polite"
      >
        {chosen ? chosen.hint : "Оберіть один з варіантів вище."}
      </p>
      <QuizLink className="ihero-btn ihero-btn--primary ihero-quizcard__cta">
        <span>{chosen ? "Продовжити підбір" : "Пройти підбір"}</span>
        <Icon name="arrow" size={16} />
      </QuizLink>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Per-variant visual scenes                                           */
/* ------------------------------------------------------------------ */

function SceneOsmosis() {
  return (
    <div className="ihero-scene ihero-scene--osmosis">
      <svg
        className="ihero-flow"
        viewBox="0 0 600 460"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ihero-pipe" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#cfd8d4" />
            <stop offset="100%" stopColor="#8ea7a1" />
          </linearGradient>
        </defs>
        <path
          className="ihero-flow__pipe"
          d="M 60 380 L 60 220 Q 60 200 80 200 L 240 200 Q 260 200 260 180 L 260 110"
          fill="none"
        />
        <path
          className="ihero-flow__stream"
          d="M 60 380 L 60 220 Q 60 200 80 200 L 240 200 Q 260 200 260 180 L 260 110"
          fill="none"
        />
      </svg>

      {/* Cylinder housings */}
      <div className="ihero-cyl ihero-cyl--1">
        <span className="ihero-cyl__cap" />
      </div>
      <div className="ihero-cyl ihero-cyl--2">
        <span className="ihero-cyl__cap" />
      </div>
      <div className="ihero-cyl ihero-cyl--3">
        <span className="ihero-cyl__cap" />
      </div>

      {/* Glass with water */}
      <div className="ihero-glass" aria-hidden="true">
        <span className="ihero-glass__water" />
        <span className="ihero-glass__bubble ihero-glass__bubble--1" />
        <span className="ihero-glass__bubble ihero-glass__bubble--2" />
      </div>

      {/* Drop accent */}
      <span className="ihero-droplet" aria-hidden="true">
        <Icon name="drop" size={28} />
      </span>
    </div>
  );
}

function SceneHome() {
  return (
    <div className="ihero-scene ihero-scene--home">
      <svg className="ihero-house" viewBox="0 0 600 460" aria-hidden="true">
        <path
          d="M 100 240 L 300 100 L 500 240 L 500 400 L 100 400 Z"
          className="ihero-house__shell"
        />
        <path
          d="M 100 240 L 300 100 L 500 240"
          className="ihero-house__roof"
        />
        <line x1="220" y1="400" x2="220" y2="280" className="ihero-house__div" />
        <line x1="380" y1="400" x2="380" y2="280" className="ihero-house__div" />
        <line x1="220" y1="280" x2="380" y2="280" className="ihero-house__div" />
        {/* Branching water lines */}
        <path
          d="M 60 420 L 150 420 L 150 360 L 220 360"
          className="ihero-house__pipe ihero-house__pipe--1"
          fill="none"
        />
        <path
          d="M 60 420 L 150 420 L 150 320 L 380 320 L 380 360"
          className="ihero-house__pipe ihero-house__pipe--2"
          fill="none"
        />
        <path
          d="M 60 420 L 150 420 L 150 270 L 540 270"
          className="ihero-house__pipe ihero-house__pipe--3"
          fill="none"
        />
      </svg>

      {/* Mini icons on house */}
      <span className="ihero-room ihero-room--sink" aria-hidden="true">
        <Icon name="drop" size={18} />
      </span>
      <span className="ihero-room ihero-room--bath" aria-hidden="true">
        <Icon name="softener" size={18} />
      </span>
      <span className="ihero-room ihero-room--tech" aria-hidden="true">
        <Icon name="gear" size={18} />
      </span>

      {/* Cabinet system silhouette */}
      <div className="ihero-cabinet" aria-hidden="true">
        <span className="ihero-cabinet__head" />
        <span className="ihero-cabinet__display">AUTO</span>
        <span className="ihero-cabinet__body" />
      </div>
    </div>
  );
}

function ScenePromo() {
  return (
    <div className="ihero-scene ihero-scene--promo">
      <div className="ihero-prod ihero-prod--back">
        <span className="ihero-prod__badge">−15%</span>
        <span className="ihero-prod__label">CROSS Solo</span>
      </div>
      <div className="ihero-prod ihero-prod--mid">
        <span className="ihero-prod__badge ihero-prod__badge--accent">Хіт</span>
        <span className="ihero-prod__label">PURE Balance</span>
      </div>
      <div className="ihero-prod ihero-prod--front">
        <span className="ihero-prod__tag">Special offer</span>
        <span className="ihero-prod__label">FU 1235 CAB CE</span>
        <span className="ihero-prod__price">від 18 900 ₴</span>
      </div>
      <span className="ihero-conf" aria-hidden="true">
        <Icon name="sparkle" size={20} />
      </span>
    </div>
  );
}

function SceneQuiz() {
  return (
    <div className="ihero-scene ihero-scene--quiz">
      <HeroQuizCard />
    </div>
  );
}

function SceneBusiness() {
  const venues: { icon: IconName; label: string }[] = [
    { icon: "award", label: "Кав'ярня" },
    { icon: "building", label: "Офіс" },
    { icon: "gear", label: "Ресторан" },
    { icon: "home", label: "Готель" },
  ];
  return (
    <div className="ihero-scene ihero-scene--business">
      <div className="ihero-venues">
        {venues.map((v) => (
          <div className="ihero-venue" key={v.label}>
            <span className="ihero-venue__icon">
              <Icon name={v.icon} size={20} />
            </span>
            <span className="ihero-venue__label">{v.label}</span>
          </div>
        ))}
      </div>

      <div className="ihero-dash" aria-hidden="true">
        <span className="ihero-dash__title">Параметри сервісу</span>
        <ul>
          <li>
            <span>Стабільність</span>
            <span className="ihero-dash__bar">
              <span style={{ width: "92%" }} />
            </span>
          </li>
          <li>
            <span>Продуктивність</span>
            <span className="ihero-dash__bar">
              <span style={{ width: "84%" }} />
            </span>
          </li>
          <li>
            <span>Сервіс</span>
            <span className="ihero-dash__bar">
              <span style={{ width: "96%" }} />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function HeroVisualScene({ scenario }: { scenario: Scenario }) {
  switch (scenario.visualType) {
    case "osmosis":
      return <SceneOsmosis />;
    case "home":
      return <SceneHome />;
    case "promo":
      return <ScenePromo />;
    case "quiz":
      return <SceneQuiz />;
    case "business":
      return <SceneBusiness />;
  }
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export default function InteractiveHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [parallax, setParallax] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", fn);
    return () => mq.removeEventListener?.("change", fn);
  }, []);

  // autoplay
  useEffect(() => {
    if (paused || reduced) return;
    const t = setTimeout(
      () => setActive((a) => (a + 1) % heroScenarios.length),
      AUTOPLAY_MS
    );
    return () => clearTimeout(t);
  }, [active, paused, reduced]);

  // keyboard
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActive((a) => (a - 1 + heroScenarios.length) % heroScenarios.length);
        e.preventDefault();
      }
      if (e.key === "ArrowRight") {
        setActive((a) => (a + 1) % heroScenarios.length);
        e.preventDefault();
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, []);

  // parallax (desktop only, light touch)
  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced) return;
      const el = sceneRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setParallax({ x: px, y: py });
    },
    [reduced]
  );
  const onMouseLeaveScene = useCallback(() => {
    setParallax({ x: 0, y: 0 });
  }, []);

  // touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0)
        setActive((a) => (a + 1) % heroScenarios.length);
      else
        setActive((a) => (a - 1 + heroScenarios.length) % heroScenarios.length);
    }
    touchStart.current = null;
  };

  const onSectionFocus = () => setPaused(true);
  const onSectionBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
  };

  const s = heroScenarios[active];

  const sceneStyle: CSSProperties = useMemo(
    () => ({
      ["--px" as any]: `${parallax.x * 14}px`,
      ["--py" as any]: `${parallax.y * 10}px`,
    }),
    [parallax]
  );

  return (
    <section
      ref={sectionRef}
      className="ihero"
      aria-roledescription="carousel"
      aria-label="Сценарії підбору систем очищення води"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={onSectionFocus}
      onBlur={onSectionBlur}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      tabIndex={-1}
    >
      <div className="container ihero__inner">
        {/* TEXT COLUMN */}
        <div
          className="ihero__content"
          role="tabpanel"
          id={`ihero-panel-${s.id}`}
          aria-live="polite"
        >
          <span className="ihero__eyebrow" key={`e-${s.id}`}>
            {s.eyebrow}
          </span>
          <h1 className="ihero__title" key={`t-${s.id}`}>
            {s.title}
          </h1>
          <p className="ihero__desc" key={`d-${s.id}`}>
            {s.description}
          </p>
          <div className="ihero__chips" key={`c-${s.id}`}>
            {s.chips.map((c) => (
              <span className="ihero__chip" key={c}>
                {c}
              </span>
            ))}
          </div>
          <div className="ihero__actions" key={`a-${s.id}`}>
            <CTAButton cta={s.primaryCta} primary />
            {s.secondaryCta && <CTAButton cta={s.secondaryCta} />}
          </div>
        </div>

        {/* VISUAL COLUMN */}
        <div
          ref={sceneRef}
          className="ihero__stage"
          style={sceneStyle}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeaveScene}
        >
          <div className="ihero__stage-frame" key={`sc-${s.id}`}>
            <HeroVisualScene scenario={s} />
            <HeroHotspots items={s.hotspots} />
            <HeroFloatingCards chips={s.chips} />
          </div>
        </div>
      </div>

      <HeroScenarioTabs
        list={heroScenarios}
        active={active}
        onChange={setActive}
        paused={paused}
        reduced={reduced}
      />
    </section>
  );
}
