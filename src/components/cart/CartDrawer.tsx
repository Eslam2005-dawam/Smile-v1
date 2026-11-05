import { useRef, useState } from 'react'
import { formatNumber } from '../../data/storeProducts'
import { calculateCart, getProduct, type CartLine } from '../../domain/cart'
import { useDialogFocus } from '../../hooks/useDialogFocus'
import { Icon } from '../ui/Icon'

interface Props {
  open: boolean
  lines: CartLine[]
  couponApplied: boolean
  onCouponApplied: (applied: boolean) => void
  onClose: () => void
  onCheckout: () => void
  onChangeQuantity: (lineId: string, amount: number) => void
  onRemove: (lineId: string) => void
}

function money(value: number) { return `${formatNumber.format(Math.round(value))} ج.م` }

export function CartDrawer({ open, lines, couponApplied, onCouponApplied, onClose, onCheckout, onChangeQuantity, onRemove }: Props) {
  const [coupon, setCoupon] = useState('')
  const [couponMessage, setCouponMessage] = useState('')
  const pricing = calculateCart(lines, couponApplied)

  const drawerRef = useRef<HTMLElement | null>(null)
  useDialogFocus(drawerRef, open, onClose)

  function applyCoupon() {
    if (coupon.trim().toUpperCase() !== 'SMILE10') {
      onCouponApplied(false)
      setCouponMessage('الكود غير صالح. جرّبي SMILE10')
      return
    }
    if (!lines.length) {
      setCouponMessage('أضيفي منتجًا للسلة أولًا لتفعيل الخصم.')
      return
    }
    onCouponApplied(true)
    setCoupon('SMILE10')
    setCouponMessage(`تم تفعيل الخصم، وفّرتِ ${money(pricing.couponDiscount || Math.round(pricing.subtotal * .1))}.`)
  }

  return <>
    <button className={`drawer-backdrop${open ? ' is-open' : ''}`} type="button" tabIndex={open ? 0 : -1} aria-label="إغلاق السلة" onClick={onClose} />
    <aside ref={drawerRef} className={`store-drawer cart-drawer${open ? ' is-open' : ''}`} role="dialog" aria-modal={open ? 'true' : undefined} aria-label="سلة التسوق" aria-hidden={!open} inert={!open}>
      <header className="drawer-header"><div><p className="eyebrow">تسوقكِ الجميل</p><h2>سلة التسوق <span>({formatNumber.format(lines.reduce((n, line) => n + line.quantity, 0))})</span></h2></div><button type="button" className="drawer-close" aria-label="إغلاق السلة" onClick={onClose}><Icon name="close" /></button></header>

      <div className="shipping-progress" role="status">
        <div className="shipping-progress-copy">{pricing.isFreeShipping ? <strong>🎉 مبروك! حصلتِ على شحن مجاني لكامل الطلب</strong> : <span>أضيفي منتجات بقيمة <strong>{money(pricing.shippingRemaining)}</strong> للحصول على شحن مجاني لكامل الطلب</span>}</div>
        <div className="shipping-progress-track" role="progressbar" aria-label="التقدم نحو الشحن المجاني" aria-valuemin={0} aria-valuemax={pricing.freeShippingThreshold} aria-valuenow={Math.min(pricing.freeShippingThreshold, pricing.subtotal - pricing.discount)}><span className={pricing.isFreeShipping ? 'is-complete' : ''} style={{ width: `${pricing.shippingProgress}%` }} /></div>
      </div>

      {lines.length ? <>
        <div className="cart-lines">{lines.map((line) => {
          const product = getProduct(line.productId)
          if (!product) return null
          return <article className="cart-line" key={line.lineId}>
            <img src={product.image} alt={product.name} width="78" height="92" />
            <div className="cart-line-info"><h3>{product.name}</h3>{line.variant && <p className="cart-line-variant">الاختيار: {line.variant}</p>}<p>{money(product.price)} للقطعة</p><div className="quantity-control" aria-label={`الكمية من ${product.name}`}><button type="button" aria-label="تقليل الكمية" onClick={() => onChangeQuantity(line.lineId, -1)}>−</button><output>{formatNumber.format(line.quantity)}</output><button type="button" aria-label="زيادة الكمية" onClick={() => onChangeQuantity(line.lineId, 1)}>+</button></div></div>
            <div className="cart-line-actions"><strong>{money(product.price * line.quantity)}</strong><button type="button" aria-label={`حذف ${product.name}`} onClick={() => onRemove(line.lineId)}>حذف</button></div>
          </article>
        })}</div>

        <div className="promo-box"><label htmlFor="promo-code">كود الخصم</label><div><input id="promo-code" value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="أدخلي SMILE10" dir="ltr" /><button type="button" onClick={applyCoupon}>تفعيل</button></div>{couponMessage && <p className={couponApplied ? 'promo-success' : 'promo-error'} role="status">{couponMessage}</p>}</div>

        <div className="cart-summary"><p><span>المجموع الفرعي</span><strong>{money(pricing.subtotal)}</strong></p>{pricing.couponDiscount > 0 && <p className="summary-discount"><span>كوبون SMILE10 (10%)</span><strong>− {money(pricing.couponDiscount)}</strong></p>}<p><span>الشحن</span><strong>{pricing.shipping ? money(pricing.shipping) : 'مجانًا'}</strong></p><p className="summary-total"><span>الإجمالي</span><strong>{money(pricing.total)}</strong></p></div>
        <button className="checkout-cta" type="button" onClick={onCheckout}>متابعة الطلب والدفع عند الاستلام <Icon name="arrow" /></button>
      </> : <div className="cart-empty"><span className="empty-bag"><Icon name="bag" /></span><h3>سلتكِ بانتظار اختياراتكِ</h3><p>أضيفي ما تحبين، وسنجهّز طلبكِ بكل عناية.</p><button type="button" onClick={onClose}>تابعي التسوق</button></div>}

      <footer className="drawer-trust"><span><Icon name="shield" /> دفع آمن عند الاستلام 100%</span><span><Icon name="heart" /> استبدال واسترجاع سهل</span></footer>
    </aside>
  </>
}

