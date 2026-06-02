import { SVGProps } from "react";

export type IconName =
  | "shield"
  | "truck"
  | "wrench"
  | "headset"
  | "drop"
  | "leaf"
  | "gear"
  | "award"
  | "osmosis"
  | "jug"
  | "filter"
  | "softener"
  | "cartridge"
  | "accessory"
  | "arrow"
  | "phone"
  | "mail"
  | "pin"
  | "clock"
  | "check"
  | "star"
  | "sparkle"
  | "menu";

const paths: Record<IconName, JSX.Element> = {
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  truck: (
    <>
      <path d="M3 6h11v9H3z" />
      <path d="M14 9h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a4 4 0 00-5.4 5l-5 5a1.8 1.8 0 102.5 2.5l5-5a4 4 0 005-5.4l-2.6 2.6-2.1-.5-.5-2.1 2.6-2.6z" />
  ),
  headset: (
    <>
      <path d="M4 13v-1a8 8 0 0116 0v1" />
      <path d="M4 13a2 2 0 012 2v2a2 2 0 01-2 2 1 1 0 01-1-1v-4a1 1 0 011-1z" />
      <path d="M20 13a2 2 0 00-2 2v2a2 2 0 002 2 1 1 0 001-1v-4a1 1 0 00-1-1z" />
      <path d="M18 19v.5a3 3 0 01-3 3h-3" />
    </>
  ),
  drop: (
    <path d="M12 3.5s6 6.4 6 10.5a6 6 0 01-12 0c0-4.1 6-10.5 6-10.5z" />
  ),
  leaf: (
    <>
      <path d="M5 19c0-7 5-12 14-12 0 9-5 14-12 14a6 6 0 01-2-2z" />
      <path d="M9 15c2-3 5-5 8-6" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M21 12h-2.5M5.5 12H3M18 6l-1.8 1.8M7.8 16.2L6 18M18 18l-1.8-1.8M7.8 7.8L6 6" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13.5L8 21l4-2 4 2-1-7.5" />
    </>
  ),
  osmosis: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="3" />
      <path d="M9 8h6M9 12h6M9 16h6" />
    </>
  ),
  jug: (
    <>
      <path d="M7 8h10l-1 11a2 2 0 01-2 2h-4a2 2 0 01-2-2L7 8z" />
      <path d="M9 8V5a2 2 0 012-2h2a2 2 0 012 2v3" />
    </>
  ),
  filter: (
    <path d="M4 5h16l-6 7v6l-4 2v-8L4 5z" />
  ),
  softener: (
    <>
      <path d="M12 4c3 3.5 5 6 5 8.5a5 5 0 01-10 0C7 10 9 7.5 12 4z" />
      <path d="M9.5 13a2.5 2.5 0 002.5 2.5" />
    </>
  ),
  cartridge: (
    <>
      <rect x="8" y="3" width="8" height="18" rx="2" />
      <path d="M10 3v-1M14 3v-1M8 8h8M8 16h8" />
    </>
  ),
  accessory: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  phone: (
    <path d="M6 3h3l1.5 5-2 1.5a12 12 0 006 6l1.5-2 5 1.5v3a2 2 0 01-2 2A17 17 0 014 5a2 2 0 012-2z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 00-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  check: <path d="M5 12.5l4 4 10-10" />,
  star: (
    <path d="M12 4l2.3 4.7 5.2.8-3.7 3.6.9 5.1L12 15.8 7.3 18.3l.9-5.1L4.5 9.5l5.2-.8L12 4z" />
  ),
  sparkle: (
    <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z" />
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
};

export default function Icon({
  name,
  size = 24,
  ...props
}: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
