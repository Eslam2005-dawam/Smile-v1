import type { CartLine, CartPricing } from '../domain/cart'

export interface CustomerDetails {
  fullName: string
  phone: string
  governorate: string
  address: string
  notes: string
}

export interface CreateOrderRequest {
  customer: CustomerDetails
  items: CartLine[]
  pricing: CartPricing
  paymentMethod: 'cash-on-delivery'
}

export interface OrderReceipt {
  orderNumber: string
  createdAt: string
}

export interface OrderGateway {
  submit(order: CreateOrderRequest): Promise<OrderReceipt>
}

// Replace this local adapter with an API implementation without changing checkout UI.
export const demoOrderGateway: OrderGateway = {
  async submit() {
    await new Promise((resolve) => window.setTimeout(resolve, 350))
    return {
      orderNumber: `SML-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
    }
  },
}
