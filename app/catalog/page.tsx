import {
  categories,
  products,
  getCategory,
  getSubcategory,
  productInCategory,
} from "@/lib/products";
import CatalogView from "@/components/CatalogView";

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
        <CatalogView
          products={list}
          categories={categories}
          activeCat={activeCat}
          activeSub={activeSub}
        />
      </div>
    </>
  );
}
