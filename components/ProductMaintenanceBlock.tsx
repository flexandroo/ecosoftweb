import Link from "next/link";
import Icon from "./Icon";
import Callout from "./Callout";
import RichText from "./RichText";
import type { MaintenanceScheduleRow } from "@/lib/product-template";

export default function ProductMaintenanceBlock({
  intro,
  schedule,
  important,
  sourceText,
}: {
  intro: string;
  schedule: MaintenanceScheduleRow[];
  important: string[];
  /** Real XML "Обслуговування" section, if present — shown beneath. */
  sourceText?: string;
}) {
  const hasAny =
    intro.trim().length > 0 ||
    schedule.length > 0 ||
    important.length > 0 ||
    (sourceText && sourceText.trim().length > 0);

  if (!hasAny) return null;

  return (
    <section className="pdp-section">
      <div className="pdp-section__head">
        <h2>Обслуговування</h2>
        {intro && <p>{intro}</p>}
      </div>

      <div className="pdp-maint">
        {schedule.length > 0 && (
          <div className="pdp-maint__cell">
            <h3 className="pdp-maint__h3">Частота заміни</h3>
            <dl className="pdp-maint__schedule">
              {schedule.map((row) => (
                <div className="pdp-maint__row" key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {important.length > 0 && (
          <div className="pdp-maint__cell">
            <h3 className="pdp-maint__h3">Що важливо знати</h3>
            <Callout variant="important">
              <ul className="callout__list">
                {important.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </Callout>
          </div>
        )}
      </div>

      {sourceText && sourceText.trim() && (
        <details className="pdp-maint__more">
          <summary>
            <span>Деталі від виробника</span>
            <Icon name="arrow" size={16} />
          </summary>
          <div className="pdp-maint__more-body">
            <RichText text={sourceText} />
          </div>
        </details>
      )}

      <div className="pdp-maint__cta-row">
        <Link href="/contacts" className="btn btn--outline">
          <Icon name="headset" size={16} />
          Замовити обслуговування
        </Link>
        <Link href="/contacts" className="pdp-maint__text-link">
          Не впевнені у регламенті?
          <Icon name="arrow" size={14} />
        </Link>
      </div>
    </section>
  );
}
