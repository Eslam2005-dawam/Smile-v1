import { allProducts, type Product } from '../data/storeProducts'

export interface CartLine {
  lineId: string
  productId: string
  quantity: number
  variant?: string
}

export interface CartPricing {
  subtotal: number
  couponDiscount: number
  discount: number
  shipping: number
  total: number
  freeShippingThreshold: number
  shippingProgress: number
  shippingRemaining: number
  isFreeShipping: boolean
}

export const FREE_SHIPPING_THRESHOLD = 500
export const SHIPPING_FEE = 45

export function getProduct(productId: string): Product | undefined {
  return allProducts.find((product) => product.id === productId)
}

export function addProductToCart(lines: CartLine[], productId: string, variant?: string): CartLine[] {
  const product = getProduct(productId)
  if (!product?.inStock) return lines

  const existing = lines.find((line) => line.productId === productId && line.variant === variant)
  if (existing) {
    return lines.map((line) => line.lineId === existing.lineId ? { ...line, quantity: line.quantity + 1 } : line)
  }

  return [...lines, { lineId: `item-${productId}-${encodeURIComponent(variant ?? 'default')}`, productId, variant, quantity: 1 }]
}

export function changeLineQuantity(lines: CartLine[], lineId: string, amount: number): CartLine[] {
  return lines.flatMap((line) => {
    if (line.lineId !== lineId) return [line]
    const quantity = line.quantity + amount
    return quantity > 0 ? [{ ...line, quantity }] : []
  })
}

export function removeCartLine(lines: CartLine[], lineId: string): CartLine[] {
  return lines.filter((line) => line.lineId !== lineId)
}

export function calculateCart(lines: CartLine[], couponApplied: boolean): CartPricing {
  const subtotal = lines.reduce((total, line) => total + (getProduct(line.productId)?.price ?? 0) * line.quantity, 0)
  const couponDiscount = couponApplied ? Math.round(subtotal * 0.1) : 0
  const discount = couponDiscount
  const shippingBasis = Math.max(0, subtotal - discount)
  const isFreeShipping = shippingBasis >= FREE_SHIPPING_THRESHOLD
  const shipping = subtotal === 0 || isFreeShipping ? 0 : SHIPPING_FEE
  return {
    subtotal,
    couponDiscount,
    discount,
    shipping,
    total: shippingBasis + shipping,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    shippingProgress: Math.min(100, (shippingBasis / FREE_SHIPPING_THRESHOLD) * 100),
    shippingRemaining: Math.max(0, FREE_SHIPPING_THRESHOLD - shippingBasis),
    isFreeShipping,
  }
}

export function countCartItems(lines: CartLine[]): number {
  return lines.reduce((count, line) => count + line.quantity, 0)
}
