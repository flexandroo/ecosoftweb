import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProduct,
  getCategory,
  getSubcategory,
  products,
} from "@/lib/products";
import { getProductDetails } from "@/lib/product-details";
import {
  getProductTemplate,
  pickKeySpecs,
  splitSections,
  parseInclusion,
} from "@/lib/product-template";

import ProductHero from "@/components/ProductHero";
import ProductFitBlock from "@/components/ProductFitBlock";
import ProductProblemBlock from "@/components/ProductProblemBlock";
import ProductKeyBenefits from "@/components/ProductKeyBenefits";
import ProductHowItWorks from "@/components/ProductHowItWorks";
import ProductMainSpecs from "@/components/ProductMainSpecs";
import ProductAllSpecsAccordion from "@/components/ProductAllSpecsAccordion";
import ProductMaintenanceBlock from "@/components/ProductMaintenanceBlock";
import ProductTabs from "@/components/ProductTabs";
import ProductConsultationCTA from "@/components/ProductConsultationCTA";
import MobileStickyProductCTA from "@/components/MobileStickyProductCTA";
import FAQ from "@/components/FAQ";

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

/* ----------------------------------------------------------------- */
/*  PDP composition is intentionally short — 10 sections, no         */
/*  duplicate CTAs, supplementary material lives behind the tabs:    */
/*                                                                   */
/*    Hero → Fit → Що вирішує → Чому ця модель → Як це працює →      */
/*    Основні характеристики (+ accordion) → Обслуговування →        */
/*    Tabs (Комплект · Документи · Гарантія · Опис) →                */
/*    FAQ → Reviews(compact) → Final CTA → Mobile sticky.            */
/* ----------------------------------------------------------------- */

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
  const specs = details?.specs ?? [];
  const sections = details?.sections ?? [];
  const documents = details?.documents ?? [];
  const description = details?.description ?? "";

  const category = getCategory(product.category);
  const subcategory = product.subcategory
    ? getSubcategory(product.category, product.subcategory)
    : undefined;

  const template = getProductTemplate(product);
  const keyHighlights = pickKeySpecs(specs, template.keySpecNames).slice(0, 4);
  const mainSpecs = pickKeySpecs(specs, template.keySpecNames);
  const groups = splitSections(sections);
  const inclusion = parseInclusion(specs);

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

      {/* 1 — Hero */}
      <ProductHero
        product={product}
        images={images}
        labels={labels}
        subtitle={template.subtitle}
        keyHighlights={keyHighlights}
      />

      {/* 2 — Кому підходить */}
      <ProductFitBlock fits={template.fits} notFits={template.notFits} />

      {/* 3 — Що вирішує */}
      <ProductProblemBlock items={template.problems} />

      {/* 4 — Чому варто обрати цю модель */}
      <ProductKeyBenefits items={template.keyBenefits} />

      {/* 5 — Як це працює */}
      <ProductHowItWorks
        steps={template.howItWorks}
        fallbackText={groups.howItWorks?.body}
      />

      {/* 6 — Основні характеристики + Усі характеристики */}
      <ProductMainSpecs items={mainSpecs} />
      <ProductAllSpecsAccordion specs={specs} />

      {/* 7 — Обслуговування */}
      <ProductMaintenanceBlock
        intro={template.maintenance}
        schedule={template.maintenanceSchedule}
        important={template.maintenanceImportant}
        sourceText={groups.maintenance?.body}
      />

      {/* 8 — Tabs (Комплект · Документи · Гарантія · Опис) */}
      <ProductTabs
        inclusion={inclusion}
        documents={documents}
        description={description}
        groups={groups}
      />

      {/* 9 — FAQ (per bundle, hidden when empty) */}
      {template.faq.length > 0 && (
        <section className="pdp-section">
          <FAQ items={template.faq} title="Поширені запитання" />
        </section>
      )}

      {/* Final CTA */}
      <ProductConsultationCTA variant="dark" />

      <MobileStickyProductCTA
        id={product.id}
        price={product.price}
        inStock={product.inStock}
      />
    </div>
  );
}
