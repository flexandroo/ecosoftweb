import Link from "next/link";
import {
  categories,
  products,
  getCategory,
  getSubcategory,
  productInCategory,
} from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Каталог",
};

export default function CatalogPage({
  searchParams,
}: {
  searchParams: { category?: string; subcategory?: string };
}) {
  const activeCat = searchParams.category;
  const activeSub = searchParams.subcategory;
  const category = activeCat ? getCategory(activeCat) : undefined;
  const subcategory =
    activeCat && activeSub ? getSubcategory(activeCat, activeSub) : undefined;

  const list = products.filter((p) =>
    productInCategory(p, activeCat, activeSub)
  );

  const heading = subcategory
    ? subcategory.title
    : category
    ? category.title
    : "Каталог товарів";
  const subheading = subcategory
    ? `${category?.title} — ${subcategory.title}`
    : category
    ? category.description
    : "Усі системи очищення води Ecosoft в одному місці.";

  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>{heading}</h1>
          <p>{subheading}</p>
        </div>
      </div>

      <div className="container">
        <div className="catalog">
          <aside className="filters">
            <h3>Категорії</h3>
            <Link href="/catalog" className={!activeCat ? "active" : ""}>
              Усі товари
            </Link>
            {categories.map((cat) => {
              const catActive = activeCat === cat.slug;
              return (
                <div className="filters__group" key={cat.slug}>
                  <Link
                    href={`/catalog?category=${cat.slug}`}
                    className={catActive && !activeSub ? "active" : ""}
                  >
                    {cat.title}
                  </Link>
                  {catActive && cat.subcategories.length > 0 && (
                    <div className="filters__sub">
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/catalog?category=${cat.slug}&subcategory=${sub.slug}`}
                          className={activeSub === sub.slug ? "active" : ""}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </aside>

          <div>
            {list.length === 0 ? (
              <div className="empty">
                <div className="empty__icon">
                  <Icon name="drop" />
                </div>
                <h2>Товари незабаром</h2>
                <p>
                  Цю категорію ми наповнюємо. Зверніться за консультацією — ми
                  підкажемо потрібне рішення під вашу воду.
                </p>
                <Link href="/contacts" className="btn btn--secondary">
                  <Icon name="headset" />
                  Отримати консультацію
                </Link>
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
