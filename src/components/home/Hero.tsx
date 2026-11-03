import { images } from '../../assets'
import { Icon } from '../ui/Icon'

export function Hero() {
  return <section className="hero page-shell" aria-labelledby="hero-title">
    <img className="hero-image" src={images.hero} alt="أجواء وردية مرحة تجمع بين الجمال والعناية وتفاصيل التسوق" fetchPriority="high" width="2000" height="857" />
    <div className="hero-copy"><p className="eyebrow hero-eyebrow"> اختاري لحظتكِ الجميلة</p><h1 id="hero-title">كلّ اللي تحبينه...<span>في مكان واحد</span></h1><p className="hero-description">جمالكِ، عنايتكِ، وتفاصيل صغيرة تخلّي يومكِ أحلى.</p><a className="button button-dark hero-cta" href="#best-sellers">تسوّقي الآن <Icon name="arrow" /></a></div>
    {/* <div className="hero-stamp" aria-hidden="true"><span>SMILE</span><Icon name="sparkle" /><small>YOUR DAILY JOY</small></div> */}
  </section>
}
