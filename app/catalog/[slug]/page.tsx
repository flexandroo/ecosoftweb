import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProduct,
  getCategory,
  getSubcategory,
  products,
  formatPrice,
} from "@/lib/products";
import { getProductDetails } from "@/lib/product-details";
import AddToCartButton from "@/components/AddToCartButton";
import ProductGallery from "@/components/ProductGallery";
import ProductDetails from "@/components/ProductDetails";
import Icon from "@/components/Icon";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  return {
    title: product ? product.name : "Товар",
    description: product?.shortDescription,
  };
}

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const details = getProductDetails(product.slug);
  const images = details?.images ?? [];
  const labels = details?.labels ?? [];
  const category = getCategory(product.category);
  const subcategory = product.subcategory
    ? getSubcategory(product.category, product.subcategory)
    : undefined;

  return (
    <div className="container">
      <div className="breadcrumbs breadcrumbs--top">
        <Link href="/catalog">Каталог</Link>
        {category && (
          <>
            <span aria-hidden="true">/</span>
            <Link href={`/catalog?category=${category.slug}`}>
              {category.title}
            </Link>
          </>
        )}
        {category && subcategory && (
          <>
            <span aria-hidden="true">/</span>
            <Link
              href={`/catalog?category=${category.slug}&subcategory=${subcategory.slug}`}
            >
              {subcategory.title}
            </Link>
          </>
        )}
      </div>

      <div className="pdp">
        <ProductGallery images={images} name={product.name} />

        <div className="pdp__buy">
          {(product.badge || labels.length > 0) && (
            <div className="pdp__labels">
              {product.badge && (
                <span className="pdp__label pdp__label--badge">
                  {product.badge}
                </span>
              )}
              {labels
                .filter((l) => l !== product.badge)
                .slice(0, 4)
                .map((l) => (
                  <span className="pdp__label" key={l}>
                    {l}
                  </span>
                ))}
            </div>
          )}

          <h1 className="pdp__title">{product.name}</h1>

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
          </div>

          {product.features.length > 0 && (
            <ul className="pdp__features">
              {product.features.map((f) => (
                <li key={f}>
                  <Icon name="check" />
                  {f}
                </li>
              ))}
            </ul>
          )}

          <div className="pdp__trust">
            <span>
              <Icon name="truck" size={18} />
              Доставка по Україні
            </span>
            <span>
              <Icon name="wrench" size={18} />
              Монтаж під ключ
            </span>
            <span>
              <Icon name="headset" size={18} />
              Консультація
            </span>
          </div>
        </div>
      </div>

      {details && (
        <ProductDetails
          description={details.description}
          specs={details.specs}
          sections={details.sections}
          documents={details.documents}
          reviews={details.reviews}
          reviewCount={details.reviewCount}
        />
      )}
    </div>
  );
}
