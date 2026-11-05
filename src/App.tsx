import { useCallback, useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router'
import { CartDrawer } from './components/cart/CartDrawer'
import { CheckoutModal } from './components/cart/CheckoutModal'
import { WishlistDrawer } from './components/cart/WishlistDrawer'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { Icon, IconLibrary } from './components/ui/Icon'
import { allProducts } from './data/storeProducts'
import { addProductToCart, calculateCart, changeLineQuantity, countCartItems, removeCartLine, type CartLine } from './domain/cart'
import type { CustomerDetails } from './services/orders'
import { demoOrderGateway } from './services/orders'
import { CatalogPage } from './pages/CatalogPage'
import { HomePage } from './pages/HomePage'
import { ProductDetailPage } from './pages/ProductDetailPage'

function App() {
  const location = useLocation()
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set())
  const [cartLines, setCartLines] = useState<CartLine[]>([])
  const [couponApplied, setCouponApplied] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [toast, setToast] = useState<{ message: string; key: number } | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(null), 3000)
    return () => window.clearTimeout(timeout)
  }, [toast])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView()
      else window.scrollTo(0, 0)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [location.pathname, location.hash])

  const showToast = useCallback((message: string) => setToast({ message, key: Date.now() }), [])

  const addToCart = useCallback((id: string, variant?: string) => {
    const product = allProducts.find((item) => item.id === id)
    if (!product?.inStock) return
    const selectedVariant = variant ?? (product.variants?.length === 1 ? product.variants[0] : undefined)
    setCartLines((current) => addProductToCart(current, id, selectedVariant))
    setWishlistOpen(false)
    showToast(`تمت إضافة ${product.name}${selectedVariant ? ` — ${selectedVariant}` : ''} إلى سلتكِ`)
  }, [showToast])

  const toggleFavorite = useCallback((id: string) => {
    const product = allProducts.find((item) => item.id === id)
    const wasFavorite = favorites.has(id)
    setFavorites((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
    showToast(wasFavorite ? `أُزيل ${product?.name ?? 'المنتج'} من المفضلة` : `أُضيف ${product?.name ?? 'المنتج'} إلى المفضلة`)
  }, [favorites, showToast])

  const closeCart = useCallback(() => setCartOpen(false), [])
  const closeWishlist = useCallback(() => setWishlistOpen(false), [])
  const closeCheckout = useCallback(() => setCheckoutOpen(false), [])

  async function submitOrder(customer: CustomerDetails) {
    if (!cartLines.length) throw new Error('Cannot submit an empty cart')
    const receipt = await demoOrderGateway.submit({
      customer,
      items: cartLines,
      pricing: calculateCart(cartLines, couponApplied),
      paymentMethod: 'cash-on-delivery',
    })
    return receipt
  }

  function clearCompletedOrder() {
    setCartLines([])
    setCouponApplied(false)
  }

  const catalogProps = { query, onClearQuery: () => setQuery(''), favoriteIds: favorites, onFavorite: toggleFavorite, onAdd: addToCart }

  return <>
    <IconLibrary />
    <a className="skip-link" href="#main-content">انتقلي إلى المحتوى</a>
    <Header query={query} onQueryChange={setQuery} menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((current) => !current)} onMenuClose={() => setMenuOpen(false)} cartQuantity={countCartItems(cartLines)} favoriteQuantity={favorites.size} onCartClick={() => setCartOpen(true)} onFavoritesClick={() => setWishlistOpen(true)} onAccountClick={() => showToast('الحسابات غير مفعّلة في هذه المعاينة.')} />
    {/* <aside className="demo-disclosure" role="note">معاينة تجريبية: التقييمات والمخزون والأسعار السابقة والعروض وبيانات التسويق للعرض فقط، وليست تقييمات عملاء أو عروض بيع حقيقية. الأسعار الموثقة مأخوذة من كتالوج WhatsApp، والأسعار التقديرية مبيّنة على المنتج.</aside> */}
    <Routes>
      <Route path="/" element={<HomePage query={query} favoriteIds={favorites} onFavorite={toggleFavorite} onAdd={addToCart} />} />
      <Route path="/products" element={<CatalogPage {...catalogProps} />} />
      <Route path="/category/:slug" element={<CatalogPage {...catalogProps} />} />
      <Route path="/product/:slug" element={<ProductDetailPage favoriteIds={favorites} onFavorite={toggleFavorite} onAdd={addToCart} />} />
      <Route path="*" element={<main className="catalog-page page-shell" id="main-content"><div className="catalog-empty"><h1>الصفحة غير متاحة</h1><p>تصفّحي كل المنتجات أو ارجعي للصفحة الرئيسية.</p><Link className="button button-dark" to="/products">كل المنتجات</Link></div></main>} />
    </Routes>
    <Footer />
    <CartDrawer open={cartOpen} lines={cartLines} couponApplied={couponApplied} onCouponApplied={setCouponApplied} onClose={closeCart} onCheckout={() => { setCartOpen(false); setCheckoutOpen(true) }} onChangeQuantity={(lineId, amount) => setCartLines((current) => changeLineQuantity(current, lineId, amount))} onRemove={(lineId) => setCartLines((current) => removeCartLine(current, lineId))} />
    <WishlistDrawer open={wishlistOpen} productIds={favorites} onClose={closeWishlist} onRemove={toggleFavorite} onAdd={(product) => addToCart(product.id)} />
    <CheckoutModal open={checkoutOpen} lines={cartLines} couponApplied={couponApplied} onClose={closeCheckout} onSubmit={submitOrder} onOrderConfirmed={clearCompletedOrder} />
    <div className={`toast${toast ? ' is-visible' : ''}`} role="status" aria-live="polite" aria-atomic="true">{toast && <><span className="toast-check" aria-hidden="true">✓</span><span>{toast.message}</span></>}</div>
    <a className={`back-to-top${scrolled ? ' is-visible' : ''}`} href="#top" aria-label="العودة إلى أعلى الصفحة"><Icon name="arrow" /></a>
  </>
}

export default App
