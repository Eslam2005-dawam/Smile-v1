import type { Product } from '../../data/products'
import { ProductCard } from './ProductCard'

interface Props {
  products: Product[]
  favoriteIds: ReadonlySet<string>
  onFavorite: (id: string) => void
  onAdd: (id: string) => void
  ariaLabel: string
  className?: string
}

export function ProductGrid({ products, favoriteIds, onFavorite, onAdd, ariaLabel, className = '' }: Props) {
  return <div className={`product-grid${className ? ` ${className}` : ''}`} aria-label={ariaLabel}>
    {products.map(product => <ProductCard key={product.id} product={product} favorite={favoriteIds.has(product.id)} onFavorite={onFavorite} onAdd={onAdd} />)}
  </div>
}
