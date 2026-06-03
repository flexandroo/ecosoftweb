"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Product photos that rotate inside the hero stage. Drop the files into
// /public to add or swap shots — the rotation adapts automatically.
const slides = [
  "/hero-device.png",
  "/hero-device-2.webp",
  "/hero-device-3.webp",
];

const INTERVAL = 5000;

export default function HeroDevice() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hero2__device" aria-hidden="true">
      {slides.map((src, i) => (
        <Image
          key={src}
          className={`hero2__slide${i === active ? " is-active" : ""}`}
          src={src}
          alt=""
          width={564}
          height={564}
          priority={i === 0}
          sizes="(max-width: 960px) 0px, 460px"
        />
      ))}
    </div>
  );
}
