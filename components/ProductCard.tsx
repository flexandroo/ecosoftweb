import Link from "next/link";
import Image from "next/image";
import { Product, formatPrice } from "@/lib/products";
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

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card">
      <Link href={`/catalog/${product.slug}`} className="card__media">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={350}
            height={350}
            className="card__img"
            sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 300px"
          />
        ) : (
          <Icon name="drop" />
        )}
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
