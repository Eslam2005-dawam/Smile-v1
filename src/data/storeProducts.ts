import { catalogProducts } from './catalogAdapter'

export type { Product } from './products'
export { formatNumber, formatProductCount } from './products'

/** Website catalog: demo-ready WhatsApp records only. */
export const allProducts = catalogProducts
export const bestSellers = allProducts.filter(product => product.bestSeller)
export const newArrivals = allProducts.filter(product => product.newArrival)
