import type { FormEvent } from 'react'
import { Link } from 'react-router'
import { formatNumber } from '../../data/products'
import { Icon } from '../ui/Icon'

interface Props {
  query: string
  onQueryChange: (value: string) => void
  menuOpen: boolean
  onMenuToggle: () => void
  onMenuClose: () => void
  cartQuantity: number
  onCartClick: () => void
  onAccountClick: () => void
}

const navLinks = [
  ['/#categories', 'الأقسام'], ['/products', 'المنتجات'], ['/#offers', 'العروض'], ['/#our-story', 'حكايتنا'],
] as const

export function Header({ query, onQueryChange, menuOpen, onMenuToggle, onMenuClose, cartQuantity, onCartClick, onAccountClick }: Props) {
  function preventSearchNavigation(event: FormEvent<HTMLFormElement>) { event.preventDefault() }
  return <>
    <div className="announcement-bar"><div className="announcement-inner page-shell"><p><Icon name="truck" /> توصيل سريع لجميع المحافظات</p><p><Icon name="shield" /> دفع آمن عند الاستلام</p><p><Icon name="heart" /> أهلاً بكِ في Smile Store</p></div></div>
    <header className="site-header" id="top">
      <div className="main-header page-shell">
        <Link className="brand" to="/" aria-label="Smile Store — الصفحة الرئيسية"><span className="brand-script">Smile<span className="brand-heart">♥</span></span><span className="brand-caption">STORE</span></Link>
        <button className="mobile-menu-toggle icon-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'أغلقي القائمة' : 'افتحي القائمة'} onClick={onMenuToggle}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
        <nav className="primary-nav" aria-label="القائمة الرئيسية">{navLinks.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}</nav>
        <div className="header-tools">
          <form className="search-box" role="search" onSubmit={preventSearchNavigation}><label className="sr-only" htmlFor="store-search">ابحثي عن منتج</label><input id="store-search" name="search" type="search" placeholder="ابحثي عن منتج..." autoComplete="off" value={query} onChange={event => onQueryChange(event.target.value)} /><button className="search-submit" type="submit" aria-label="بحث"><Icon name="search" /></button></form>
          <button className="icon-button account-button" type="button" aria-label="حسابكِ — غير مفعّل في المعاينة" onClick={onAccountClick}><Icon name="user" /></button>
          <button className="icon-button cart-button" type="button" aria-label={`سلة المشتريات التجريبية، ${formatNumber.format(cartQuantity)} منتجات`} onClick={onCartClick}><Icon name="bag" /><span className="cart-count" aria-live="polite">{formatNumber.format(cartQuantity)}</span></button>
        </div>
      </div>
      <nav className="mobile-nav" id="mobile-menu" aria-label="قائمة الهاتف" hidden={!menuOpen}>{[...navLinks, ['/#newsletter', 'تواصلي معنا'] as const].map(([to, label]) => <Link key={to} to={to} onClick={onMenuClose}>{label}</Link>)}</nav>
    </header>
  </>
}
