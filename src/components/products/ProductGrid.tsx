import type { Product } from '../../data/storeProducts'
import { ProductCard } from './ProductCard'

interface Props {
  products: Product[]
  favoriteIds: ReadonlySet<string>
  onFavorite: (id: string) => void
  onAdd: (id: string) => void
  ariaLabel: string
  className?: string
  animateItems?: boolean
}

export function ProductGrid({ products, favoriteIds, onFavorite, onAdd, ariaLabel, className = '', animateItems = false }: Props) {
  return <div className={`product-grid${className ? ` ${className}` : ''}`} aria-label={ariaLabel}>
    {products.map((product) => {
      const card = <ProductCard product={product} favorite={favoriteIds.has(product.id)} onFavorite={onFavorite} onAdd={onAdd} />
      return animateItems
        ? <div className="product-grid-motion-item" data-gsap-target key={product.id}>{card}</div>
        : <ProductCard key={product.id} product={product} favorite={favoriteIds.has(product.id)} onFavorite={onFavorite} onAdd={onAdd} />
    })}
  </div>
}
