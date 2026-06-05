import Link from "next/link";
import Image from "next/image";
import { Product, formatPrice } from "@/lib/products";
import { localizeImage } from "@/lib/local-images";
import AddToCartButton from "./AddToCartButton";
import Icon from "./Icon";

function badgeClass(badge: string): string {
  const b = badge.toLowerCase();
  if (b.includes("хіт")) return "badge badge--hit";
  if (b.includes("новин")) return "badge badge--new";
  if (b.includes("акц")) return "badge badge--sale";
  if (b.includes("прем")) return "badge badge--premium";
  return "badge";
}

function audience(product: Product): string | null {
  switch (product.category) {
    case "reverse-osmosis":
    case "flow-filters":
      return "Питна вода";
    case "filtration-systems":
      return "Для будинку";
    case "mainline-filters":
      return "На вході води";
    case "ro-cartridges":
    case "mainline-cartridges":
      return "Картридж";
    case "filter-media":
      return "Засипка / реагент";
    case "horeca":
      return "Для бізнесу";
    default:
      return null;
  }
}

export default function ProductCard({ product }: { product: Product }) {
  const aud = audience(product);
  return (
    <article className="card">
      <Link href={`/catalog/${product.slug}`} className="card__media">
        {product.image ? (
          <Image
            src={localizeImage(product.image)!}
            alt={product.name}
            width={350}
            height={350}
            quality={90}
            className="card__img"
            sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 300px"
          />
        ) : (
          <Icon name="drop" />
        )}
        {aud && <span className="card__audience">{aud}</span>}
        <div className="card__badges">
          {product.badge ? (
            <span className={badgeClass(product.badge)}>{product.badge}</span>
          ) : (
            <span />
          )}
          {!product.inStock && (
            <span className="badge badge--out">Немає</span>
          )}
        </div>
      </Link>

      <div className="card__body">
        <Link href={`/catalog/${product.slug}`} className="card__title">
          {product.name}
        </Link>

        <ul className="card__specs">
          {product.features.slice(0, 3).map((f) => (
            <li className="card__spec" key={f}>
              <Icon name="check" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="card__price">
          <span className="card__price-now">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="card__price-old">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <AddToCartButton id={product.id} disabled={!product.inStock} />
      </div>
    </article>
  );
}
