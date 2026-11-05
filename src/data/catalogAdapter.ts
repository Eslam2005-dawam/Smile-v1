import frontendCatalog from './catalogProducts.json'
import type { Product } from './products'
import type { ProductCategoryId } from './categories'

/** Product records prepared from the WhatsApp catalog for integration or demo use.
 * The existing Manus sample list in products.ts remains unchanged.
 */
export interface CatalogProduct extends Product {
  currency: 'EGP'
  gallery: string[]
  cleanImages: string[]
  variants: string[]
  priceSource: 'verified' | 'estimated_market'
  isEstimatedPrice: boolean
  ratingSource: 'mock'
  isMockRating: true
  marketingDataSource: 'mock_demo'
  isMockMarketingData: true
  reviewStatus: string
  reviewNotes: string | null
  websiteReady: true
}

type CatalogSourceProduct = Omit<CatalogProduct, 'variants'> & {
  primaryImage: string
  variants?: string[] | null
}

const products = frontendCatalog.products as CatalogSourceProduct[]

function publicAssetPath(path: string): string {
  const assetPath = path.replace(/^\/smile\//, '')
  return `${import.meta.env.BASE_URL}${assetPath}`
}

export const catalogProducts: CatalogProduct[] = products.filter(product =>
  product.websiteReady && product.reviewStatus !== 'needs_manual_review',
).map(product => ({
  ...product,
  category: product.category as ProductCategoryId,
  image: publicAssetPath(product.primaryImage),
  gallery: product.gallery.map(publicAssetPath),
  cleanImages: product.cleanImages.map(publicAssetPath),
  variants: product.variants ?? [],
}))

export const estimatedPriceProducts = catalogProducts.filter(product => product.isEstimatedPrice)
