"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, Category } from "@/lib/products";
import ProductCard from "./ProductCard";
import Icon, { IconName } from "./Icon";

type CatMeta = {
  slug: string;
  title: string;
  icon: IconName;
  count: number;
  image: string | null;
};

// Facets derived from the short "характеристики" shown on each product card.
// We normalise the free-text feature strings into a handful of meaningful
// options (synonyms collapse into one) so the catalog can be filtered.
type FeatureFacet = { key: string; label: string; match: (s: string) => boolean };

const FEATURE_FACETS: FeatureFacet[] = [
  {
    key: "mineral",
    label: "Збагачує мінералами",
    match: (s) => s.startsWith("збагачує") || s.includes("мінерал"),
  },
  { key: "compact", label: "Компактний", match: (s) => s.includes("компакт") },
  {
    key: "smart",
    label: "Смарт-індикація",
    match: (s) => s.includes("смарт") || s.includes("індикац") || s.includes("дисплей"),
  },
  {
    key: "lowpressure",
    label: "Для низького тиску",
    match: (s) => s.includes("низьк") && s.includes("тиск"),
  },
  {
    key: "reserve",
    label: "Із запасом води",
    match: (s) => s.includes("запас води"),
  },
  { key: "coffee", label: "Підходить для кави", match: (s) => s.includes("кав") },
];

type PriceBucket = { key: string; label: string; test: (p: number) => boolean };

const PRICE_BUCKETS: PriceBucket[] = [
  { key: "lt5", label: "До 5 000 ₴", test: (p) => p < 5000 },
  { key: "5-15", label: "5 000 – 15 000 ₴", test: (p) => p >= 5000 && p < 15000 },
  { key: "15-30", label: "15 000 – 30 000 ₴", test: (p) => p >= 15000 && p < 30000 },
  { key: "gt30", label: "Понад 30 000 ₴", test: (p) => p >= 30000 },
];

function productFacetKeys(p: Product): Set<string> {
  const keys = new Set<string>();
  for (const f of p.features) {
    const s = f.toLowerCase();
    for (const facet of FEATURE_FACETS) if (facet.match(s)) keys.add(facet.key);
  }
  return keys;
}

export default function CatalogView({
  products,
  categories,
  catMeta,
  totalCount,
  activeCat,
  activeSub,
}: {
  products: Product[];
  categories: Category[];
  catMeta: CatMeta[];
  totalCount: number;
  activeCat?: string;
  activeSub?: string;
}) {
  const activeCategory = activeCat
    ? categories.find((c) => c.slug === activeCat)
    : undefined;
  const [selFeatures, setSelFeatures] = useState<Set<string>>(new Set());
  const [selPrice, setSelPrice] = useState<Set<string>>(new Set());
  const [inStockOnly, setInStockOnly] = useState(false);

  // Precompute each product's facet keys once per list.
  const withKeys = useMemo(
    () => products.map((p) => ({ p, keys: productFacetKeys(p) })),
    [products]
  );

  // Counts so we can hide empty facets and show how many match each option.
  const featureCounts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const { keys } of withKeys) keys.forEach((k) => (c[k] = (c[k] || 0) + 1));
    return c;
  }, [withKeys]);

  const priceCounts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const { p } of withKeys)
      for (const b of PRICE_BUCKETS) if (b.test(p.price)) c[b.key] = (c[b.key] || 0) + 1;
    return c;
  }, [withKeys]);

  const stockCount = useMemo(
    () => withKeys.filter(({ p }) => p.inStock).length,
    [withKeys]
  );

  const availFeatures = FEATURE_FACETS.filter((f) => featureCounts[f.key] > 0);
  const availPrice = PRICE_BUCKETS.filter((b) => priceCounts[b.key] > 0);

  const filtered = useMemo(() => {
    return withKeys
      .filter(({ p, keys }) => {
        if (inStockOnly && !p.inStock) return false;
        if (selPrice.size) {
          const ok = PRICE_BUCKETS.some((b) => selPrice.has(b.key) && b.test(p.price));
          if (!ok) return false;
        }
        if (selFeatures.size) {
          // OR within the "Особливості" group: match any selected feature.
          let ok = false;
          for (const k of selFeatures) if (keys.has(k)) { ok = true; break; }
          if (!ok) return false;
        }
        return true;
      })
      .map(({ p }) => p);
  }, [withKeys, selFeatures, selPrice, inStockOnly]);

  const anyFilter = selFeatures.size > 0 || selPrice.size > 0 || inStockOnly;

  function toggle(
    set: Set<string>,
    setter: (s: Set<string>) => void,
    key: string
  ) {
    const next = new Set(set);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setter(next);
  }

  function reset() {
    setSelFeatures(new Set());
    setSelPrice(new Set());
    setInStockOnly(false);
  }

  return (
    <>
      {/* Category strip — image + title + count cards */}
      <nav className="catstrip" aria-label="Категорії">
        <Link
          href="/catalog"
          className={`catcard${!activeCat ? " is-active" : ""}`}
        >
          <span className="catcard__media catcard__media--all">
            <Icon name="grid" size={26} />
          </span>
          <span className="catcard__title">Всі категорії</span>
          <span className="catcard__count">{totalCount}</span>
        </Link>
        {catMeta.map((c) => (
          <Link
            key={c.slug}
            href={`/catalog?category=${c.slug}`}
            className={`catcard${activeCat === c.slug ? " is-active" : ""}`}
          >
            <span className="catcard__media">
              {c.image ? (
                <Image
                  src={c.image}
                  alt=""
                  width={104}
                  height={76}
                  className="catcard__img"
                  sizes="120px"
                />
              ) : (
                <Icon name={c.icon} size={30} />
              )}
            </span>
            <span className="catcard__title">{c.title}</span>
            <span className="catcard__count">{c.count}</span>
          </Link>
        ))}
      </nav>

      {/* Subcategory chips for the active category */}
      {activeCategory && activeCategory.subcategories.length > 0 && (
        <div className="subchips">
          <Link
            href={`/catalog?category=${activeCat}`}
            className={!activeSub ? "is-active" : ""}
          >
            Усі
          </Link>
          {activeCategory.subcategories.map((sub) => (
            <Link
              key={sub.slug}
              href={`/catalog?category=${activeCat}&subcategory=${sub.slug}`}
              className={activeSub === sub.slug ? "is-active" : ""}
            >
              {sub.title}
            </Link>
          ))}
        </div>
      )}

      <div className="catalog">
        <aside className="filters">
          {(availFeatures.length > 0 || availPrice.length > 0) && (
            <div className="facets facets--top">
              <div className="facets__top">
                <h3>Фільтри</h3>
                {anyFilter && (
                  <button
                    type="button"
                    className="facets__reset"
                    onClick={reset}
                  >
                    Скинути
                  </button>
                )}
              </div>

            {availFeatures.length > 0 && (
              <div className="facet">
                <span className="facet__title">Особливості</span>
                {availFeatures.map((f) => (
                  <label key={f.key} className="facet__opt">
                    <input
                      type="checkbox"
                      checked={selFeatures.has(f.key)}
                      onChange={() => toggle(selFeatures, setSelFeatures, f.key)}
                    />
                    <span className="facet__label">{f.label}</span>
                    <span className="facet__count">{featureCounts[f.key]}</span>
                  </label>
                ))}
              </div>
            )}

            {availPrice.length > 0 && (
              <div className="facet">
                <span className="facet__title">Ціна</span>
                {availPrice.map((b) => (
                  <label key={b.key} className="facet__opt">
                    <input
                      type="checkbox"
                      checked={selPrice.has(b.key)}
                      onChange={() => toggle(selPrice, setSelPrice, b.key)}
                    />
                    <span className="facet__label">{b.label}</span>
                    <span className="facet__count">{priceCounts[b.key]}</span>
                  </label>
                ))}
              </div>
            )}

            {stockCount > 0 && (
              <div className="facet">
                <span className="facet__title">Наявність</span>
                <label className="facet__opt">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={() => setInStockOnly((v) => !v)}
                  />
                  <span className="facet__label">Лише в наявності</span>
                  <span className="facet__count">{stockCount}</span>
                </label>
              </div>
            )}
          </div>
        )}
      </aside>

      <div>
        <div className="catalog__bar">
          <span className="catalog__count">
            Знайдено: <strong>{filtered.length}</strong>
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty">
            <div className="empty__icon">
              <Icon name="drop" />
            </div>
            <h2>Нічого не знайдено</h2>
            <p>
              За обраними фільтрами немає товарів. Спробуйте змінити умови або
              зверніться за консультацією — підкажемо рішення під вашу воду.
            </p>
            {anyFilter ? (
              <button type="button" className="btn btn--secondary" onClick={reset}>
                <Icon name="arrow" />
                Скинути фільтри
              </button>
            ) : (
              <Link href="/contacts" className="btn btn--secondary">
                <Icon name="headset" />
                Отримати консультацію
              </Link>
            )}
          </div>
        ) : (
          <div className="grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
      </div>
    </>
  );
}
