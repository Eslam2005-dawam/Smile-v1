import { Hero } from '../components/home/Hero'
import { Categories } from '../components/home/Categories'
import { Benefits } from '../components/home/Benefits'
import { CampaignBanner } from '../components/home/CampaignBanner'
import { FashionEditorialSection } from '../components/home/FashionEditorialSection'
import { NewsletterSection } from '../components/home/NewsletterSection'
import { ProductSection } from '../components/products/ProductSection'
import { bestSellers, newArrivals, type Product } from '../data/storeProducts'

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
    <Hero onAdd={onAdd} />
    <Benefits />
    <Categories />
    <CampaignBanner campaign="color-crush" />
    <ProductSection id="best-sellers" title="الأكثر مبيعاً" eyebrow="الأكثر حبّاً منكم" products={bestSellers.filter(product => matches(product, query))} favoriteIds={favoriteIds} onFavorite={onFavorite} onAdd={onAdd} />
    <CampaignBanner campaign="afterglow" />
    <ProductSection id="new-arrivals" title="إضافات جديدة" eyebrow="وصلت للتوّ" products={newArrivals.filter(product => matches(product, query))} favoriteIds={favoriteIds} onFavorite={onFavorite} onAdd={onAdd} newArrivals />
    <FashionEditorialSection />
    <NewsletterSection />
  </main>
}
