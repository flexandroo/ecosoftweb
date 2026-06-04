import Icon from "./Icon";
import type { DocumentLink } from "@/lib/products";

export default function ProductDocuments({
  documents,
}: {
  documents: DocumentLink[];
}) {
  if (documents.length === 0) return null;

  return (
    <section className="pdp-section">
      <div className="pdp-section__head">
        <h2>Документи та інструкції</h2>
        <p>Інструкції, паспорти, сертифікати та гарантійні умови.</p>
      </div>
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
    </section>
  );
}
