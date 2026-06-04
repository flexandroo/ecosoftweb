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
import ProductKeyBenefits from "@/components/ProductKeyBenefits";
import ProductProblemBlock from "@/components/ProductProblemBlock";
import ProductHowItWorks from "@/components/ProductHowItWorks";
import ProductMainSpecs from "@/components/ProductMainSpecs";
import ProductAllSpecsAccordion from "@/components/ProductAllSpecsAccordion";
import ProductIncludedSet from "@/components/ProductIncludedSet";
import ProductMaintenanceBlock from "@/components/ProductMaintenanceBlock";
import ProductDocuments from "@/components/ProductDocuments";
import ProductReviews from "@/components/ProductReviews";
import ProductConsultationCTA from "@/components/ProductConsultationCTA";
import ProductExtraAccordion from "@/components/ProductExtraAccordion";
import MobileStickyProductCTA from "@/components/MobileStickyProductCTA";

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
  const specs = details?.specs ?? [];
  const sections = details?.sections ?? [];
  const documents = details?.documents ?? [];
  const reviews = details?.reviews ?? [];
  const reviewCount = details?.reviewCount ?? 0;
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

      <ProductHero
        product={product}
        images={images}
        labels={labels}
        subtitle={template.subtitle}
        keyHighlights={keyHighlights}
      />

      <ProductFitBlock fits={template.fits} notFits={template.notFits} />

      <ProductKeyBenefits features={product.features} />

      <ProductProblemBlock items={template.problems} />

      <ProductHowItWorks
        steps={
          // Prefer data section text → split into steps as paragraphs;
          // fall back to the per-category template steps.
          template.howItWorks
        }
        fallbackText={groups.howItWorks?.body}
      />

      <ProductMainSpecs items={mainSpecs} />

      <ProductAllSpecsAccordion specs={specs} />

      <ProductIncludedSet items={inclusion} />

      <ProductConsultationCTA variant="soft" />

      <ProductMaintenanceBlock
        text={template.maintenance}
        sourceText={groups.maintenance?.body}
      />

      <ProductDocuments documents={documents} />

      <ProductExtraAccordion
        description={description}
        extras={[
          ...(groups.warranty ? [groups.warranty] : []),
          ...(groups.keyFeatures ? [groups.keyFeatures] : []),
          ...groups.other,
        ]}
      />

      <ProductReviews reviews={reviews} reviewCount={reviewCount} />

      <ProductConsultationCTA variant="dark" />

      <MobileStickyProductCTA
        id={product.id}
        price={product.price}
        inStock={product.inStock}
      />
    </div>
  );
}
