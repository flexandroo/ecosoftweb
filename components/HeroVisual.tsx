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

        <svg
          className="hero__device"
          viewBox="0 0 340 320"
          fill="none"
          role="img"
          aria-label="Система очищення води Ecosoft"
        >
          <defs>
            <linearGradient id="hvHousing" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#e6f0f8" />
            </linearGradient>
            <linearGradient id="hvHead" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f3f8fc" />
              <stop offset="1" stopColor="#dbe8f3" />
            </linearGradient>
            <linearGradient id="hvTank" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#3acbe0" />
              <stop offset="1" stopColor="#0a82c9" />
            </linearGradient>
            <filter
              id="hvShadow"
              x="-25%"
              y="-25%"
              width="150%"
              height="150%"
            >
              <feDropShadow
                dx="0"
                dy="10"
                stdDeviation="12"
                floodColor="#0a4a73"
                floodOpacity="0.18"
              />
            </filter>
          </defs>

          <g filter="url(#hvShadow)">
            {/* storage tank */}
            <rect x="244" y="118" width="68" height="154" rx="26" fill="url(#hvTank)" />
            <rect x="260" y="100" width="36" height="24" rx="9" fill="#00ADEF" />
            <rect x="254" y="136" width="11" height="116" rx="5.5" fill="#ffffff" opacity="0.28" />

            {/* connecting tubes */}
            <path
              d="M196 82 C 226 72 240 80 270 104"
              stroke="#00ADEF"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M118 250 C 150 286 214 286 246 252"
              stroke="#19b6d8"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* manifold head */}
            <rect x="22" y="66" width="180" height="32" rx="13" fill="url(#hvHead)" />

            {/* three filter housings */}
            <g>
              <rect x="30" y="92" width="50" height="156" rx="18" fill="url(#hvHousing)" />
              <rect x="92" y="92" width="50" height="156" rx="18" fill="url(#hvHousing)" />
              <rect x="154" y="92" width="50" height="156" rx="18" fill="url(#hvHousing)" />
            </g>

            {/* collars */}
            <rect x="30" y="90" width="50" height="15" rx="7" fill="#00ADEF" opacity="0.92" />
            <rect x="92" y="90" width="50" height="15" rx="7" fill="#00ADEF" opacity="0.92" />
            <rect x="154" y="90" width="50" height="15" rx="7" fill="#00ADEF" opacity="0.92" />

            {/* housing highlights */}
            <rect x="38" y="116" width="9" height="108" rx="4.5" fill="#ffffff" opacity="0.7" />
            <rect x="100" y="116" width="9" height="108" rx="4.5" fill="#ffffff" opacity="0.7" />
            <rect x="162" y="116" width="9" height="108" rx="4.5" fill="#ffffff" opacity="0.7" />

            {/* drop emblem on center housing */}
            <circle cx="117" cy="170" r="17" fill="#eaf6fd" />
            <path
              d="M117 154 c 9 11 13 17 13 23 a 13 13 0 0 1 -26 0 c 0 -6 4 -12 13 -23 z"
              fill="#00ADEF"
            />
          </g>
        </svg>
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
