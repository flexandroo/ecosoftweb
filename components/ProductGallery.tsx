"use client";

import { useState } from "react";
import Image from "next/image";
import { localizeImage } from "@/lib/local-images";
import Icon from "./Icon";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const gallery = images.filter(Boolean).map((u) => localizeImage(u)!);

  if (gallery.length === 0) {
    return (
      <div className="gallery">
        <div className="gallery__main gallery__main--empty">
          <Icon name="drop" />
        </div>
      </div>
    );
  }

  const current = gallery[Math.min(active, gallery.length - 1)];

  return (
    <div className="gallery">
      <div className="gallery__main">
        <Image
          key={current}
          src={current}
          alt={name}
          width={600}
          height={600}
          priority
          quality={92}
          className="gallery__img"
          sizes="(max-width: 800px) 100vw, 480px"
        />
      </div>

      {gallery.length > 1 && (
        <div className="gallery__thumbs" role="tablist" aria-label="Фото товару">
          {gallery.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Фото ${i + 1}`}
              className={`gallery__thumb${i === active ? " is-active" : ""}`}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
            >
              <Image
                src={src}
                alt=""
                width={80}
                height={80}
                quality={90}
                className="gallery__thumb-img"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
