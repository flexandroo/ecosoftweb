"use client";

import { useState } from "react";
import { useCart } from "./CartContext";

export default function AddToCartButton({
  id,
  disabled = false,
  large = false,
}: {
  id: string;
  disabled?: boolean;
  large?: boolean;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    add(id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  if (disabled) {
    return (
      <button className={`btn btn--ghost${large ? " btn--lg" : ""}`} disabled>
        Немає в наявності
      </button>
    );
  }

  return (
    <button
      className={`btn${large ? " btn--lg" : ""}${added ? " btn--added" : ""}`}
      onClick={handleClick}
    >
      {added ? "✓ Додано" : "У кошик"}
    </button>
  );
}
