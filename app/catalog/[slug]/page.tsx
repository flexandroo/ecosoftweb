import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getProduct,
  getCategory,
  products,
  formatPrice,
} from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";
import Icon from "@/components/Icon";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  return { title: product ? product.name : "Товар" };
}

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const category = getCategory(product.category);

  return (
    <div className="container">
      <div className="product">
        <div className="product__media">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={564}
              height={564}
              priority
              className="product__img"
              sizes="(max-width: 800px) 100vw, 480px"
            />
          ) : (
            <Icon name={category?.icon ?? "drop"} />
          )}
        </div>
        <div className="product__info">
          <div className="breadcrumbs">
            <Link href="/catalog">Каталог</Link>
            {category && (
              <>
                {" / "}
                <Link href={`/catalog?category=${category.slug}`}>
                  {category.title}
                </Link>
              </>
            )}
          </div>
          <h1>{product.name}</h1>
          <span
            className={`stock ${product.inStock ? "stock--in" : "stock--out"}`}
          >
            <Icon name={product.inStock ? "check" : "arrow"} size={16} />
            {product.inStock ? "В наявності" : "Немає в наявності"}
          </span>

          <div className="product__price">
            <span className="product__price-now">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="product__price-old">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <div className="product__desc">
            {product.description.split("\n").map(
              (line, i) =>
                line.trim() && <p key={i}>{line}</p>
            )}
          </div>

          <ul className="product__features">
            {product.features.map((f) => (
              <li key={f}>
                <Icon name="check" />
                {f}
              </li>
            ))}
          </ul>

          <div style={{ maxWidth: 260 }}>
            <AddToCartButton id={product.id} disabled={!product.inStock} large />
          </div>
        </div>
      </div>
    </div>
  );
}
