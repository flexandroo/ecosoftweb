import Link from "next/link";
import Icon from "./Icon";
import ProductGallery from "./ProductGallery";
import AddToCartButton from "./AddToCartButton";
import { formatPrice } from "@/lib/products";
import type { Product, Spec } from "@/lib/products";

export default function ProductHero({
  product,
  images,
  labels,
  subtitle,
  keyHighlights,
}: {
  product: Product;
  images: string[];
  labels: string[];
  subtitle: string;
  keyHighlights: Spec[];
}) {
  const extraLabels = labels.filter((l) => l !== product.badge).slice(0, 4);

  return (
    <div className="pdp">
      <ProductGallery images={images} name={product.name} />

      <div className="pdp__buy">
        {(product.badge || extraLabels.length > 0) && (
          <div className="pdp__labels">
            {product.badge && (
              <span className="pdp__label pdp__label--badge">
                {product.badge}
              </span>
            )}
            {extraLabels.map((l) => (
              <span className="pdp__label" key={l}>
                {l}
              </span>
            ))}
          </div>
        )}

        <h1 className="pdp__title">{product.name}</h1>
        <p className="pdp__subtitle">{subtitle}</p>

        <div className="pdp__meta">
          <span>
            Код: <strong>{product.sku}</strong>
          </span>
          {product.brand && (
            <span>
              Бренд: <strong>{product.brand}</strong>
            </span>
          )}
          <span
            className={`stock ${product.inStock ? "stock--in" : "stock--out"}`}
          >
            <Icon name={product.inStock ? "check" : "arrow"} size={16} />
            {product.inStock ? "В наявності" : "Немає в наявності"}
          </span>
        </div>

        <div className="pdp__price">
          <span className="pdp__price-now">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="pdp__price-old">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <div className="pdp__cta">
          <AddToCartButton id={product.id} disabled={!product.inStock} large />
          <Link href="/contacts" className="btn btn--lg btn--outline pdp__cta-secondary">
            <Icon name="headset" />
            Підібрати з консультантом
          </Link>
          <Link href="/contacts" className="pdp__cta-link">
            Не впевнені, чи підійде? Напишіть нам
            <Icon name="arrow" size={16} />
          </Link>
        </div>

        {keyHighlights.length > 0 && (
          <ul className="pdp__highlights">
            {keyHighlights.slice(0, 6).map((s) => (
              <li key={s.name}>
                <span className="pdp__highlights-name">{s.name}</span>
                <span className="pdp__highlights-value">{s.value}</span>
              </li>
            ))}
          </ul>
        )}

        {product.features.length > 0 && (
          <ul className="pdp__features">
            {product.features.slice(0, 4).map((f) => (
              <li key={f}>
                <Icon name="check" />
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="pdp__trust">
          <span>
            <Icon name="shield" size={18} />
            Гарантія виробника
          </span>
          <span>
            <Icon name="truck" size={18} />
            Доставка по Україні
          </span>
          <span>
            <Icon name="wrench" size={18} />
            Монтаж під ключ
          </span>
          <span>
            <Icon name="award" size={18} />
            Офіційна продукція
          </span>
        </div>
      </div>
    </div>
  );
}
