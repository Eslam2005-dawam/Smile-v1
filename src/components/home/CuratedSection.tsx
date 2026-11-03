import { Link } from 'react-router'
import { categoryPath, type ProductCategoryId } from '../../data/categories'
import { Icon } from '../ui/Icon'

const cards: { number: string; className: string; art: string; category: ProductCategoryId; caption: string; title: string }[] = [
  { number: '01', className: 'curated-card-skin', art: 'art-drops', category: 'skincare', caption: 'كل يوم، لمسة عناية', title: 'دلّلي بشرتكِ' },
  { number: '02', className: 'curated-card-glow', art: 'art-sun', category: 'makeup', caption: 'لإطلالة تحكي عنكِ', title: 'لمعتكِ الخاصة' },
  { number: '03', className: 'curated-card-soft', art: 'art-flower', category: 'perfume', caption: 'تفاصيل تبقى معكِ', title: 'عطر يليق بكِ' },
]

export function CuratedSection() {
  return <section className="curated-section page-shell" id="our-story" aria-labelledby="curated-title">
    <div className="curated-intro"><p className="eyebrow">اختاري شعوركِ اليوم</p><h2 id="curated-title">روتين يشبهكِ،<br/><span>ولحظات على مزاجكِ.</span></h2><p>من أول لمسة عطر إلى آخر تفصيلة في إطلالتكِ، جمّعنا لكِ اختيارات تكمّل يومكِ بطريقتكِ.</p><a className="button button-outline" href="#new-arrivals">اكتشفي اختياراتنا <Icon name="arrow" /></a></div>
    <div className="curated-cards">{cards.map(card => <Link key={card.number} className={`curated-card ${card.className}`} to={categoryPath(card.category)}><span className="curated-number">{card.number}</span><span className={`curated-art ${card.art}`} aria-hidden="true"/><span className="curated-copy"><small>{card.caption}</small><strong>{card.title}</strong></span><span className="curated-arrow"><Icon name="arrow" /></span></Link>)}</div>
  </section>
}
