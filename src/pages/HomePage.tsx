import { Hero } from '../components/home/Hero'
import { Categories } from '../components/home/Categories'
import { Benefits } from '../components/home/Benefits'
import { CuratedSection } from '../components/home/CuratedSection'
import { OfferBanner } from '../components/home/OfferBanner'
import { JournalSection } from '../components/home/JournalSection'
import { NewsletterSection } from '../components/home/NewsletterSection'
import { ProductSection } from '../components/products/ProductSection'
import { bestSellers, newArrivals, type Product } from '../data/products'

interface Props {
  query: string
  favoriteIds: ReadonlySet<string>
  onFavorite: (id: string) => void
  onAdd: (id: string) => void
}

function matches(product: Product, query: string) {
  const needle = query.trim().toLocaleLowerCase('ar')
  return !needle || `${product.name} ${product.description} ${product.note}`.toLocaleLowerCase('ar').includes(needle)
}

export function HomePage({ query, favoriteIds, onFavorite, onAdd }: Props) {
  return <main id="main-content">
    <Hero />
    <Categories />
    <Benefits />
    <ProductSection id="best-sellers" title="الأكثر مبيعاً" eyebrow="الأكثر حبّاً منكم" products={bestSellers.filter(product => matches(product, query))} favoriteIds={favoriteIds} onFavorite={onFavorite} onAdd={onAdd} />
    <CuratedSection />
    <OfferBanner />
    <ProductSection id="new-arrivals" title="إضافات جديدة" eyebrow="وصلت للتوّ" products={newArrivals.filter(product => matches(product, query))} favoriteIds={favoriteIds} onFavorite={onFavorite} onAdd={onAdd} newArrivals />
    <JournalSection />
    <NewsletterSection />
  </main>
}
