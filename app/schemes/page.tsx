import Link from "next/link";
import Icon, { IconName } from "@/components/Icon";

export const metadata = {
  title: "Схеми очищення води",
  description:
    "Типові схеми очищення води для квартири, будинку та свердловини — як працює система та з яких етапів складається.",
};

type Scheme = {
  icon: IconName;
  title: string;
  subtitle: string;
  steps: string[];
  fits: string[];
  href: string;
  hrefLabel: string;
};

const schemes: Scheme[] = [
  {
    icon: "building",
    title: "Квартира — питна вода",
    subtitle: "Очищення води з міського водопроводу для пиття та готування.",
    steps: [
      "Вхід води з міського водопроводу",
      "Механічне очищення (пісок, іржа)",
      "Вугільний картридж (хлор, запах)",
      "Зворотноосмотична мембрана",
      "Мінералізація та постфільтр",
      "Окремий кран для чистої води",
    ],
    fits: [
      "вода з міського водопроводу",
      "потрібна чиста питна вода",
      "обмежене місце під мийкою",
    ],
    href: "/catalog?category=reverse-osmosis",
    hrefLabel: "Системи для квартири",
  },
  {
    icon: "home",
    title: "Будинок — комплексна підготовка",
    subtitle: "Очищення води зі свердловини або колодязя на весь будинок.",
    steps: [
      "Вхід води зі свердловини/колодязя",
      "Магістральний фільтр (механічні домішки)",
      "Знезалізнення та видалення мангану",
      "Пом'якшення води (від накипу)",
      "Знезараження (за потреби)",
      "Окремо — фільтр під мийку для пиття",
    ],
    fits: [
      "вода з власного джерела",
      "є жорсткість, залізо або запах",
      "потрібно захистити сантехніку й техніку",
    ],
    href: "/catalog?category=filtration-systems",
    hrefLabel: "Системи для будинку",
  },
  {
    icon: "filter",
    title: "Захист на вході — магістральна схема",
    subtitle: "Базовий рівень очищення на вводі у квартиру чи будинок.",
    steps: [
      "Вхід води у приміщення",
      "Магістральний фільтр (пісок, окалина)",
      "Картридж від накипу (опційно)",
      "Подальший розподіл до точок водорозбору",
    ],
    fits: [
      "потрібен базовий захист сантехніки",
      "стара система труб у будинку",
      "є осад і механічні домішки",
    ],
    href: "/catalog?category=mainline-filters",
    hrefLabel: "Магістральні фільтри",
  },
  {
    icon: "award",
    title: "HoReCa — кавомашини й парокон-вектомати",
    subtitle: "Спеціалізована водопідготовка для професійного обладнання.",
    steps: [
      "Вхід води",
      "Передфільтрація",
      "Зворотний осмос або спеціальний картридж",
      "Корекція мінерального складу під обладнання",
      "Вихід підготовленої води до техніки",
    ],
    fits: [
      "кафе, ресторан або готель",
      "кавомашини, пароконвектомати, льодогенератори",
      "потрібна стабільна якість води",
    ],
    href: "/catalog?category=horeca",
    hrefLabel: "Рішення для HoReCa",
  },
];

export default function SchemesPage() {
  return (
    <div className="container schemes">
      <header className="schemes__head">
        <h1>Типові схеми очищення води</h1>
        <p>
          Покажемо, з яких етапів складається система очищення для різних
          ситуацій. Якщо не знаєте, яка схема підходить саме вам — залиште
          заявку, ми підберемо рішення під вашу воду й приміщення.
        </p>
        <div className="schemes__head-actions">
          <Link href="/contacts" className="btn btn--lg">
            <Icon name="headset" />
            Отримати консультацію
          </Link>
          <Link href="/#quiz" className="btn btn--lg btn--outline">
            <Icon name="sparkle" />
            Підібрати систему
          </Link>
        </div>
      </header>

      <div className="schemes__list">
        {schemes.map((s) => (
          <article className="scheme" key={s.title}>
            <div className="scheme__head">
              <span className="scheme__icon">
                <Icon name={s.icon} size={24} />
              </span>
              <div>
                <h2>{s.title}</h2>
                <p>{s.subtitle}</p>
              </div>
            </div>

            <div className="scheme__body">
              <div className="scheme__steps">
                <h3>Етапи очищення</h3>
                <ol>
                  {s.steps.map((step, i) => (
                    <li key={step}>
                      <span className="scheme__step-num">{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="scheme__fits">
                <h3>Коли підходить</h3>
                <ul>
                  {s.fits.map((f) => (
                    <li key={f}>
                      <Icon name="check" size={16} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={s.href} className="btn btn--outline scheme__cta">
                  {s.hrefLabel}
                  <Icon name="arrow" size={18} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="schemes__cta">
        <div>
          <h2>Не знаєте, яка схема підходить?</h2>
          <p>
            Опишіть вашу воду, тип житла або надішліть аналіз — підкажемо, з
            якої схеми краще почати й що саме знадобиться.
          </p>
        </div>
        <div className="schemes__cta-actions">
          <Link href="/contacts" className="btn btn--lg btn--light">
            <Icon name="headset" />
            Отримати консультацію
          </Link>
          <Link href="/catalog" className="btn btn--lg btn--on-dark">
            До каталогу
            <Icon name="arrow" />
          </Link>
        </div>
      </section>
    </div>
  );
}
