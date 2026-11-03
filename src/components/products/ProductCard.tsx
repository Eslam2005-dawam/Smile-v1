import type { Product } from '../../data/products'
import { formatNumber } from '../../data/products'
import { Icon } from '../ui/Icon'

interface Props {
  product: Product
  favorite: boolean
  onFavorite: (id: string) => void
  onAdd: (id: string) => void
}

export function ProductCard({ product, favorite, onFavorite, onAdd }: Props) {
  const badgeClass = product.discount === 'جديد' ? 'product-badge badge-new' : 'product-badge'
  return <article className="product-card" data-product-id={product.id}>
    <div className="product-media">
      <img src={product.image} alt={product.name} loading="lazy" width="900" height="1125" />
      <span className={badgeClass}>{product.discount}</span>
      <button className="favorite-button" type="button" aria-label={`${favorite ? 'أزيلي' : 'أضيفي'} ${product.name} ${favorite ? 'من' : 'إلى'} المفضلة`} aria-pressed={favorite} onClick={() => onFavorite(product.id)}><Icon name="heart" /></button>
    </div>
    <div className="product-info">
      <div className="product-rating" aria-label={`التقييم ${product.rating} من ٥`}><span className="star" aria-hidden="true">★</span><span>{product.rating}</span><span className="product-note">· {product.note}</span></div>
      <h3 className="product-title">{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <div className="product-price-line"><span className="product-price">{formatNumber.format(product.price)} <small>ج.م</small></span><span className="product-old-price">{formatNumber.format(product.oldPrice)} ج.م</span></div>
      <div className="product-card-bottom"><span className="product-note">سعر تجريبي</span><button className="add-button" type="button" onClick={() => onAdd(product.id)} aria-label={`أضيفي ${product.name} إلى السلة التجريبية`}><Icon name="bag" /> أضيفي للسلة</button></div>
    </div>
  </article>
}
