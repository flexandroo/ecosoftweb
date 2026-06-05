import Link from "next/link";
import WaterTreatmentScheme from "@/components/ui/water-treatment-scheme";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Як працює система очищення води",
  description:
    "Інтерактивна схема руху води через систему очищення Ecosoft: магістральні колби, колонний фільтр, розгалуження на побутову воду та зворотний осмос.",
};

const stages: { title: string; text: string }[] = [
  {
    title: "Механічне очищення",
    text: "Магістральні колби затримують пісок, окалину та іржу — перший рубіж захисту для подальших етапів.",
  },
  {
    title: "Комплексне очищення у колонній системі",
    text: "Колонний фільтр відповідає за головні проблеми води: жорсткість, залізо, манган або запах — залежно від наповнення.",
  },
  {
    title: "Окрема підготовка питної води",
    text: "На пиття та готування виноситься окремий зворотний осмос — мембранне очищення до 99,8% з мінералізацією на фінальному етапі.",
  },
];

export default function SchemesPage() {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>Як працює система очищення води для будинку</h1>
          <p>
            Вода проходить кілька етапів: механічне очищення, комплексне
            очищення у колонній системі та окрему підготовку питної води через
            зворотний осмос. Наведіть або торкніться елемента — побачите, що
            робить кожен вузол.
          </p>
        </div>
      </div>

      <div className="container schemes-page">
        <WaterTreatmentScheme />

        <section className="schemes-page__stages">
          <h2>Етапи очищення води</h2>
          <div className="schemes-page__grid">
            {stages.map((s, i) => (
              <article className="schemes-page__stage" key={s.title}>
                <span className="schemes-page__stage-num">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="schemes-page__cta">
          <div className="schemes-page__cta-text">
            <h2>Хочете таку схему під вашу воду?</h2>
            <p>
              Надішліть аналіз води або опишіть проблему — підберемо
              конфігурацію під будинок, кількість людей і санвузлів. Якщо
              аналізу немає, підкажемо, де його зробити.
            </p>
          </div>
          <div className="schemes-page__cta-actions">
            <Link href="/contacts" className="btn btn--lg btn--light">
              <Icon name="flask" />
              Надіслати аналіз води
            </Link>
            <Link href="/#quiz" className="btn btn--lg btn--on-dark">
              <Icon name="sparkle" />
              Отримати підбір системи
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
