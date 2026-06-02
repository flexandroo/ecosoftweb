import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card">
      <Link href={`/catalog/${product.slug}`} className="card__media">
        <span className="card__emoji">💧</span>
        {product.badge && <span className="card__badge">{product.badge}</span>}
        {!product.inStock && (
          <span className="card__badge card__badge--out">Немає в наявності</span>
        )}
      </Link>
      <div className="card__body">
        <Link href={`/catalog/${product.slug}`} className="card__title">
          {product.name}
        </Link>
        <p className="card__desc">{product.shortDescription}</p>
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
