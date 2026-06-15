"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import QuizLink from "./QuizLink";

/**
 * Premium hero with a seamlessly-looping cinematic video of a glass of water
 * next to the Ecosoft CROSS Balance system. Falls back to a static poster
 * for users with prefers-reduced-motion or browsers that block autoplay.
 */
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return (
    <section className="hv" aria-label="Системи очищення води Ecosoft">
      <div className="hv__media" aria-hidden="true">
        {reduce ? (
          <Image
            src="/hero-cross-poster.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hv__poster"
          />
        ) : (
          <video
            ref={videoRef}
            className="hv__video"
            poster="/hero-cross-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source
              src="/hero-cross.mp4"
              type="video/mp4"
              media="(min-width: 1024px)"
            />
            <source src="/hero-cross-720.mp4" type="video/mp4" />
          </video>
        )}
        <span className="hv__veil" />
      </div>

      <div className="container hv__inner">
        <div className="hv__content">
          <span className="eyebrow">
            <Icon name="sparkle" />
            Експертний підбір води для дому
          </span>
          <h1 className="hv__title">
            Підберемо систему очищення води під ваш дім
          </h1>
          <p className="hv__lead">
            Допомагаємо обрати, встановити та обслуговувати системи Ecosoft —
            від квартири до будинку зі свердловиною.
          </p>

          <div className="hv__actions">
            <QuizLink className="btn btn--lg">
              <Icon name="sparkle" />
              Підібрати систему
            </QuizLink>
            <Link href="/catalog" className="btn btn--lg btn--outline">
              Переглянути каталог
            </Link>
          </div>

          <ul className="hv__trust">
            <li>
              <Icon name="check" size={16} />
              За аналізом води
            </li>
            <li>
              <Icon name="check" size={16} />
              Монтаж під ключ
            </li>
            <li>
              <Icon name="check" size={16} />
              Сервіс після встановлення
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
