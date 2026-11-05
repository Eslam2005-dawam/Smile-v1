import { useRef } from 'react'
import { Icon } from '../ui/Icon'
import { gsap } from '../../animations/gsap'
import { useGsapMotion } from '../../animations/useGsapMotion'

export function OfferBanner() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useGsapMotion(sectionRef, (root) => {
    const content = root.querySelector<HTMLElement>('.offer-content')
    if (!content) return

    gsap.fromTo(content,
      { autoAlpha: 0, y: 11 },
      { autoAlpha: 1, y: 0, duration: 0.48, ease: 'power2.out', clearProps: 'opacity,visibility,transform', scrollTrigger: { trigger: root, start: 'top 86%', once: true } },
    )
  })

  return <section className="full-bleed offer-banner" id="offers" aria-labelledby="offer-title" ref={sectionRef}>
    <div className="section-inner offer-inner">
    <div className="offer-decoration offer-decoration-one" aria-hidden="true"/><div className="offer-decoration offer-decoration-two" aria-hidden="true"/>
    <div className="offer-content" data-gsap-target><p className="eyebrow eyebrow-light"><Icon name="sparkle" /> لحظات تستاهل الدلال</p><h2 id="offer-title">لأنّكِ تستحقين<br/><span>شيئاً جميلاً كل يوم.</span></h2><p>اكتشفي تشكيلة مختارة بعناية، واصنعي روتينكِ الخاص بكل حب.</p><a className="button button-light" href="#new-arrivals">شاهدي الجديد <Icon name="arrow" /></a></div>
    <div className="offer-side-note" aria-hidden="true"><span>Smile</span><small>little things<br/>make us glow</small><Icon name="heart" /></div>
    </div>
  </section>
}
