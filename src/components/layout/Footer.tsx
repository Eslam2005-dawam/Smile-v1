import { formatNumber } from '../../data/products'
import { Link } from 'react-router'
import { Icon } from '../ui/Icon'

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-main page-shell">
      <div className="footer-brand-column"><Link className="brand footer-brand" to="/" aria-label="Smile Store — إلى الصفحة الرئيسية"><span className="brand-script">Smile<span className="brand-heart">♥</span></span><span className="brand-caption">STORE</span></Link><p>كل الأشياء الصغيرة اللي تخلّي يومكِ أجمل، في مكان واحد يشبهكِ.</p><div className="social-links"><Link to="/" aria-label="Instagram — رابط تجريبي"><Icon name="instagram" /></Link><Link to="/#newsletter" aria-label="راسلينا — رابط تجريبي"><Icon name="mail" /></Link></div></div>
      <div className="footer-column"><h2>تسوّقي</h2><Link to="/products">كل الأقسام</Link><Link to="/#best-sellers">الأكثر مبيعاً</Link><Link to="/#new-arrivals">وصل حديثاً</Link><Link to="/#offers">العروض</Link></div>
      <div className="footer-column"><h2>نحن هنا لكِ</h2><Link to="/#newsletter">تواصلي معنا</Link><Link to="/#our-story">عن Smile Store</Link><Link to="/#newsletter">الأسئلة الشائعة (قريبًا)</Link><Link to="/#newsletter">سياسة الاستبدال (قريبًا)</Link></div>
      <div className="footer-column footer-contact"><h2>يسعدنا نسمع منكِ</h2><p><Icon name="phone" /><span>رقم التواصل قريبًا</span></p><p><Icon name="mail" /><span>hello@smilestore.example</span></p><p className="contact-caption">العناية بكِ تبدأ من أول سؤال.</p></div>
    </div>
    <div className="footer-bottom page-shell"><p>© <span>{formatNumber.format(new Date().getFullYear())}</span> Smile Store. جميع الحقوق محفوظة.</p><div><Link to="/#newsletter">سياسة الخصوصية (قريبًا)</Link><Link to="/#newsletter">الشروط والأحكام (قريبًا)</Link></div><span className="footer-note">صُنِع بكل حب <span aria-hidden="true">♥</span></span></div>
  </footer>
}
