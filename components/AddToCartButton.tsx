"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import Icon from "./Icon";

export default function AddToCartButton({
  id,
  disabled = false,
  large = false,
  block = true,
  variant = "solid",
}: {
  id: string;
  disabled?: boolean;
  large?: boolean;
  block?: boolean;
  variant?: "solid" | "outline";
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    add(id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const cls = [
    "btn",
    variant === "outline" && !added ? "btn--outline" : "",
    large ? "btn--lg" : "btn--sm",
    block ? "btn--block" : "",
    added ? "btn--added" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (disabled) {
    return (
      <button
        className={`btn btn--ghost${large ? " btn--lg" : " btn--sm"}${
          block ? " btn--block" : ""
        }`}
        disabled
      >
        Немає в наявності
      </button>
    );
  }

  return (
    <button className={cls} onClick={handleClick}>
      {added ? (
        <>
          <Icon name="check" /> Додано
        </>
      ) : (
        <>
          <Icon name="drop" /> У кошик
        </>
      )}
    </button>
  );
}
