import { useCallback, useRef, useState, type FormEvent } from 'react'
import { formatNumber } from '../../data/storeProducts'
import { getProduct, type CartLine, calculateCart } from '../../domain/cart'
import type { CustomerDetails, OrderReceipt } from '../../services/orders'
import { Icon } from '../ui/Icon'
import { useDialogFocus } from '../../hooks/useDialogFocus'

const governorates = ['القاهرة', 'الجيزة', 'الإسكندرية', 'القليوبية', 'الدقهلية', 'البحر الأحمر', 'البحيرة', 'الفيوم', 'الغربية', 'الإسماعيلية', 'المنوفية', 'المنيا', 'الوادي الجديد', 'السويس', 'أسوان', 'أسيوط', 'بني سويف', 'بورسعيد', 'دمياط', 'جنوب سيناء', 'كفر الشيخ', 'مطروح', 'الأقصر', 'قنا', 'شمال سيناء', 'سوهاج']
const emptyCustomer: CustomerDetails = { fullName: '', phone: '', governorate: '', address: '', notes: '' }
function money(value: number) { return `${formatNumber.format(Math.round(value))} ج.م` }
function normalizePhone(value: string) {
  return value.replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit))).replace(/[^0-9]/g, '').slice(0, 11)
}

interface Props {
  open: boolean
  lines: CartLine[]
  couponApplied: boolean
  onClose: () => void
  onSubmit: (customer: CustomerDetails) => Promise<OrderReceipt>
  onOrderConfirmed: () => void
}

export function CheckoutModal({ open, lines, couponApplied, onClose, onSubmit, onOrderConfirmed }: Props) {
  const [customer, setCustomer] = useState(emptyCustomer)
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null)
  const [orderSnapshot, setOrderSnapshot] = useState<{ total: number } | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const pricing = calculateCart(lines, couponApplied)

  const panelRef = useRef<HTMLElement | null>(null)
  const handleClose = useCallback(() => {
    if (receipt) {
      setReceipt(null)
      setOrderSnapshot(null)
      setCustomer(emptyCustomer)
    }
    onClose()
  }, [onClose, receipt])
  useDialogFocus(panelRef, open, handleClose, !receipt)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const savedTotal = pricing.total
      const created = await onSubmit(customer)
      setOrderSnapshot({ total: savedTotal })
      setReceipt(created)
      onOrderConfirmed()
    } catch {
      setError('تعذّر تسجيل الطلب الآن. تحققي من الاتصال وحاولي مرة أخرى.')
    } finally {
      setSubmitting(false)
    }
  }

  function update<K extends keyof CustomerDetails>(key: K, value: CustomerDetails[K]) {
    setCustomer((current) => ({ ...current, [key]: value }))
  }

  return <div className={`checkout-layer${open ? ' is-open' : ''}`} aria-hidden={!open}>
    <button className="checkout-backdrop" type="button" tabIndex={open ? 0 : -1} aria-label="إغلاق إتمام الطلب" onClick={() => !receipt && handleClose()} />
    <section ref={panelRef} className="checkout-panel" role="dialog" aria-modal={open ? 'true' : undefined} aria-label={receipt ? 'تأكيد الطلب' : 'إتمام الطلب'} aria-hidden={!open} inert={!open}>
      <header className="checkout-header">{!receipt && <button className="checkout-back-button" type="button" onClick={handleClose}><Icon name="arrow" /> العودة للسلة</button>}<button className="drawer-close" type="button" aria-label={receipt ? 'إغلاق' : 'إغلاق إتمام الطلب'} onClick={handleClose}><Icon name="close" /></button></header>

      {receipt && orderSnapshot ? <div className="order-success" role="status">
        <span className="success-check" aria-hidden="true">✓</span><p className="eyebrow">تأكيد الطلب التجريبي</p><h1>شكرًا لثقتكِ بنا</h1><p className="success-subtitle">تم تجهيز بيانات طلبكِ في هذه المعاينة.</p><div className="order-number"><span>رقم الطلب</span><strong>{receipt.orderNumber}</strong></div>
        <div className="confirmation-details"><div><strong>بيانات التوصيل</strong><span>{customer.fullName}</span><span dir="ltr">{customer.phone}</span><span>{customer.governorate} · {customer.address}</span></div><div className="confirmation-total"><span>المبلغ عند الاستلام (شامل الشحن)</span><strong>{money(orderSnapshot.total)}</strong></div></div>
        <p className="delivery-notice">هذه معاينة محلية؛ لم يتم إرسال الطلب إلى متجر أو مندوب.</p><button className="checkout-cta" type="button" onClick={handleClose}>متابعة التسوق</button>
      </div> : <div className="checkout-content">
        <p className="eyebrow">خطوة واحدة تفصلكِ عن طلبكِ</p><h1>بيانات التوصيل</h1><p className="checkout-intro">لا حاجة لإنشاء حساب. املئي بياناتكِ وسنرسل طلبكِ للدفع عند الاستلام.</p>
        <form className="checkout-form" onSubmit={submit}>
          <label>الاسم بالكامل<input autoComplete="name" required value={customer.fullName} onChange={(event) => update('fullName', event.target.value)} placeholder="اكتبي اسمكِ كما تحبين" /></label>
          <label>رقم الهاتف<input autoComplete="tel" type="tel" inputMode="numeric" dir="ltr" pattern="01[0125][0-9]{8}" title="أدخلي رقم هاتف مصريًا صحيحًا مكوّنًا من 11 رقمًا" required value={customer.phone} onChange={(event) => update('phone', normalizePhone(event.target.value))} placeholder="01xxxxxxxxx" /></label>
          <label>المحافظة<select autoComplete="address-level1" required value={customer.governorate} onChange={(event) => update('governorate', event.target.value)}><option value="">اختاري المحافظة</option>{governorates.map((governorate) => <option key={governorate} value={governorate}>{governorate}</option>)}</select></label>
          <label>العنوان بالتفصيل<textarea autoComplete="street-address" required rows={3} value={customer.address} onChange={(event) => update('address', event.target.value)} placeholder="الشارع، رقم العمارة، الدور، رقم الشقة" /></label>
          <label>ملاحظات إضافية <span>(اختياري)</span><textarea rows={2} value={customer.notes} onChange={(event) => update('notes', event.target.value)} placeholder="تغليف هدية أو وقت مناسب للاستلام" /></label>
          <div className="cash-due"><span><Icon name="bag" /> المبلغ نقدًا للمندوب عند الاستلام</span><strong>{money(pricing.total)}</strong><small>يشمل المنتجات والخصم والشحن</small></div>
          {error && <p className="checkout-error" role="alert">{error}</p>}
          <button className="checkout-cta" type="submit" disabled={submitting || !lines.length}>{submitting ? 'جارٍ تأكيد طلبكِ…' : 'تأكيد الطلب الآن · الدفع عند الاستلام'}</button>
          <p className="checkout-safe"><Icon name="shield" /> بياناتكِ آمنة، ولا يلزم دفع إلكتروني</p>
        </form>
        <div className="checkout-order-lines">{lines.map((line) => { const product = getProduct(line.productId); return product ? <p key={line.lineId}><span>{product.name} × {formatNumber.format(line.quantity)}</span><strong>{money(product.price * line.quantity)}</strong></p> : null })}</div>
      </div>}
    </section>
  </div>
}
