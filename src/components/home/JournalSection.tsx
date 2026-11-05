import { useRef } from 'react'
import { Icon } from '../ui/Icon'
import { gsap } from '../../animations/gsap'
import { useGsapMotion } from '../../animations/useGsapMotion'

export function JournalSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useGsapMotion(sectionRef, (root) => {
    const timeline = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 86%', once: true } })
    const heading = root.querySelector<HTMLElement>('.section-heading')
    const cards = root.querySelectorAll<HTMLElement>('.journal-card')

    if (heading) timeline.fromTo(heading,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.38, ease: 'power2.out', clearProps: 'opacity,visibility,transform' },
    )
    if (cards.length) timeline.fromTo(cards,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.38, stagger: 0.07, ease: 'power2.out', clearProps: 'opacity,visibility,transform' },
      heading ? '-=0.13' : 0,
    )
  })

  return <section className="full-bleed journal-section" aria-labelledby="journal-title" ref={sectionRef}>
    <div className="section-inner">
    <div className="section-heading" data-gsap-target><div><p className="eyebrow">من يومنا ليومكِ</p><h2 id="journal-title">تفاصيل صغيرة، فرق كبير</h2></div><p className="heading-note">أفكار خفيفة تلهمكِ وتقرّبكِ من روتينكِ المفضّل.</p></div>
    <div className="journal-grid">
      <article className="journal-card journal-card-one" data-gsap-target><span className="journal-mark">01</span><div><p>وقت لنفسكِ</p><h3>ابدئي صباحكِ<br/>بهدوء تحبينه.</h3><a href="#newsletter" className="journal-link">اكتشفي روتين العناية <Icon name="arrow" /></a></div></article>
      <article className="journal-card journal-card-two" data-gsap-target><span className="journal-mark">02</span><div><p>لمستكِ الخاصة</p><h3>لون صغير،<br/>حضور ما ينسى.</h3><a href="#categories" className="journal-link">تصفّحي المكياج <Icon name="arrow" /></a></div></article>
      <article className="journal-card journal-card-three" data-gsap-target><span className="journal-mark">03</span><div><p>اختيار بقلبكِ</p><h3>هدية جميلة،<br/>لشخص عزيز.</h3><a href="#categories" className="journal-link">اختاري هديتكِ <Icon name="arrow" /></a></div></article>
    </div>
    </div>
  </section>
}
