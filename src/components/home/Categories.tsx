import { useRef } from 'react'
import { Link } from 'react-router'
import { categoryPath } from '../../data/categories'
import { Icon } from '../ui/Icon'
import { gsap } from '../../animations/gsap'
import { useGsapMotion } from '../../animations/useGsapMotion'

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/imgs/${name}`

const cards = [
  { label: 'المكياج', image: 'smile-category-makeup-cutout.webp', to: categoryPath('makeup'), icon: 'makeup' },
  { label: 'العناية بالبشرة', image: 'smile-category-skincare-cutout.webp', to: categoryPath('skincare'), icon: 'skincare' },
  { label: 'العطور', image: 'smile-category-perfume-cutout.webp', to: categoryPath('perfume'), icon: 'perfume' },
  { label: 'العناية بالشعر', image: 'smile-category-haircare-cutout.webp', to: categoryPath('hair'), icon: 'hair' },
  { label: 'الأدوات والإكسسوارات', image: 'smile-category-tools-accessories-cutout.webp', to: categoryPath('accessories'), icon: 'accessories' },
  { label: 'تسوّقي كل المنتجات', image: 'smile-category-gift-set-cutout.webp', to: '/products', icon: 'gift' },
] as const

function CategoryIcon({ kind }: { kind: (typeof cards)[number]['icon'] }) {
  if (kind === 'gift') return <Icon name="gift" />
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === 'makeup' && <><path d="m5 18 10-10 3 3L8 21H4zM14 9l3 3M4 5h5M6.5 2.5v5" /></>}
    {kind === 'skincare' && <><path d="M8 3h8v4l3 3v11H5V10l3-3V3ZM8 7h8M9 15c2-2 4-2 6 0" /></>}
    {kind === 'perfume' && <><path d="M9 3h6v4l5 4v10H4V11l5-4V3ZM9 7h6M8 15h8" /></>}
    {kind === 'hair' && <><path d="M8 4h8l2 5-1 12H7L6 9l2-5ZM9 4V2h6v2M8 13h8" /></>}
    {kind === 'accessories' && <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="m6 6-2-2m14 2 2-2M6 18l-2 2m14-2 2 2" /></>}
  </svg>
}

export function Categories() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useGsapMotion(sectionRef, (root) => {
    const timeline = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 86%', once: true } })
    const heading = root.querySelector<HTMLElement>('.section-heading')
    const items = root.querySelectorAll<HTMLElement>('.category-item')
    if (heading) timeline.fromTo(heading, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.38, ease: 'power2.out', clearProps: 'opacity,visibility,transform' })
    if (items.length) timeline.fromTo(items, { autoAlpha: 0, y: 9 }, { autoAlpha: 1, y: 0, duration: 0.34, stagger: 0.055, ease: 'power2.out', clearProps: 'opacity,visibility,transform' }, heading ? '-=0.14' : 0)
  })

  return <section className="full-bleed category-section v2-categories" id="categories" aria-labelledby="categories-title" ref={sectionRef}>
    <div className="section-inner">
      <div className="section-heading compact-heading"><div><p className="eyebrow">تسوقي على مزاجكِ</p><h2 id="categories-title">تسوّقي حسب القسم</h2></div><p className="heading-note">كل الأشياء اللي تحبينها، مرتّبة لكِ.</p></div>
      <div className="category-track" aria-label="أقسام التسوق">
        {cards.map(card => <Link key={card.image} className="category-item" data-gsap-target to={card.to}>
          <span className="category-backdrop" aria-hidden="true" />
          <img className="category-cutout" src={asset(card.image)} alt="" loading="lazy" width="1448" height="1086" />
          <span className="category-info"><span className="category-info-icon"><CategoryIcon kind={card.icon} /></span><span className="category-label">{card.label}</span><Icon name="arrow" className="icon category-chevron" /></span>
        </Link>)}
      </div>
    </div>
  </section>
}
