import type { Product } from '../../data/products'
import { Link } from 'react-router'
import { Icon } from '../ui/Icon'
import { ProductGrid } from './ProductGrid'

interface Props {
  id: string
  title: string
  eyebrow: string
  products: Product[]
  favoriteIds: ReadonlySet<string>
  onFavorite: (id: string) => void
  onAdd: (id: string) => void
  newArrivals?: boolean
}

export function ProductSection({ id, title, eyebrow, products, favoriteIds, onFavorite, onAdd, newArrivals = false }: Props) {
  const headingId = `${id}-title`
  return <section className={`products-section ${newArrivals ? 'new-section ' : ''}page-shell`} id={id} aria-labelledby={headingId}>
    <div className="section-heading">
      <div><p className="eyebrow">{eyebrow}</p><h2 id={headingId}>{title}</h2></div>
      {newArrivals ? <span className="section-note"><Icon name="sparkle" /> اختيارات جديدة لأيام أجمل</span> : <Link className="text-link" to="/products">اكتشفي المزيد <Icon name="arrow" /></Link>}
    </div>
    <p className="results-message" aria-live="polite">{products.length ? '' : 'ما لقينا منتجات مطابقة، جرّبي كلمة أو قسماً آخر.'}</p>
    <ProductGrid products={products} favoriteIds={favoriteIds} onFavorite={onFavorite} onAdd={onAdd} ariaLabel={newArrivals ? 'أحدث المنتجات في Smile Store' : 'منتجات Smile Store الأكثر مبيعاً'} />
  </section>
}
