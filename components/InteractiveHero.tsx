"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Link from "next/link";
import QuizLink from "./QuizLink";
import Icon, { IconName } from "./Icon";

/* ------------------------------------------------------------------ */
/* Data shape                                                          */
/* ------------------------------------------------------------------ */

type CTA = { label: string; href: string; quiz?: boolean; icon?: IconName };
type VisualType = "product" | "quiz";
type InfoCard = { icon: IconName; title: string; sub: string };

type Scenario = {
  id: string;
  tabLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: CTA;
  secondaryCta?: CTA;
  visualType: VisualType;
  chips: string[];
  product?: { image: string; name: string };
  infoCards?: InfoCard[];
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
    visualType: "product",
    chips: ["Компактне рішення", "Чиста питна вода", "Для щоденного користування"],
    product: {
      image:
        "https://ecosoft.ua/upload/resize_cache/iblock/e00/564_564_140cd750bba9870f18aada2478b24840a/ru_chyoekhu_sbuakhrsgs_sfpsfa_ecosoft_pure_balance_mo675mpurebaleco_ua_chkoekhu_ivsuskhrsgs_sfpsfts_.webp",
      name: "Ecosoft PURE Balance",
    },
    infoCards: [
      { icon: "drop", title: "Чиста питна вода", sub: "до 99,8% домішок" },
      { icon: "jug", title: "Компактно", sub: "ставиться під мийку" },
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
    visualType: "product",
    chips: ["Для всієї оселі", "Захист техніки", "Стабільна якість води"],
    product: {
      image:
        "https://ecosoft.ua/upload/resize_cache/iblock/f01/564_564_140cd750bba9870f18aada2478b24840a/ru_nsptankhr_m_chyoekhu_tspyagyeryya_vse_ecosoft_fu1235cabceta_ua_nsptankhrym_chkoekhu_tsp_yanyyerrya.webp",
      name: "Ecosoft Titanium Azure",
    },
    infoCards: [
      { icon: "softener", title: "М'яка вода", sub: "у кожній точці" },
      { icon: "shield", title: "Захист техніки", sub: "бойлер і сантехніка" },
    ],
  },
  {
    id: "well",
    tabLabel: "Свердловина",
    eyebrow: "Для складнішої води",
    title: "Рішення для води зі свердловини",
    description:
      "Підбираємо системи для води з залізом, осадом, запахом або підвищеною жорсткістю.",
    primaryCta: {
      label: "Підібрати рішення",
      href: "/catalog?category=filtration-systems&subcategory=fs-iron-hardness",
      icon: "arrow",
    },
    secondaryCta: {
      label: "Надіслати аналіз води",
      href: "/contacts",
      icon: "flask",
    },
    visualType: "product",
    chips: ["Підбір за аналізом", "Для проблемної води", "Комплексне рішення"],
    product: {
      image:
        "https://ecosoft.ua/upload/resize_cache/iblock/cc9/564_564_140cd750bba9870f18aada2478b24840a/ru_nsptankhr_m_chyoekhu_sbyeizyeoyeiyvaryya_y_tspyagyeryya_vse_ecosoft_titanium_gold_250_ua_nsptankh.webp",
      name: "Ecosoft Titanium Gold",
    },
    infoCards: [
      { icon: "grain", title: "Залізо й осад", sub: "усуваємо повністю" },
      { icon: "flask", title: "Підбір за аналізом", sub: "точне рішення" },
    ],
  },
  {
    id: "quiz",
    tabLabel: "Підбір",
    eyebrow: "Експертний підбір",
    title: "Підберемо систему без технічних складнощів",
    description:
      "Дайте відповідь на кілька простих питань — і ми порадимо рішення саме під вашу воду та об'єкт.",
    primaryCta: {
      label: "Пройти підбір",
      href: "/#quiz",
      quiz: true,
      icon: "sparkle",
    },
    secondaryCta: {
      label: "Отримати консультацію",
      href: "/contacts",
      icon: "headset",
    },
    visualType: "quiz",
    chips: ["Без складних термінів", "Враховуємо тип об'єкта", "Готова рекомендація"],
  },
  {
    id: "business",
    tabLabel: "Бізнес",
    eyebrow: "Для офісів, кав'ярень і бізнесу",
    title: "Стабільна якість води для закладів і професійного використання",
    description:
      "Підбираємо рішення для офісів, кав'ярень, ресторанів та інших комерційних об'єктів.",
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
    visualType: "product",
    chips: ["Для HoReCa", "Захист обладнання", "Стабільна якість води"],
    product: {
      image:
        "https://ecosoft.ua/upload/resize_cache/iblock/a39/564_564_140cd750bba9870f18aada2478b24840a/ru_chyoekhu_sbuakhrsgs_sfpsfa_ecosoft_robust_coffee_ua_chkoekhu_ivsuskhrsgs_sfpsfts_ecosoft_robust_c.webp",
      name: "Ecosoft RObust Coffee",
    },
    infoCards: [
      { icon: "award", title: "Для HoReCa", sub: "кава й напої" },
      { icon: "gear", title: "Захист обладнання", sub: "стабільний ресурс" },
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
      <h4 className="ihero-quizcard__q">Де потрібне очищення?</h4>
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
/* Visual scenes                                                       */
/* ------------------------------------------------------------------ */

function SceneProduct({
  product,
  infoCards,
}: {
  product: { image: string; name: string };
  infoCards: InfoCard[];
}) {
  return (
    <div className="ihero-scene ihero-scene--product">
      <span className="ihero-photo__glow" aria-hidden="true" />
      <div className="ihero-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="ihero-photo__img"
          src={product.image}
          alt={product.name}
          width={564}
          height={564}
          loading="eager"
          decoding="async"
        />
      </div>
      {infoCards.slice(0, 2).map((c, i) => (
        <div className={`ihero-infocard ihero-infocard--${i + 1}`} key={c.title}>
          <span className="ihero-infocard__icon">
            <Icon name={c.icon} size={18} />
          </span>
          <span className="ihero-infocard__text">
            <strong>{c.title}</strong>
            <span>{c.sub}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function HeroVisualScene({ scenario }: { scenario: Scenario }) {
  if (scenario.visualType === "quiz") {
    return (
      <div className="ihero-scene ihero-scene--quiz">
        <HeroQuizCard />
      </div>
    );
  }
  if (scenario.product) {
    return (
      <SceneProduct
        product={scenario.product}
        infoCards={scenario.infoCards ?? []}
      />
    );
  }
  return null;
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
      ["--px" as any]: `${parallax.x * 12}px`,
      ["--py" as any]: `${parallax.y * 9}px`,
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
