"use client";

import { useState } from "react";
import Icon from "./Icon";
import type { Spec } from "@/lib/products";

export default function ProductAllSpecsAccordion({
  specs,
}: {
  specs: Spec[];
}) {
  const [open, setOpen] = useState(false);
  if (specs.length === 0) return null;

  return (
    <div className="pdp-allspecs">
      <button
        type="button"
        className="pdp-allspecs__toggle"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{open ? "Сховати усі характеристики" : "Усі технічні характеристики"}</span>
        <Icon name="arrow" size={20} />
      </button>
      {open && (
        <table className="specs pdp-allspecs__table">
          <tbody>
            {specs.map((s, i) => (
              <tr key={i}>
                <th scope="row">{s.name}</th>
                <td>{s.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
