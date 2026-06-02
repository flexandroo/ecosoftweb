import Link from "next/link";
import { categories, products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const featured = products.filter((p) => p.badge).slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div>
            <h1>Чиста вода у вашому домі — щодня</h1>
            <p>
              Системи очищення води Ecosoft: зворотний осмос, фільтри-глечики,
              магістральні фільтри та пом'якшувачі. Перевірена якість і гарантія
              на всю продукцію.
            </p>
            <div className="hero__actions">
              <Link href="/catalog" className="btn btn--lg">
                Перейти до каталогу
              </Link>
              <Link href="/about" className="btn btn--lg btn--outline">
                Про компанію
              </Link>
            </div>
          </div>
          <div className="hero__art">💧</div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="features">
            <div className="feature">
              <div className="feature__icon">🛡️</div>
              <h3>Гарантія якості</h3>
              <p>Офіційна гарантія та сертифікати на всю продукцію.</p>
            </div>
            <div className="feature">
              <div className="feature__icon">🚚</div>
              <h3>Доставка по Україні</h3>
              <p>Відправлення Новою поштою у день замовлення.</p>
            </div>
            <div className="feature">
              <div className="feature__icon">🔧</div>
              <h3>Монтаж під ключ</h3>
              <p>Професійне встановлення та сервісне обслуговування.</p>
            </div>
            <div className="feature">
              <div className="feature__icon">💬</div>
              <h3>Консультація</h3>
              <p>Підберемо систему під ваш аналіз води безкоштовно.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section__head">
            <h2>Категорії товарів</h2>
            <p>Оберіть рішення під ваші потреби</p>
          </div>
          <div className="cats">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalog?category=${cat.slug}`}
                className="cat-tile"
              >
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section__head">
            <h2>Рекомендовані товари</h2>
            <p>Найпопулярніші системи очищення води</p>
          </div>
          <div className="grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
