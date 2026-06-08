import type { ReactNode } from "react";
import Icon, { IconName } from "./Icon";

export type CalloutVariant = "important" | "note" | "tip" | "info";

const VARIANTS: Record<
  CalloutVariant,
  { label: string; icon: IconName }
> = {
  important: { label: "Важливо", icon: "shield" },
  note: { label: "Зверніть увагу", icon: "question" },
  tip: { label: "Порада", icon: "sparkle" },
  info: { label: "Корисно знати", icon: "flask" },
};

/**
 * Small structured note block — light-blue surface, soft border,
 * icon + variant label + content. Used inside product info sections
 * to call out the "important / note / tip" parts of long copy.
 */
export default function Callout({
  variant = "important",
  title,
  children,
}: {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
}) {
  const v = VARIANTS[variant];
  return (
    <aside className={`callout callout--${variant}`}>
      <span className="callout__icon">
        <Icon name={v.icon} size={18} />
      </span>
      <div className="callout__body">
        <span className="callout__label">{title || v.label}</span>
        <div className="callout__content">{children}</div>
      </div>
    </aside>
  );
}
