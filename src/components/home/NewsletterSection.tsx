import { useRef, useState, type FormEvent } from 'react'
import { Icon } from '../ui/Icon'
import { gsap } from '../../animations/gsap'
import { useGsapMotion } from '../../animations/useGsapMotion'

export function NewsletterSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [email, setEmail] = useState('')
  const [feedback, setFeedback] = useState('بالاشتراك، أنتِ توافقين على رسائل Smile Store اللطيفة.')

  useGsapMotion(sectionRef, (root) => {
    const timeline = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 86%', once: true } })
    const copy = root.querySelector<HTMLElement>('.newsletter-copy')
    const form = root.querySelector<HTMLElement>('.newsletter-form')

    if (copy) timeline.fromTo(copy,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.38, ease: 'power2.out', clearProps: 'opacity,visibility,transform' },
    )
    if (form) timeline.fromTo(form,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.38, ease: 'power2.out', clearProps: 'opacity,visibility,transform' },
      copy ? '-=0.15' : 0,
    )
  })

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFeedback('شكراً لكِ! هذا نموذج تجريبي ولا يحفظ بياناتكِ.')
    setEmail('')
  }

  return <section className="full-bleed newsletter-section" id="newsletter" aria-labelledby="newsletter-title" ref={sectionRef}>
    <div className="section-inner newsletter-inner">
    <div className="newsletter-sparkle" aria-hidden="true"><Icon name="sparkle" /></div>
    <div className="newsletter-copy" data-gsap-target><p className="eyebrow">رسالة صغيرة منّا لكِ</p><h2 id="newsletter-title">كوني أول من يعرف<br/><span>كل شيء جميل.</span></h2><p>عروض، إلهام، وأشياء جديدة نحبّ أن نشارككِ بها.</p></div>
    <form className="newsletter-form" data-gsap-target onSubmit={submit}><label htmlFor="newsletter-email">بريدكِ الإلكتروني</label><div className="newsletter-input-wrap"><input id="newsletter-email" name="email" type="email" placeholder="name@example.com" required autoComplete="email" dir="ltr" value={email} onChange={event => setEmail(event.target.value)} /><button className="button button-dark" type="submit">انضمّي إلينا <Icon name="arrow" /></button></div><p className="newsletter-feedback" aria-live="polite">{feedback}</p></form>
    </div>
  </section>
}
