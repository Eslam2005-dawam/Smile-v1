import { Icon } from '../ui/Icon'

export function OfferBanner() {
  return <section className="offer-banner page-shell" id="offers" aria-labelledby="offer-title">
    <div className="offer-decoration offer-decoration-one" aria-hidden="true"/><div className="offer-decoration offer-decoration-two" aria-hidden="true"/>
    <div className="offer-content"><p className="eyebrow eyebrow-light"><Icon name="sparkle" /> لحظات تستاهل الدلال</p><h2 id="offer-title">لأنّكِ تستحقين<br/><span>شيئاً جميلاً كل يوم.</span></h2><p>اكتشفي تشكيلة مختارة بعناية، واصنعي روتينكِ الخاص بكل حب.</p><a className="button button-light" href="#new-arrivals">شاهدي الجديد <Icon name="arrow" /></a></div>
    <div className="offer-side-note" aria-hidden="true"><span>Smile</span><small>little things<br/>make us glow</small><Icon name="heart" /></div>
  </section>
}
