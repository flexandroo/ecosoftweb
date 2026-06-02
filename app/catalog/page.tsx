import Link from "next/link";
import { categories, products, getCategory } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Каталог",
};

export default function CatalogPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const activeCat = searchParams.category;
  const category = activeCat ? getCategory(activeCat) : undefined;
  const list = activeCat
    ? products.filter((p) => p.category === activeCat)
    : products;

  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>{category ? category.title : "Каталог товарів"}</h1>
          <p>
            {category
              ? category.description
              : "Усі системи очищення води Ecosoft в одному місці."}
          </p>
        </div>
      </div>

      <div className="container">
        <div className="catalog">
          <aside className="filters">
            <h3>Категорії</h3>
            <Link href="/catalog" className={!activeCat ? "active" : ""}>
              Усі товари
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalog?category=${cat.slug}`}
                className={activeCat === cat.slug ? "active" : ""}
              >
                {cat.title}
              </Link>
            ))}
          </aside>

          <div>
            {list.length === 0 ? (
              <div className="empty">
                <div className="empty__icon">🔍</div>
                <p>Товарів у цій категорії поки немає.</p>
              </div>
            ) : (
              <div className="grid">
                {list.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
