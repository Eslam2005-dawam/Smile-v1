import { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Icon, IconLibrary } from './components/ui/Icon'
import { allProducts, formatNumber } from './data/products'
import { HomePage } from './pages/HomePage'
import { CatalogPage } from './pages/CatalogPage'

function App() {
  const location = useLocation()
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set())
  const [cartQuantity, setCartQuantity] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState<{ message: string; key: number } | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(null), 2800)
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

  function showToast(message: string) { setToast({ message, key: Date.now() }) }

  function toggleFavorite(id: string) {
    const wasFavorite = favorites.has(id)
    setFavorites(current => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
    showToast(wasFavorite ? 'أُزيل المنتج من مفضّلتكِ' : 'أُضيف المنتج إلى مفضّلتكِ')
  }

  function addToCart(id: string) {
    if (!allProducts.some(product => product.id === id)) return
    setCartQuantity(current => current + 1)
    showToast('أُضيف المنتج إلى سلتكِ التجريبية — هذه معاينة للتصميم فقط.')
  }

  const catalogProps = { query, onClearQuery: () => setQuery(''), favoriteIds: favorites, onFavorite: toggleFavorite, onAdd: addToCart }

  return <>
    <IconLibrary />
    <a className="skip-link" href="#main-content">انتقلي إلى المحتوى</a>
    <Header query={query} onQueryChange={setQuery} menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(current => !current)} onMenuClose={() => setMenuOpen(false)} cartQuantity={cartQuantity} onCartClick={() => showToast(cartQuantity ? `في سلتكِ التجريبية ${formatNumber.format(cartQuantity)} منتجات — لا توجد عملية شراء فعلية.` : 'سلتكِ التجريبية فارغة — أضيفي منتجاً لمعاينة التصميم.')} onAccountClick={() => showToast('الحسابات غير مفعّلة في هذه المعاينة.')} />
    <Routes>
      <Route path="/" element={<HomePage query={query} favoriteIds={favorites} onFavorite={toggleFavorite} onAdd={addToCart} />} />
      <Route path="/products" element={<CatalogPage {...catalogProps} />} />
      <Route path="/category/:slug" element={<CatalogPage {...catalogProps} />} />
      <Route path="*" element={<main className="catalog-page page-shell" id="main-content"><div className="catalog-empty"><h1>الصفحة غير متاحة</h1><p>تصفّحي كل المنتجات أو ارجعي للصفحة الرئيسية.</p><Link className="button button-dark" to="/products">كل المنتجات</Link></div></main>} />
    </Routes>
    <Footer />
    <div className={`toast${toast ? ' is-visible' : ''}`} role="status" aria-live="polite" aria-atomic="true">{toast?.message}</div>
    <a className={`back-to-top${scrolled ? ' is-visible' : ''}`} href="#top" aria-label="العودة إلى أعلى الصفحة"><Icon name="arrow" /></a>
  </>
}

export default App
