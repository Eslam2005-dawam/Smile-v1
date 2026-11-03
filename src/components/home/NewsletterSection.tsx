import { useState, type FormEvent } from 'react'
import { Icon } from '../ui/Icon'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [feedback, setFeedback] = useState('بالاشتراك، أنتِ توافقين على رسائل Smile Store اللطيفة.')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFeedback('شكراً لكِ! هذا نموذج تجريبي ولا يحفظ بياناتكِ.')
    setEmail('')
  }

  return <section className="newsletter-section page-shell" id="newsletter" aria-labelledby="newsletter-title">
    <div className="newsletter-sparkle" aria-hidden="true"><Icon name="sparkle" /></div>
    <div className="newsletter-copy"><p className="eyebrow">رسالة صغيرة منّا لكِ</p><h2 id="newsletter-title">كوني أول من يعرف<br/><span>كل شيء جميل.</span></h2><p>عروض، إلهام، وأشياء جديدة نحبّ أن نشارككِ بها.</p></div>
    <form className="newsletter-form" onSubmit={submit}><label htmlFor="newsletter-email">بريدكِ الإلكتروني</label><div className="newsletter-input-wrap"><input id="newsletter-email" name="email" type="email" placeholder="name@example.com" required autoComplete="email" dir="ltr" value={email} onChange={event => setEmail(event.target.value)} /><button className="button button-dark" type="submit">انضمّي إلينا <Icon name="arrow" /></button></div><p className="newsletter-feedback" aria-live="polite">{feedback}</p></form>
  </section>
}
