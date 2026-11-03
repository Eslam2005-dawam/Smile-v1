export type ProductCategoryId = 'makeup' | 'skincare' | 'hair' | 'perfume' | 'bags' | 'natural' | 'accessories'
export type CategoryId = 'all' | ProductCategoryId

export interface Category {
  id: ProductCategoryId
  slug: string
  label: string
  orb: string
}

export const categories: Category[] = [
  { id: 'makeup', slug: 'makeup', label: 'مكياج', orb: 'peach' },
  { id: 'skincare', slug: 'skincare', label: 'العناية بالبشرة', orb: 'lilac' },
  { id: 'hair', slug: 'haircare', label: 'العناية بالشعر', orb: 'rose' },
  { id: 'perfume', slug: 'perfume', label: 'عطور', orb: 'gold' },
  { id: 'bags', slug: 'bags', label: 'شنط', orb: 'mint' },
  { id: 'natural', slug: 'natural', label: 'زيوت طبيعية', orb: 'yellow' },
  { id: 'accessories', slug: 'accessories', label: 'إكسسوارات', orb: 'blush' },
]

export function categoryPath(id: ProductCategoryId) {
  const category = categories.find(item => item.id === id)
  return category ? `/category/${category.slug}` : '/products'
}

export function categoryFromSlug(slug: string | undefined) {
  return categories.find(item => item.slug === slug)
}
