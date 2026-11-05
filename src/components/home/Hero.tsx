import { useRef } from 'react'
import { images } from '../../assets'
import { Icon } from '../ui/Icon'
import { gsap } from '../../animations/gsap'
import { useGsapMotion } from '../../animations/useGsapMotion'
import { bestSellers, formatNumber } from '../../data/storeProducts'

export function Hero({ onAdd }: { onAdd: (id: string) => void }) {
  const heroRef = useRef<HTMLElement | null>(null)
  const featuredProduct = bestSellers[0]

  useGsapMotion(heroRef, (root) => {
    const targets = [
      root.querySelector<HTMLElement>('.hero-eyebrow'),
      root.querySelector<HTMLElement>('#hero-title'),
      root.querySelector<HTMLElement>('.hero-description'),
      root.querySelector<HTMLElement>('.hero-cta'),
    ].filter((target): target is HTMLElement => target !== null)

    if (!targets.length) return

    const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } })
    targets.forEach((target, index) => {
      const isCta = target.classList.contains('hero-cta')
      timeline.fromTo(target,
        isCta ? { autoAlpha: 0 } : { autoAlpha: 0, y: 12 },
        isCta
          ? { autoAlpha: 1, duration: 0.32, clearProps: 'opacity,visibility' }
          : { autoAlpha: 1, y: 0, duration: index === 1 ? 0.4 : 0.32, clearProps: 'opacity,visibility,transform' },
        index === 0 ? 0 : '-=0.17',
      )
    })
  })

  return <section className="full-bleed hero" aria-labelledby="hero-title" ref={heroRef}>
    <img className="hero-image" src={images.hero} alt="أجواء وردية مرحة تجمع بين الجمال والعناية وتفاصيل التسوق" fetchPriority="high" width="2000" height="857" />
    <div className="hero-copy"><p className="eyebrow hero-eyebrow" data-gsap-target> اختاري لحظتكِ الجميلة</p><h1 id="hero-title" data-gsap-target>كلّ اللي تحبينه...<span>في مكان واحد</span></h1><p className="hero-description" data-gsap-target>جمالكِ، عنايتكِ، وتفاصيل صغيرة تخلّي يومكِ أحلى.</p><a className="button button-dark hero-cta" data-gsap-target href="#best-sellers">تسوّقي الآن <Icon name="arrow" /></a></div>
    {featuredProduct && <article className="hero-quick-add" aria-label="المنتج الأكثر طلبًا"><img src={featuredProduct.image} alt="" width="68" height="76" /><div><span className="quick-add-note">الأكثر طلبًا</span><strong>{featuredProduct.name}</strong><b>{formatNumber.format(featuredProduct.price)} ج.م</b></div><button type="button" aria-label={`أضيفي ${featuredProduct.name} إلى السلة`} onClick={() => onAdd(featuredProduct.id)}><Icon name="bag" /></button></article>}
    {/* <div className="hero-stamp" aria-hidden="true"><span>SMILE</span><Icon name="sparkle" /><small>YOUR DAILY JOY</small></div> */}
  </section>
}
