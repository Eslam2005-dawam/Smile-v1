import { Icon } from '../ui/Icon'

export function Benefits() {
  return <section className="full-bleed benefits-section" aria-label="مزايا التسوق في Smile Store">
    <div className="section-inner benefits">
    <article className="benefit-card"><span className="benefit-icon"><Icon name="truck" /></span><div><strong>شحن سريع</strong><span>لجميع المحافظات</span></div></article>
    <article className="benefit-card"><span className="benefit-icon"><Icon name="shield" /></span><div><strong>دفع آمن وموثوق</strong><span>راحة بال مع كل طلب</span></div></article>
    <article className="benefit-card"><span className="benefit-icon"><Icon name="gift" /></span><div><strong>عروض مميّزة</strong><span>خصومات تتجدّد باستمرار</span></div></article>
    <article className="benefit-card"><span className="benefit-icon"><Icon name="headset" /></span><div><strong>نحن هنا لمساعدتكِ</strong><span>دعم يرافقكِ دائماً</span></div></article>
    </div>
  </section>
}
