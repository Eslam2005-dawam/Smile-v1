import { images } from '../assets'
import type { ProductCategoryId } from './categories'

export type { CategoryId } from './categories'

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  category: ProductCategoryId
  image: string
  price: number
  oldPrice: number
  discount: string
  rating: string
  note: string
  inStock: boolean
  bestSeller: boolean
  newArrival: boolean
  gallery?: string[]
  cleanImages?: string[]
  variants?: string[]
  priceSource?: 'verified' | 'estimated_market'
  isEstimatedPrice?: boolean
  ratingSource?: 'mock'
  isMockRating?: boolean
  marketingDataSource?: 'mock_demo'
  isMockMarketingData?: boolean
  oldPriceSource?: 'mock_demo'
  discountSource?: 'mock_demo'
}

// Manus prototype values; these are sample products and sample prices, not a live catalog.
export const allProducts: Product[] = [
  { id: 'morning-rose', slug: 'morning-rose-perfume', name: 'عطر ورد الصباح', description: 'نفحات زهرية ناعمة تدوم', category: 'perfume', image: images.perfume, price: 189, oldPrice: 239, discount: '−٢٠٪', rating: '٤٫٩', note: 'الأكثر طلباً', inStock: true, bestSeller: true, newArrival: false },
  { id: 'soft-touch', slug: 'soft-touch-cream', name: 'كريم لمسة ناعمة', description: 'ترطيب يومي لبشرة مشرقة', category: 'skincare', image: images.skincare, price: 129, oldPrice: 159, discount: '−١٩٪', rating: '٤٫٨', note: 'اختياركم المفضّل', inStock: true, bestSeller: true, newArrival: false },
  { id: 'rose-bag', slug: 'rose-daily-bag', name: 'حقيبة روز اليومية', description: 'أناقة عملية لكل مشاويركِ', category: 'bags', image: images.handbag, price: 259, oldPrice: 345, discount: '−٢٥٪', rating: '٤٫٩', note: 'عدد محدود', inStock: true, bestSeller: true, newArrival: false },
  { id: 'berry-lip', slug: 'blush-lipstick', name: 'أحمر شفاه بلَش', description: 'لون مخملي بلمسة خفيفة', category: 'makeup', image: images.lipstick, price: 79, oldPrice: 109, discount: '−٢٨٪', rating: '٤٫٧', note: 'لون الموسم', inStock: true, bestSeller: true, newArrival: false },
  { id: 'golden-drops', slug: 'golden-drops-face-oil', name: 'زيت لمعة الذهب', description: 'زيت خفيف لتوهّج طبيعي', category: 'natural', image: images.faceOil, price: 119, oldPrice: 149, discount: 'جديد', rating: '٤٫٨', note: 'وصل حديثاً', inStock: true, bestSeller: false, newArrival: true },
  { id: 'silk-hair', slug: 'silky-hair-serum', name: 'سيروم شعر حريري', description: 'عناية يومية بخلاصة نباتية', category: 'hair', image: images.haircare, price: 99, oldPrice: 125, discount: 'جديد', rating: '٤٫٩', note: 'وصل حديثاً', inStock: true, bestSeller: false, newArrival: true },
  { id: 'soft-palette', slug: 'sugar-palette', name: 'لوحة ألوان سُكّر', description: 'درجات ناعمة لكل مناسبة', category: 'makeup', image: images.palette, price: 145, oldPrice: 175, discount: 'جديد', rating: '٤٫٨', note: 'كمية محدودة', inStock: true, bestSeller: false, newArrival: true },
  { id: 'gold-charm', slug: 'gold-story-bracelet', name: 'سوار حكاية ذهب', description: 'تفصيلة رقيقة تكمل إطلالتكِ', category: 'accessories', image: images.jewelry, price: 139, oldPrice: 169, discount: 'جديد', rating: '٤٫٧', note: 'وصل حديثاً', inStock: true, bestSeller: false, newArrival: true },
]

export const bestSellers = allProducts.filter(product => product.bestSeller)
export const newArrivals = allProducts.filter(product => product.newArrival)

export const formatNumber = new Intl.NumberFormat('ar-EG', { maximumFractionDigits: 0 })

export function formatProductCount(count: number) {
  if (count === 1) return 'منتج واحد'
  if (count === 2) return 'منتجان'
  return `${formatNumber.format(count)} منتجات`
}
