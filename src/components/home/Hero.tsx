import { useRef, useState } from 'react'
import { images } from '../../assets'
import { Icon } from '../ui/Icon'
import { gsap } from '../../animations/gsap'
import { useGsapMotion } from '../../animations/useGsapMotion'
import { bestSellers, formatNumber } from '../../data/storeProducts'

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/imgs/${name}`

const slides = [
  {
    eyebrow: 'لحظات جميلة تبدأ من هنا',
    title: 'كلّ اللي تحبينه...',
    accent: 'في مكان واحد',
    description: 'جمالكِ، عنايتكِ، وتفاصيل صغيرة تخلّي يومكِ أحلى.',
    image: images.hero,
    mobileImage: images.hero,
    alt: 'أجواء تسوق وردية مع مستحضرات تجميل وعناية',
  },
  {
    eyebrow: 'اختاري لحظتكِ الجميلة',
    title: 'تفاصيلكِ الحلوة...',
    accent: 'تبدأ مع Smile',
    description: 'اكتشفي اختيارات الجمال والعناية المتاحة لكِ.',
    image: asset('smile-hero-desktop.webp'),
    mobileImage: asset('smile-hero-mobile-vertical.webp'),
    alt: 'تشكيلة تجميل وعطور على خلفية وردية',
  },
] as const

export function Hero({ onAdd }: { onAdd: (id: string) => void }) {
  const heroRef = useRef<HTMLElement | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const featuredProduct = bestSellers[0]
  const slide = slides[activeSlide]

  useGsapMotion(heroRef, (root) => {
    const targets = root.querySelectorAll<HTMLElement>('.hero-eyebrow, #hero-title, .hero-description, .hero-cta')
    if (!targets.length) return
    gsap.fromTo(targets, { autoAlpha: 0, y: 12 }, {
      autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.09, ease: 'power2.out',
      clearProps: 'opacity,visibility,transform',
    })
  })

  const changeSlide = (next: number) => setActiveSlide((next + slides.length) % slides.length)

  return <section className={`full-bleed hero v2-hero v2-hero--slide-${activeSlide + 1}`} aria-labelledby="hero-title" aria-roledescription="عرض صور" ref={heroRef}>
    {slides.map((item, index) => <picture key={item.image} className={`v2-hero-picture${index === activeSlide ? ' is-active' : ''}`} aria-hidden={index !== activeSlide}>
      <source media="(max-width: 560px)" srcSet={item.mobileImage} />
      <img className="hero-image" src={item.image} alt={index === activeSlide ? item.alt : ''} fetchPriority={index === 0 ? 'high' : 'auto'} width={index === 0 ? 2000 : 1774} height={index === 0 ? 857 : 887} />
    </picture>)}
    <div className="hero-copy">
      <p className="eyebrow hero-eyebrow" data-gsap-target>{slide.eyebrow}</p>
      <h1 id="hero-title" data-gsap-target>{slide.title}<span>{slide.accent}</span></h1>
      <p className="hero-description" data-gsap-target>{slide.description}</p>
      <div className="hero-actions"><a className="button button-dark hero-cta" data-gsap-target href="#best-sellers">تسوّقي الآن <Icon name="arrow" /></a>
        {featuredProduct && <button className="hero-mobile-quick-add" type="button" aria-label={`أضيفي ${featuredProduct.name} إلى السلة`} onClick={() => onAdd(featuredProduct.id)}><Icon name="bag" /></button>}
      </div>
      {featuredProduct && <article className="hero-quick-add" aria-label="منتج من الأكثر مبيعاً">
        <img src={featuredProduct.image} alt="" width="68" height="76" />
        <div><span className="quick-add-note">من الأكثر مبيعاً</span><strong>{featuredProduct.name}</strong><b>{formatNumber.format(featuredProduct.price)} ج.م</b></div>
        <button type="button" aria-label={`أضيفي ${featuredProduct.name} إلى السلة`} onClick={() => onAdd(featuredProduct.id)}><Icon name="bag" /></button>
      </article>}
    </div>
    <div className="hero-carousel-controls" aria-label="شرائح الصفحة الرئيسية">
      <button type="button" className="hero-carousel-arrow hero-carousel-prev" aria-label="الشريحة السابقة" onClick={() => changeSlide(activeSlide - 1)}><Icon name="arrow" /></button>
      {slides.map((_, index) => <button key={index} type="button" className={`hero-carousel-dot${index === activeSlide ? ' is-active' : ''}`} aria-label={`عرض الشريحة ${index + 1} من ${slides.length}`} aria-pressed={index === activeSlide} onClick={() => changeSlide(index)} />)}
      <button type="button" className="hero-carousel-arrow hero-carousel-next" aria-label="الشريحة التالية" onClick={() => changeSlide(activeSlide + 1)}><Icon name="arrow" /></button>
    </div>
  </section>
}
