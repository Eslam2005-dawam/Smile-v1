import { useRef } from 'react'
import { Link } from 'react-router'
import { categoryPath } from '../../data/categories'
import { Icon } from '../ui/Icon'
import { gsap } from '../../animations/gsap'
import { useGsapMotion } from '../../animations/useGsapMotion'

type Campaign = 'color-crush' | 'afterglow'
const asset = (name: string) => `${import.meta.env.BASE_URL}assets/imgs/${name}`

const campaigns = {
  'color-crush': {
    id: 'offers',
    desktop: 'smile_color_crush_q88.webp',
    mobile: 'smile_color_crush_q88.webp',
    eyebrow: 'COLOR CRUSH',
    title: 'لون يعبّر عنكِ',
    description: 'لمسات مكياج تختارينها على مزاجكِ.',
    cta: 'تسوّقي المكياج',
    to: categoryPath('makeup'),
    alt: 'تشكيلة مكياج بدرجات وردية وتوتية',
  },
  afterglow: {
    id: 'afterglow',
    desktop: 'SMILE_Afterglow_Banner_Optimized.webp',
    mobile: 'SMILE_Afterglow_Mobile_Optimized.webp',
    eyebrow: 'AFTERGLOW',
    title: 'عطر يكمّل حضوركِ',
    description: 'اكتشفي العطور المتاحة في Smile.',
    cta: 'تسوّقي العطور',
    to: categoryPath('perfume'),
    alt: 'زجاجة عطر وردية مع عبوتها على خلفية عنابية',
  },
} as const

export function CampaignBanner({ campaign }: { campaign: Campaign }) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const content = campaigns[campaign]
  useGsapMotion(sectionRef, (root) => {
    const copy = root.querySelector<HTMLElement>('.v2-campaign-copy')
    if (copy) gsap.fromTo(copy, { autoAlpha: 0 }, {
      autoAlpha: 1, duration: 0.45, ease: 'power2.out',
      clearProps: 'opacity,visibility',
      scrollTrigger: { trigger: root, start: 'top 86%', once: true },
    })
  })

  return <section className={`full-bleed v2-campaign v2-campaign--${campaign}`} id={content.id} aria-labelledby={`${content.id}-title`} ref={sectionRef}>
    <picture className="v2-campaign-picture">
      <source media="(max-width: 860px)" srcSet={asset(content.mobile)} />
      <img src={asset(content.desktop)} alt={content.alt} loading="lazy" width="2087" height="754" />
    </picture>
    <div className="v2-campaign-copy" data-gsap-target>
      <p className="eyebrow">{content.eyebrow}</p>
      <h2 id={`${content.id}-title`}>{content.title}</h2>
      <p>{content.description}</p>
      <Link className="button button-light" to={content.to}>{content.cta} <Icon name="arrow" /></Link>
    </div>
  </section>
}
