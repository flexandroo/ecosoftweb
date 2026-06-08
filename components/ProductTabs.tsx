"use client";

import { useState, useMemo } from "react";
import Icon from "./Icon";
import RichText from "./RichText";
import type { DocumentLink } from "@/lib/products";
import type { SectionGroups } from "@/lib/product-template";

type Props = {
  inclusion: string[];
  documents: DocumentLink[];
  description: string;
  groups: SectionGroups;
};

/**
 * Consolidates the supplementary blocks of the PDP into one tabbed
 * surface so they don't dominate the page. Inclusion (Комплект),
 * Documents (with instructions), Warranty, and a generic "Опис" tab for
 * the long description + remaining sections.
 */
export default function ProductTabs({
  inclusion,
  documents,
  description,
  groups,
}: Props) {
  const tabs = useMemo(() => {
    const list: { id: string; label: string; render: () => React.ReactNode }[] = [];

    if (inclusion.length > 0) {
      list.push({
        id: "set",
        label: "Комплект",
        render: () => (
          <ul className="pdp-included">
            {inclusion.map((it) => (
              <li key={it}>
                <span className="pdp-included__icon">
                  <Icon name="check" size={18} />
                </span>
                <span className="pdp-included__text">{it}</span>
              </li>
            ))}
          </ul>
        ),
      });
    }

    if (documents.length > 0 || groups.instructions) {
      list.push({
        id: "docs",
        label: "Документи та інструкції",
        render: () => (
          <>
            {groups.instructions && (
              <div style={{ marginBottom: 18 }}>
                <RichText text={groups.instructions.body} />
              </div>
            )}
            {documents.length > 0 && (
              <div className="pdp-docs">
                {documents.map((d, i) => (
                  <a
                    key={i}
                    className="pdp-doc"
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="pdp-doc__icon">
                      <Icon name="check" size={20} />
                    </span>
                    <span className="pdp-doc__title">{d.title}</span>
                    <Icon name="arrow" size={16} className="pdp-doc__arrow" />
                  </a>
                ))}
              </div>
            )}
          </>
        ),
      });
    }

    if (groups.warranty) {
      list.push({
        id: "warranty",
        label: "Гарантія",
        render: () => <RichText text={groups.warranty!.body} />,
      });
    }

    if (description.trim() || groups.other.length > 0 || groups.keyFeatures) {
      list.push({
        id: "desc",
        label: "Опис",
        render: () => (
          <div className="rich-stack">
            {description.trim() && <RichText text={description} />}
            {groups.keyFeatures && (
              <div>
                <h3 className="rich__sec-h">{groups.keyFeatures.title}</h3>
                <RichText text={groups.keyFeatures.body} />
              </div>
            )}
            {groups.other.map((s) => (
              <div key={s.title}>
                <h3 className="rich__sec-h">{s.title}</h3>
                <RichText text={s.body} />
              </div>
            ))}
          </div>
        ),
      });
    }

    return list;
  }, [inclusion, documents, description, groups]);

  const [active, setActive] = useState(tabs[0]?.id ?? "");
  if (tabs.length === 0) return null;

  return (
    <section className="pdp-section">
      <div className="pdp-section__head">
        <h2>Деталі</h2>
        <p>Комплект, документи, гарантія та повний опис — згруповано в одному місці.</p>
      </div>

      <div className="pdp-tabs">
        <div className="pdp-tabs__strip" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              className={`pdp-tabs__tab${active === t.id ? " is-active" : ""}`}
              aria-selected={active === t.id}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="pdp-tabs__panel">
          {tabs.find((t) => t.id === active)?.render()}
        </div>
      </div>
    </section>
  );
}
