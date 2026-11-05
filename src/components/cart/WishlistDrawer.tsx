import { useRef } from 'react'
import { allProducts, formatNumber } from '../../data/storeProducts'
import type { Product } from '../../data/storeProducts'
import { Icon } from '../ui/Icon'
import { useDialogFocus } from '../../hooks/useDialogFocus'

interface Props {
  open: boolean
  productIds: ReadonlySet<string>
  onClose: () => void
  onRemove: (id: string) => void
  onAdd: (product: Product) => void
}

export function WishlistDrawer({ open, productIds, onClose, onRemove, onAdd }: Props) {
  const products = allProducts.filter((product) => productIds.has(product.id))
  const drawerRef = useRef<HTMLElement | null>(null)
  useDialogFocus(drawerRef, open, onClose)

  return <>
    <button className={`drawer-backdrop${open ? ' is-open' : ''}`} type="button" tabIndex={open ? 0 : -1} aria-label="إغلاق المفضلة" onClick={onClose} />
    <aside ref={drawerRef} className={`store-drawer wishlist-drawer${open ? ' is-open' : ''}`} role="dialog" aria-modal={open ? 'true' : undefined} aria-label="قائمة المفضلة" aria-hidden={!open} inert={!open}>
      <header className="drawer-header"><div><p className="eyebrow">اختياراتكِ الجميلة</p><h2>قائمة المفضلة <span>({formatNumber.format(products.length)})</span></h2></div><button type="button" className="drawer-close" aria-label="إغلاق المفضلة" onClick={onClose}><Icon name="close" /></button></header>
      {products.length ? <div className="wishlist-lines">{products.map((product) => <article className="wishlist-line" key={product.id}><img src={product.image} alt={product.name} width="76" height="88" /><div><h3>{product.name}</h3><strong>{formatNumber.format(product.price)} ج.م</strong><div><button className="wishlist-add" type="button" onClick={() => onAdd(product)}>أضيفي للسلة <Icon name="bag" /></button><button className="wishlist-remove" type="button" onClick={() => onRemove(product.id)}>إزالة</button></div></div></article>)}</div> : <div className="cart-empty"><span className="empty-bag"><Icon name="heart" /></span><h3>مفضلتكِ تبدأ من هنا</h3><p>احفظي المنتجات التي تحبينها لتجديها بسهولة لاحقًا.</p><button type="button" onClick={onClose}>استكشفي المنتجات</button></div>}
    </aside>
  </>
}
