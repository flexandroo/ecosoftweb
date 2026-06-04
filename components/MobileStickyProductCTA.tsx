"use client";

import Link from "next/link";
import Icon from "./Icon";
import AddToCartButton from "./AddToCartButton";
import { formatPrice } from "@/lib/products";

export default function MobileStickyProductCTA({
  id,
  price,
  inStock,
}: {
  id: string;
  price: number;
  inStock: boolean;
}) {
  return (
    <div className="pdp-sticky">
      <div className="pdp-sticky__price">
        <span className="pdp-sticky__price-label">Ціна</span>
        <span className="pdp-sticky__price-value">{formatPrice(price)}</span>
      </div>
      <div className="pdp-sticky__actions">
        <AddToCartButton id={id} disabled={!inStock} block={false} />
        <Link
          href="/contacts"
          className="pdp-sticky__icon-btn"
          aria-label="Консультація"
        >
          <Icon name="headset" size={20} />
        </Link>
      </div>
    </div>
  );
}
