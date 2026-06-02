import Image from "next/image";
import Icon from "./Icon";

export default function HeroVisual() {
  return (
    <div className="hero__visual">
      <div className="hero__stage" aria-hidden="true">
        <span className="hero__glow hero__glow--1" />
        <span className="hero__glow hero__glow--2" />

        <span className="bubble bubble--1" />
        <span className="bubble bubble--2" />
        <span className="bubble bubble--3" />
        <span className="bubble bubble--4" />
        <span className="bubble bubble--5" />
        <span className="bubble bubble--6" />

        <Image
          className="hero__device"
          src="/hero-device.png"
          alt="Система очищення води Ecosoft CROSS 90 Balance"
          width={564}
          height={564}
          priority
        />
      </div>

      <div className="glass-card glass-card--tl">
        <Icon name="shield" />
        <div>
          <div className="gc__num">99,8%</div>
          <div className="gc__label">очищення води</div>
        </div>
      </div>
      <div className="glass-card glass-card--br">
        <Icon name="award" />
        <div>
          <div className="gc__num">20+</div>
          <div className="gc__label">років досвіду</div>
        </div>
      </div>
    </div>
  );
}
