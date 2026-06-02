import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <div className="empty" style={{ margin: "60px 0" }}>
        <div className="empty__icon">💧</div>
        <h2>Сторінку не знайдено</h2>
        <p>На жаль, такої сторінки не існує або вона була переміщена.</p>
        <div style={{ marginTop: 16 }}>
          <Link href="/" className="btn btn--lg">
            На головну
          </Link>
        </div>
      </div>
    </div>
  );
}
