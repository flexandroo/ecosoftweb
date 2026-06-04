import Icon from "./Icon";

export default function ProductFitBlock({
  fits,
  notFits,
}: {
  fits: string[];
  notFits: string[];
}) {
  if (fits.length === 0 && notFits.length === 0) return null;

  return (
    <section className="pdp-section">
      <div className="pdp-section__head">
        <h2>Кому підійде цей товар</h2>
      </div>
      <div className="pdp-fit">
        {fits.length > 0 && (
          <div className="pdp-fit__col pdp-fit__col--yes">
            <h3>Підходить, якщо</h3>
            <ul>
              {fits.map((f) => (
                <li key={f}>
                  <Icon name="check" size={18} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {notFits.length > 0 && (
          <div className="pdp-fit__col pdp-fit__col--no">
            <h3>Може не підійти, якщо</h3>
            <ul>
              {notFits.map((f) => (
                <li key={f}>
                  <Icon name="arrow" size={18} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
