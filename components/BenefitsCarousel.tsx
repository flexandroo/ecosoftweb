"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Icon, { IconName } from "./Icon";

type Benefit = { icon: IconName; title: string; text: string };

export default function BenefitsCarousel({ items }: { items: Benefit[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 2);
    setCanNext(el.scrollLeft < maxScroll - 2);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".benefit");
    const step = card ? card.offsetWidth + 22 /* gap */ : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="benefits-carousel">
      <button
        type="button"
        className="benefits-carousel__arrow benefits-carousel__arrow--prev"
        aria-label="Попередня перевага"
        onClick={() => scrollByCard(-1)}
        disabled={!canPrev}
      >
        <Icon name="arrow" size={20} />
      </button>

      <div className="benefits-carousel__viewport">
        <div className="benefits-carousel__track" ref={trackRef}>
          {items.map((b) => (
            <div className="benefit" key={b.title}>
              <div className="benefit__icon">
                <Icon name={b.icon} size={24} />
              </div>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="benefits-carousel__arrow benefits-carousel__arrow--next"
        aria-label="Наступна перевага"
        onClick={() => scrollByCard(1)}
        disabled={!canNext}
      >
        <Icon name="arrow" size={20} />
      </button>
    </div>
  );
}
