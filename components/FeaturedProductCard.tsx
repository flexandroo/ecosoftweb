import Link from "next/link";
import Image from "next/image";
import { Product, formatPrice } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";
import Icon from "./Icon";

// Human-readable audience label derived from the product's primary category,
// so each card explains *who* the system is for at a glance.
function audience(product: Product): string {
  switch (product.category) {
    case "reverse-osmosis":
    case "flow-filters":
      return "Для питної води";
    case "filtration-systems":
    case "mainline-filters":
      return "Для будинку";
    case "ro-cartridges":
    case "mainline-cartridges":
      return "Змінний картридж";
    case "filter-media":
      return "Завантаження для систем";
    case "horeca":
      return "Для бізнесу";
    default:
      return "Рішення Ecosoft";
  }
}

function badgeClass(badge: string): string {
  const b = badge.toLowerCase();
  if (b.includes("хіт")) return "badge badge--hit";
  if (b.includes("новин")) return "badge badge--new";
  if (b.includes("акц")) return "badge badge--sale";
  if (b.includes("прем")) return "badge badge--premium";
  return "badge";
}

export default function FeaturedProductCard({ product }: { product: Product }) {
  const href = `/catalog/${product.slug}`;
  return (
    <article className="fcard">
      <Link href={href} className="fcard__media">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            quality={92}
            className="fcard__img"
            sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 320px"
          />
        ) : (
          <Icon name="drop" />
        )}
        <span className="fcard__audience">{audience(product)}</span>
        {product.badge && (
          <span className={`${badgeClass(product.badge)} fcard__badge`}>
            {product.badge}
          </span>
        )}
      </Link>

      <div className="fcard__body">
        <Link href={href} className="fcard__title">
          {product.name}
        </Link>

        {product.shortDescription && (
          <p className="fcard__desc">{product.shortDescription}</p>
        )}

        {product.features.length > 0 && (
          <ul className="fcard__features">
            {product.features.slice(0, 3).map((f) => (
              <li key={f}>
                <Icon name="check" size={15} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="fcard__footer">
          <div className="fcard__price">
            <span className="fcard__price-now">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="fcard__price-old">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <div className="fcard__actions">
            <Link href={href} className="btn btn--block">
              Детальніше
              <Icon name="arrow" size={18} />
            </Link>
            <AddToCartButton
              id={product.id}
              disabled={!product.inStock}
              variant="outline"
            />
          </div>
          <Link href="/contacts" className="fcard__consult">
            <Icon name="headset" size={16} />
            Проконсультуватися
          </Link>
        </div>
      </div>
    </article>
  );
}
