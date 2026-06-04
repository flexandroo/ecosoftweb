"use client";

import { useState } from "react";

/**
 * Animated, interactive water-treatment scheme — semi-realistic edition.
 *
 * Pipes are rendered as a stack of strokes (shell + cavity + tinted water
 * + dashed "current" + droplets) so they read as real plastic tubes filled
 * with water rather than abstract lines. Corners use quadratic curves so
 * the animateMotion droplets sweep smoothly through the elbows.
 *
 * Each node is a small composition of rects/paths shaped after the real
 * equipment (BB20 housing, control-valve column, RO cabinet, kitchen tap).
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
    text: "Основний етап очищення. Працює з жорсткістю, залізом, запахом або іншими проблемами залежно від конфігурації.",
  },
  household: {
    title: "Побутова вода",
    text: "Очищена вода для побутових потреб: душ, сантехніка, техніка та крани.",
  },
  ro: {
    title: "Зворотний осмос",
    text: "Окремий етап глибокого очищення води для пиття та приготування їжі.",
  },
  drinking: {
    title: "Питна вода",
    text: "Фінальна очищена вода для пиття.",
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

/* ----------------------------- pipe paths ----------------------------- */

const PIPES = {
  main: "M 90 200 H 565",
  household: "M 570 200 V 102 Q 570 90 582 90 H 845",
  ro: "M 570 200 V 298 Q 570 310 582 310 H 655",
  tap: "M 825 310 H 905",
} as const;

/* helper – one droplet/bubble that follows a path */
function Droplet({
  pathId,
  dur,
  begin,
  className,
  shape = "ellipse",
  rx = 3.2,
  ry = 5,
  r = 2.2,
}: {
  pathId: string;
  dur: number;
  begin: number;
  className: string;
  shape?: "ellipse" | "bubble";
  rx?: number;
  ry?: number;
  r?: number;
}) {
  const motion = (
    <animateMotion
      dur={`${dur}s`}
      begin={`${begin}s`}
      repeatCount="indefinite"
      rotate="auto"
    >
      <mpath href={`#${pathId}`} />
    </animateMotion>
  );
  return shape === "ellipse" ? (
    <ellipse rx={rx} ry={ry} className={className}>
      {motion}
    </ellipse>
  ) : (
    <circle r={r} className={className}>
      {motion}
    </circle>
  );
}

/* Renders the multi-layer pipe with animated droplets for a single path. */
function Pipe({
  id,
  d,
  variantClass,
  animateFlow,
  flowSpeed,
}: {
  id: string;
  d: string;
  variantClass: string;
  animateFlow: boolean;
  flowSpeed: number;
}) {
  return (
    <>
      {/* The visible pipe is defined once in <defs> and reused */}
      <use href={`#${id}`} className="wts-pipe wts-pipe-shell" />
      <use href={`#${id}`} className="wts-pipe wts-pipe-cavity" />
      <use
        href={`#${id}`}
        className={`wts-pipe wts-pipe-water ${variantClass}`}
      />
      {animateFlow && (
        <use
          href={`#${id}`}
          className={`wts-pipe wts-pipe-current ${variantClass}`}
          style={{ animationDuration: `${flowSpeed}s` }}
        />
      )}
      <use href={`#${id}`} className="wts-pipe wts-pipe-gloss" />
    </>
  );
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

  const enter = (id: NodeId) => interactive && setActive(id);
  const leave = () => interactive && setActive(null);
  const toggle = (id: NodeId) =>
    interactive && setActive((cur) => (cur === id ? null : id));

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
          {/* Pipe paths — referenced both by visible strokes and by animateMotion */}
          <path id="wts-main-path" d={PIPES.main} fill="none" />
          <path id="wts-household-path" d={PIPES.household} fill="none" />
          <path id="wts-ro-path" d={PIPES.ro} fill="none" />
          <path id="wts-tap-path" d={PIPES.tap} fill="none" />

          {/* Element gradients — give plastic / glass / metal feel */}
          <linearGradient id="wts-glass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#cddeec" />
            <stop offset="45%" stopColor="#f3f8fb" />
            <stop offset="100%" stopColor="#aac3d4" />
          </linearGradient>
          <linearGradient id="wts-glass-tall" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#bcd5e4" />
            <stop offset="50%" stopColor="#eef6fb" />
            <stop offset="100%" stopColor="#9bb8cc" />
          </linearGradient>
          <linearGradient id="wts-cap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7b95a8" />
            <stop offset="100%" stopColor="#4a6779" />
          </linearGradient>
          <linearGradient id="wts-cap-light" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#aabfcf" />
            <stop offset="100%" stopColor="#7b95a8" />
          </linearGradient>
          <linearGradient id="wts-water-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bfe3f1" />
            <stop offset="100%" stopColor="#7fbedd" />
          </linearGradient>
          <linearGradient id="wts-cabinet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e9f1f7" />
            <stop offset="100%" stopColor="#c6d8e5" />
          </linearGradient>
          <linearGradient id="wts-end-soft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f3f8fb" />
            <stop offset="100%" stopColor="#dbe7ef" />
          </linearGradient>

          {/* Soft shadow filter shared by all element groups */}
          <filter id="wts-shadow" x="-20%" y="-20%" width="140%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="0" dy="2" result="off" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.18" />
            </feComponentTransfer>
            <feComposite in2="off" operator="in" result="shadow" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* === Pipes (multi-layer composite) === */}
        <g className="wts-pipes">
          <Pipe
            id="wts-main-path"
            d={PIPES.main}
            variantClass="wts-pipe--main"
            animateFlow={animateFlow}
            flowSpeed={1.6}
          />
          <Pipe
            id="wts-household-path"
            d={PIPES.household}
            variantClass="wts-pipe--household"
            animateFlow={animateFlow}
            flowSpeed={1.4}
          />
          <Pipe
            id="wts-ro-path"
            d={PIPES.ro}
            variantClass="wts-pipe--ro"
            animateFlow={animateFlow}
            flowSpeed={1.9}
          />
          <Pipe
            id="wts-tap-path"
            d={PIPES.tap}
            variantClass="wts-pipe--tap"
            animateFlow={animateFlow}
            flowSpeed={1.3}
          />
        </g>

        {/* Split tee / cross-fitting */}
        <g className="wts-fitting" aria-hidden="true">
          <circle cx={570} cy={200} r={11} className="wts-fitting__ring" />
          <circle cx={570} cy={200} r={5.5} className="wts-fitting__hub" />
        </g>

        {/* ============== NODES ============== */}

        {/* Вхід води — wall-mounted inlet with valve */}
        <g {...nodeAttrs("input")} filter="url(#wts-shadow)">
          <rect
            x={20}
            y={170}
            width={70}
            height={60}
            rx={10}
            className="wts-shell"
          />
          {/* shutoff valve handle */}
          <rect x={45} y={150} width={20} height={6} rx={2} className="wts-metal" />
          <rect x={52} y={156} width={6} height={16} rx={1.5} className="wts-metal" />
          {/* small inlet arrow */}
          <path className="wts-icon" d="M 32 200 H 78 M 70 192 L 78 200 L 70 208" />
          {showLabels && (
            <text x={55} y={252} textAnchor="middle">
              Вхід
            </text>
          )}
        </g>

        {/* BB20 №1 */}
        <g {...nodeAttrs("bb1")} filter="url(#wts-shadow)">
          {/* mounting bracket */}
          <rect x={138} y={110} width={84} height={8} rx={2} className="wts-bracket" />
          {/* upper cap (head) */}
          <rect x={142} y={118} width={76} height={26} rx={6} className="wts-cap-fill" />
          {/* pressure-release button */}
          <circle cx={180} cy={126} r={2.4} className="wts-button" />
          {/* tiny ports stubs (where pipe joins) */}
          <rect x={138} y={130} width={8} height={8} rx={2} className="wts-port" />
          <rect x={214} y={130} width={8} height={8} rx={2} className="wts-port" />
          {/* main translucent body */}
          <rect
            x={146}
            y={144}
            width={68}
            height={130}
            rx={10}
            className="wts-shell wts-shell--glass"
          />
          {/* media silhouette inside */}
          <rect
            x={166}
            y={154}
            width={28}
            height={118}
            rx={4}
            className="wts-media"
          />
          {/* horizontal banding to hint at depth */}
          <line x1={150} y1={180} x2={210} y2={180} className="wts-band" />
          <line x1={150} y1={220} x2={210} y2={220} className="wts-band" />
          <line x1={150} y1={258} x2={210} y2={258} className="wts-band" />
          {/* bottom cap */}
          <rect x={142} y={274} width={76} height={14} rx={5} className="wts-cap-fill" />
          {showLabels && (
            <text x={180} y={310} textAnchor="middle">
              BB20 №1
            </text>
          )}
        </g>

        {/* BB20 №2 — same construction shifted right */}
        <g {...nodeAttrs("bb2")} filter="url(#wts-shadow)">
          <rect x={268} y={110} width={84} height={8} rx={2} className="wts-bracket" />
          <rect x={272} y={118} width={76} height={26} rx={6} className="wts-cap-fill" />
          <circle cx={310} cy={126} r={2.4} className="wts-button" />
          <rect x={268} y={130} width={8} height={8} rx={2} className="wts-port" />
          <rect x={344} y={130} width={8} height={8} rx={2} className="wts-port" />
          <rect
            x={276}
            y={144}
            width={68}
            height={130}
            rx={10}
            className="wts-shell wts-shell--glass"
          />
          <rect x={296} y={154} width={28} height={118} rx={4} className="wts-media" />
          <line x1={280} y1={180} x2={340} y2={180} className="wts-band" />
          <line x1={280} y1={220} x2={340} y2={220} className="wts-band" />
          <line x1={280} y1={258} x2={340} y2={258} className="wts-band" />
          <rect x={272} y={274} width={76} height={14} rx={5} className="wts-cap-fill" />
          {showLabels && (
            <text x={310} y={310} textAnchor="middle">
              BB20 №2
            </text>
          )}
        </g>

        {/* Колонний фільтр — real product photo */}
        <g {...nodeAttrs("column")}>
          <image
            href="/wts-column.png"
            x={406}
            y={40}
            width={108}
            height={294}
            preserveAspectRatio="xMidYMid meet"
            className="wts-photo"
          />
          {showLabels && (
            <text x={460} y={358} textAnchor="middle">
              Колонний фільтр
            </text>
          )}
        </g>

        {/* Побутова вода — house with water lines */}
        <g {...nodeAttrs("household")} filter="url(#wts-shadow)">
          <rect x={845} y={50} width={120} height={80} rx={14} className="wts-shell" />
          {/* house roof */}
          <path className="wts-icon" d="M 874 100 L 896 78 Q 900 74 904 78 L 926 100" />
          {/* house body */}
          <path className="wts-icon" d="M 884 100 V 116 H 920 V 100" />
          {/* tap inside house */}
          <path className="wts-icon-soft" d="M 898 110 V 116" />
          <path className="wts-icon-soft" d="M 898 116 Q 902 116 902 120" />
          {showLabels && (
            <text x={905} y={155} textAnchor="middle">
              Побутова вода
            </text>
          )}
        </g>

        {/* Зворотний осмос — compact cabinet */}
        <g {...nodeAttrs("ro")} filter="url(#wts-shadow)">
          {/* cabinet shell */}
          <rect
            x={655}
            y={265}
            width={170}
            height={90}
            rx={14}
            className="wts-shell wts-shell--cabinet"
          />
          {/* membrane housing (horizontal) */}
          <rect x={668} y={280} width={142} height={18} rx={9} className="wts-cap-fill" />
          <circle cx={681} cy={289} r={3} className="wts-led wts-led--blue" />
          {/* three cartridges */}
          <rect x={673} y={310} width={28} height={36} rx={4} className="wts-cartridge" />
          <rect x={707} y={310} width={28} height={36} rx={4} className="wts-cartridge" />
          <rect x={741} y={310} width={28} height={36} rx={4} className="wts-cartridge" />
          {/* RO indicator block / postfilter on right */}
          <rect x={777} y={310} width={33} height={36} rx={5} className="wts-cap-fill" />
          <circle cx={794} cy={328} r={4} className="wts-led wts-led--green" />
          {showLabels && (
            <text x={740} y={388} textAnchor="middle">
              Зворотний осмос
            </text>
          )}
        </g>

        {/* Питна вода — kitchen tap + glass */}
        <g {...nodeAttrs("drinking")} filter="url(#wts-shadow)">
          <rect
            x={850}
            y={275}
            width={110}
            height={70}
            rx={14}
            className="wts-shell"
          />
          {/* gooseneck tap silhouette */}
          <path
            className="wts-icon wts-icon--metal"
            d="M 902 308
               V 296
               Q 902 290 908 290
               H 928
               Q 934 290 934 296
               V 308
               H 924
               V 320
               H 914
               V 308 Z"
          />
          {/* water stream */}
          <path className="wts-stream" d="M 919 320 V 330" />
          {/* glass */}
          <path
            className="wts-icon"
            d="M 905 332 H 933 L 930 348 H 908 Z"
          />
          {/* water inside the glass */}
          <path className="wts-glass-water" d="M 909 338 H 929 L 928 346 H 910 Z" />
          {showLabels && (
            <text x={905} y={368} textAnchor="middle">
              Питна вода
            </text>
          )}
        </g>

        {/* === Animated droplets / bubbles (above everything) === */}
        {animateFlow && (
          <g className="wts-flow" aria-hidden="true">
            {/* Main pipe */}
            <Droplet pathId="wts-main-path" dur={5} begin={0} className="wts-drop wts-drop--main" />
            <Droplet pathId="wts-main-path" dur={5} begin={1.7} className="wts-drop wts-drop--main" />
            <Droplet pathId="wts-main-path" dur={5} begin={3.4} className="wts-drop wts-drop--main" />
            <Droplet pathId="wts-main-path" dur={6} begin={0.6} className="wts-bubble" shape="bubble" r={1.6} />
            <Droplet pathId="wts-main-path" dur={6} begin={3} className="wts-bubble" shape="bubble" r={1.2} />

            {/* Household branch */}
            <Droplet pathId="wts-household-path" dur={4.2} begin={0} className="wts-drop wts-drop--household" />
            <Droplet pathId="wts-household-path" dur={4.2} begin={1.4} className="wts-drop wts-drop--household" />
            <Droplet pathId="wts-household-path" dur={4.2} begin={2.8} className="wts-drop wts-drop--household" />
            <Droplet pathId="wts-household-path" dur={5} begin={0.8} className="wts-bubble" shape="bubble" r={1.4} />

            {/* RO branch */}
            <Droplet pathId="wts-ro-path" dur={4.5} begin={0} className="wts-drop wts-drop--ro" />
            <Droplet pathId="wts-ro-path" dur={4.5} begin={1.5} className="wts-drop wts-drop--ro" />
            <Droplet pathId="wts-ro-path" dur={4.5} begin={3} className="wts-drop wts-drop--ro" />
            <Droplet pathId="wts-ro-path" dur={5.5} begin={0.7} className="wts-bubble" shape="bubble" r={1.3} />

            {/* Tap path */}
            <Droplet pathId="wts-tap-path" dur={2.4} begin={0} className="wts-drop wts-drop--tap" rx={2.6} ry={4} />
            <Droplet pathId="wts-tap-path" dur={2.4} begin={1.2} className="wts-drop wts-drop--tap" rx={2.6} ry={4} />
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
