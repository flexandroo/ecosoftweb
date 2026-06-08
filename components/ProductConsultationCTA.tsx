import Link from "next/link";
import Icon from "./Icon";

export default function ProductConsultationCTA({
  variant = "soft",
}: {
  variant?: "soft" | "dark";
}) {
  const isDark = variant === "dark";
  return (
    <section className="pdp-section">
      <div className={`pdp-cta-block${isDark ? " pdp-cta-block--dark" : ""}`}>
        <div className="pdp-cta-block__text">
          <h2>Не впевнені, що товар підійде?</h2>
          <p>
            Опишіть воду або надішліть аналіз — підкажемо, чи ця модель
            підходить саме вам.
          </p>
        </div>
        <div className="pdp-cta-block__actions">
          <Link
            href="/contacts"
            className={`btn btn--lg${isDark ? " btn--light" : ""}`}
          >
            <Icon name="headset" />
            Отримати консультацію
          </Link>
          <Link
            href="/contacts"
            className={`btn btn--lg ${
              isDark ? "btn--on-dark" : "btn--outline"
            }`}
          >
            <Icon name="flask" />
            Надіслати аналіз води
          </Link>
        </div>
      </div>
    </section>
  );
}
