import type { Product } from '../../data/storeProducts'
import { formatNumber } from '../../data/storeProducts'
import { Icon } from '../ui/Icon'
import { Link } from 'react-router'

interface Props {
  product: Product
  favorite: boolean
  onFavorite: (id: string) => void
  onAdd: (id: string, variant?: string) => void
}

export function ProductCard({ product, favorite, onFavorite, onAdd }: Props) {
  const badgeClass = product.discount === 'جديد' ? 'product-badge badge-new' : 'product-badge'
  return <article className="product-card" data-product-id={product.id}>
    <div className="product-media">
      <Link className="product-image-link" to={`/product/${product.slug}`} aria-label={`عرض تفاصيل ${product.name}`}><img src={product.image} alt={product.name} loading="lazy" width="900" height="1125" onError={(event) => { const fallback = product.gallery?.[0]; if (fallback && event.currentTarget.src !== new URL(fallback, window.location.href).href) event.currentTarget.src = fallback; else event.currentTarget.style.visibility = 'hidden' }} /></Link>
      <span className={badgeClass}>{product.discountSource === 'mock_demo' ? `عرض تجريبي ${product.discount}` : product.discount}</span>
      <button className="favorite-button" type="button" aria-label={`${favorite ? 'أزيلي' : 'أضيفي'} ${product.name} ${favorite ? 'من' : 'إلى'} المفضلة`} aria-pressed={favorite} onClick={() => onFavorite(product.id)}><Icon name="heart" /></button>
    </div>
    <div className="product-info">
      <div className="product-rating" aria-label={product.isMockRating ? `تقييم تجريبي ${product.rating} من ٥` : `التقييم ${product.rating} من ٥`}><span className="star" aria-hidden="true">★</span><span>{product.rating}</span><span className="product-note">· {product.isMockRating ? 'تقييم تجريبي' : product.note}</span></div>
      <h3 className="product-title"><Link to={`/product/${product.slug}`}>{product.name}</Link></h3>
      <p className="product-description">{product.description}</p>
      <div className="product-price-line"><span className="product-price">{formatNumber.format(product.price)} <small>ج.م</small></span><span className="product-old-price">{formatNumber.format(product.oldPrice)} ج.م</span></div>
      <div className="product-card-bottom"><span className="product-note">{product.isEstimatedPrice ? 'سعر تقديري للعرض' : product.priceSource === 'verified' ? 'سعر من كتالوج WhatsApp' : 'سعر عرض تجريبي'}</span>{(product.variants?.length ?? 0) > 1 ? <Link className="add-button" to={`/product/${product.slug}`} aria-label={`اختاري نوع ${product.name}`}><Icon name="bag" /> اختاري النوع</Link> : <button className="add-button" type="button" onClick={() => onAdd(product.id, product.variants?.[0])} aria-label={`أضيفي ${product.name} إلى السلة التجريبية`}><Icon name="bag" /> أضيفي للسلة</button>}</div>
    </div>
  </article>
}
