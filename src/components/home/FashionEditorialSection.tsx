import { useRef } from 'react'
import { Link } from 'react-router'
import { Icon } from '../ui/Icon'
import { gsap } from '../../animations/gsap'
import { useGsapMotion } from '../../animations/useGsapMotion'

const editorialImage = `${import.meta.env.BASE_URL}assets/imgs/smile-editorial-fashion.webp`

export function FashionEditorialSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useGsapMotion(sectionRef, (root) => {
    const copy = root.querySelector<HTMLElement>('.fashion-editorial-content')
    if (!copy) return

    gsap.fromTo(copy, { autoAlpha: 0, y: 12 }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.45,
      ease: 'power2.out',
      clearProps: 'opacity,visibility,transform',
      scrollTrigger: { trigger: root, start: 'top 86%', once: true },
    })
  })

  return <section className="full-bleed fashion-editorial" id="our-story" aria-labelledby="fashion-editorial-title" ref={sectionRef}>
    <div className="fashion-editorial-media">
      <img src={editorialImage} alt="عارضة أزياء ببدلة عنابية أمام خلفية وردية" loading="lazy" decoding="async" width="1774" height="887" />
    </div>
    <div className="fashion-editorial-copy">
      <div className="fashion-editorial-content" data-gsap-target>
        <h2 id="fashion-editorial-title">جمالك مش<br />قالب واحد.</h2>
        <p>كل إطلالة ليها حكاية. اختاري اللي شبهك، وسيبي الباقي علينا.</p>
        <Link className="button button-dark fashion-editorial-cta" to="/products">اكتشفي المنتجات <Icon name="arrow" /></Link>
      </div>
    </div>
  </section>
}
