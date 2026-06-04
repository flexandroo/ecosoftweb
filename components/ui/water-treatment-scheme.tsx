"use client";

import { useState } from "react";

/**
 * Animated, interactive water-treatment scheme.
 *
 * Plain SVG with `<animateMotion>` for the flowing droplets — no offset-path
 * needed, so the animation tracks the viewBox automatically and stays sharp
 * at any size. Tooltip card lives outside the SVG so it never gets cropped.
 *
 * Layout (viewBox 0 0 1000 440), left → right:
 *   Вхід → BB20 №1 → BB20 №2 → Колонний фільтр → split →
 *     ┌── Побутова вода  (top branch)
 *     └── Зворотний осмос → Питна вода  (bottom branch)
 */

type NodeId =
  | "input"
  | "bb1"
  | "bb2"
  | "column"
  | "household"
  | "ro"
  | "drinking";

const NODE_INFO: Record<NodeId, { title: string; text: string }> = {
  input: {
    title: "Вхід води",
    text: "Точка входу води в систему очищення.",
  },
  bb1: {
    title: "Колба BB20 №1",
    text: "Перший етап механічного очищення. Затримує великі домішки: пісок, іржу та осад.",
  },
  bb2: {
    title: "Колба BB20 №2",
    text: "Другий етап попереднього очищення. Додатково готує воду перед основним фільтром.",
  },
  column: {
    title: "Фільтр колонного типу",
    text: "Основний етап очищення. Працює з жорсткістю, залізом, запахом або іншими проблемами залежно від наповнення.",
  },
  household: {
    title: "Побутова вода",
    text: "Очищена вода для побутових потреб: душ, сантехніка, пральна машина, техніка та крани.",
  },
  ro: {
    title: "Зворотний осмос",
    text: "Окремий етап глибокого очищення води для пиття та приготування їжі.",
  },
  drinking: {
    title: "Питна вода",
    text: "Фінальна очищена вода для пиття, кави, чаю та приготування їжі.",
  },
};

export interface WaterTreatmentSchemeProps {
  className?: string;
  width?: string;
  height?: string;
  animateFlow?: boolean;
  showLabels?: boolean;
  interactive?: boolean;
  highlightOnHover?: boolean;
}

export function WaterTreatmentScheme({
  className,
  width = "100%",
  height = "100%",
  animateFlow = true,
  showLabels = true,
  interactive = true,
  highlightOnHover = true,
}: WaterTreatmentSchemeProps) {
  const [active, setActive] = useState<NodeId | null>(null);

  const enter = (id: NodeId) => {
    if (interactive) setActive(id);
  };
  const leave = () => {
    if (interactive) setActive(null);
  };
  const toggle = (id: NodeId) => {
    if (interactive) setActive((cur) => (cur === id ? null : id));
  };

  const nodeAttrs = (id: NodeId) => ({
    className: `wts-node${
      highlightOnHover && active === id ? " is-active" : ""
    }`,
    onMouseEnter: () => enter(id),
    onMouseLeave: leave,
    onFocus: () => enter(id),
    onBlur: leave,
    onClick: () => toggle(id),
    tabIndex: interactive ? 0 : -1,
    role: interactive ? "button" : undefined,
    "aria-label": NODE_INFO[id].title,
  });

  // Stagger several droplets per pipe so the flow looks continuous.
  const droplets = (
    pathId: string,
    cls: string,
    dur: number,
    count = 3
  ) =>
    Array.from({ length: count }, (_, i) => (
      <circle key={`${pathId}-${i}`} r={4.5} className={`wts-drop ${cls}`}>
        <animateMotion
          dur={`${dur}s`}
          begin={`${(i * dur) / count}s`}
          repeatCount="indefinite"
          rotate="auto"
        >
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </circle>
    ));

  return (
    <div
      className={`wts${className ? " " + className : ""}`}
      style={{ width, height }}
    >
      <svg
        viewBox="0 0 1000 440"
        className="wts__svg"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Схема очищення води"
      >
        <defs>
          {/* Flow paths — used both for visible pipes and animateMotion */}
          <path id="wts-main-path" d="M 90 200 H 565" fill="none" />
          <path
            id="wts-household-path"
            d="M 570 195 V 90 H 845"
            fill="none"
          />
          <path id="wts-ro-path" d="M 570 205 V 310 H 665" fill="none" />
          <path id="wts-tap-path" d="M 785 310 H 905" fill="none" />
        </defs>

        {/* Visible pipes (behind everything) */}
        <g className="wts-pipes">
          <use href="#wts-main-path" />
          <use href="#wts-household-path" />
          <use href="#wts-ro-path" />
          <use href="#wts-tap-path" />
        </g>

        {/* Split node */}
        <circle cx={570} cy={200} r={6} className="wts-split" />

        {/* === Nodes === */}

        {/* Вхід води */}
        <g {...nodeAttrs("input")}>
          <rect x={20} y={170} width={70} height={60} rx={10} />
          {/* tiny arrow inside */}
          <path
            className="wts-icon"
            d="M 38 200 H 72 M 64 192 L 72 200 L 64 208"
          />
          {showLabels && (
            <text x={55} y={250} textAnchor="middle">
              Вхід
            </text>
          )}
        </g>

        {/* BB20 №1 */}
        <g {...nodeAttrs("bb1")}>
          <rect x={145} y={120} width={70} height={160} rx={14} />
          <line x1={145} y1={150} x2={215} y2={150} />
          <line x1={145} y1={250} x2={215} y2={250} />
          {showLabels && (
            <text x={180} y={305} textAnchor="middle">
              BB20 №1
            </text>
          )}
        </g>

        {/* BB20 №2 */}
        <g {...nodeAttrs("bb2")}>
          <rect x={275} y={120} width={70} height={160} rx={14} />
          <line x1={275} y1={150} x2={345} y2={150} />
          <line x1={275} y1={250} x2={345} y2={250} />
          {showLabels && (
            <text x={310} y={305} textAnchor="middle">
              BB20 №2
            </text>
          )}
        </g>

        {/* Колонний фільтр */}
        <g {...nodeAttrs("column")}>
          {/* cap */}
          <rect
            x={420}
            y={50}
            width={60}
            height={16}
            rx={6}
            className="wts-cap"
          />
          {/* body */}
          <rect x={400} y={66} width={100} height={234} rx={20} />
          {/* level lines */}
          <line x1={400} y1={130} x2={500} y2={130} />
          <line x1={400} y1={230} x2={500} y2={230} />
          {/* valve at top */}
          <circle cx={450} cy={58} r={4} className="wts-icon-dot" />
          {showLabels && (
            <text x={450} y={325} textAnchor="middle">
              Колонний фільтр
            </text>
          )}
        </g>

        {/* Побутова вода */}
        <g {...nodeAttrs("household")}>
          <rect x={845} y={50} width={120} height={80} rx={14} />
          {/* tiny house icon */}
          <path
            className="wts-icon"
            d="M 880 100 L 895 86 L 920 86 L 935 100 M 888 100 V 118 H 928 V 100"
          />
          {showLabels && (
            <text x={905} y={155} textAnchor="middle">
              Побутова вода
            </text>
          )}
        </g>

        {/* Зворотний осмос */}
        <g {...nodeAttrs("ro")}>
          <rect x={665} y={270} width={120} height={80} rx={14} />
          {/* mini-membrane icon */}
          <path
            className="wts-icon"
            d="M 695 295 H 755 M 695 310 H 755 M 695 325 H 755"
          />
          {showLabels && (
            <text x={725} y={388} textAnchor="middle">
              Зворотний осмос
            </text>
          )}
        </g>

        {/* Питна вода (tap) */}
        <g {...nodeAttrs("drinking")}>
          <rect x={850} y={275} width={110} height={70} rx={14} />
          {/* tap silhouette */}
          <path
            className="wts-icon"
            d="M 890 295 H 920 V 305 H 930 V 318 H 880 V 305 H 890 Z"
          />
          {showLabels && (
            <text x={905} y={388} textAnchor="middle">
              Питна вода
            </text>
          )}
        </g>

        {/* Animated droplets (on top of pipes & elements) */}
        {animateFlow && (
          <g className="wts-flow" aria-hidden="true">
            {droplets("wts-main-path", "wts-drop--main", 5)}
            {droplets("wts-household-path", "wts-drop--household", 4.2)}
            {droplets("wts-ro-path", "wts-drop--ro", 4.5)}
            {droplets("wts-tap-path", "wts-drop--tap", 2.5, 2)}
          </g>
        )}
      </svg>

      {/* Tooltip card below the SVG */}
      <div
        className={`wts-tooltip${active ? " is-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {active ? (
          <>
            <h4>{NODE_INFO[active].title}</h4>
            <p>{NODE_INFO[active].text}</p>
          </>
        ) : (
          <p className="wts-tooltip__hint">
            Наведіть або торкніться елемента схеми, щоб побачити коротке
            пояснення.
          </p>
        )}
      </div>
    </div>
  );
}

export default WaterTreatmentScheme;
