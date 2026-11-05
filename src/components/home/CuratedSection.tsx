import { useRef } from 'react'
import { Link } from 'react-router'
import { categoryPath, type ProductCategoryId } from '../../data/categories'
import { Icon } from '../ui/Icon'
import { gsap } from '../../animations/gsap'
import { useGsapMotion } from '../../animations/useGsapMotion'

const cards: { number: string; className: string; art: string; category: ProductCategoryId; caption: string; title: string }[] = [
  { number: '01', className: 'curated-card-skin', art: 'art-drops', category: 'skincare', caption: 'كل يوم، لمسة عناية', title: 'دلّلي بشرتكِ' },
  { number: '02', className: 'curated-card-glow', art: 'art-sun', category: 'makeup', caption: 'لإطلالة تحكي عنكِ', title: 'لمعتكِ الخاصة' },
  { number: '03', className: 'curated-card-soft', art: 'art-flower', category: 'perfume', caption: 'تفاصيل تبقى معكِ', title: 'عطر يليق بكِ' },
]

export function CuratedSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useGsapMotion(sectionRef, (root) => {
    const timeline = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 86%', once: true } })
    const intro = root.querySelector<HTMLElement>('.curated-intro')
    const cardCopy = root.querySelectorAll<HTMLElement>('.curated-copy')

    if (intro) timeline.fromTo(intro,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'opacity,visibility,transform' },
    )
    if (cardCopy.length) timeline.fromTo(cardCopy,
      { autoAlpha: 0, y: 9 },
      { autoAlpha: 1, y: 0, duration: 0.36, stagger: 0.07, ease: 'power2.out', clearProps: 'opacity,visibility,transform' },
      intro ? '-=0.12' : 0,
    )
  })

  return <section className="full-bleed curated-section" id="our-story" aria-labelledby="curated-title" ref={sectionRef}>
    <div className="section-inner curated-inner">
    <div className="curated-intro" data-gsap-target><p className="eyebrow">اختاري شعوركِ اليوم</p><h2 id="curated-title">روتين يشبهكِ،<br/><span>ولحظات على مزاجكِ.</span></h2><p>من أول لمسة عطر إلى آخر تفصيلة في إطلالتكِ، جمّعنا لكِ اختيارات تكمّل يومكِ بطريقتكِ.</p><a className="button button-outline" href="#new-arrivals">اكتشفي اختياراتنا <Icon name="arrow" /></a></div>
    <div className="curated-cards">{cards.map(card => <Link key={card.number} className={`curated-card ${card.className}`} to={categoryPath(card.category)}><span className="curated-number">{card.number}</span><span className={`curated-art ${card.art}`} aria-hidden="true"/><span className="curated-copy" data-gsap-target><small>{card.caption}</small><strong>{card.title}</strong></span><span className="curated-arrow"><Icon name="arrow" /></span></Link>)}</div>
    </div>
  </section>
}
