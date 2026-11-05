import { useRef } from 'react'
import type { Product } from '../../data/storeProducts'
import { Link } from 'react-router'
import { Icon } from '../ui/Icon'
import { ProductGrid } from './ProductGrid'
import { gsap } from '../../animations/gsap'
import { useGsapMotion } from '../../animations/useGsapMotion'

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
  const sectionRef = useRef<HTMLElement | null>(null)

  useGsapMotion(sectionRef, (root) => {
    const timeline = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 86%', once: true } })
    const heading = root.querySelector<HTMLElement>('.section-heading')
    const cards = root.querySelectorAll<HTMLElement>('.product-grid-motion-item')

    if (heading) timeline.fromTo(heading,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.38, ease: 'power2.out', clearProps: 'opacity,visibility,transform' },
    )
    if (cards.length) timeline.fromTo(cards,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.38, stagger: 0.065, ease: 'power2.out', clearProps: 'opacity,visibility,transform' },
      heading ? '-=0.13' : 0,
    )
  })

  return <section className={`full-bleed products-section ${newArrivals ? 'new-section' : ''}`} id={id} aria-labelledby={headingId} ref={sectionRef}>
    <div className="section-inner products-inner">
    <div className="section-heading">
      <div><p className="eyebrow">{eyebrow}</p><h2 id={headingId}>{title}</h2></div>
      {newArrivals ? <span className="section-note"><Icon name="sparkle" /> اختيارات جديدة لأيام أجمل</span> : <Link className="text-link" to="/products">اكتشفي المزيد <Icon name="arrow" /></Link>}
    </div>
    <p className="results-message" aria-live="polite">{products.length ? '' : 'ما لقينا منتجات مطابقة، جرّبي كلمة أو قسماً آخر.'}</p>
    <ProductGrid products={products} favoriteIds={favoriteIds} onFavorite={onFavorite} onAdd={onAdd} ariaLabel={newArrivals ? 'أحدث المنتجات في Smile Store' : 'منتجات Smile Store الأكثر مبيعاً'} animateItems />
    </div>
  </section>
}
