import { Icon } from '../ui/Icon'

export function JournalSection() {
  return <section className="journal-section page-shell" aria-labelledby="journal-title">
    <div className="section-heading"><div><p className="eyebrow">من يومنا ليومكِ</p><h2 id="journal-title">تفاصيل صغيرة، فرق كبير</h2></div><p className="heading-note">أفكار خفيفة تلهمكِ وتقرّبكِ من روتينكِ المفضّل.</p></div>
    <div className="journal-grid">
      <article className="journal-card journal-card-one"><span className="journal-mark">01</span><div><p>وقت لنفسكِ</p><h3>ابدئي صباحكِ<br/>بهدوء تحبينه.</h3><a href="#newsletter" className="journal-link">اكتشفي روتين العناية <Icon name="arrow" /></a></div></article>
      <article className="journal-card journal-card-two"><span className="journal-mark">02</span><div><p>لمستكِ الخاصة</p><h3>لون صغير،<br/>حضور ما ينسى.</h3><a href="#categories" className="journal-link">تصفّحي المكياج <Icon name="arrow" /></a></div></article>
      <article className="journal-card journal-card-three"><span className="journal-mark">03</span><div><p>اختيار بقلبكِ</p><h3>هدية جميلة،<br/>لشخص عزيز.</h3><a href="#categories" className="journal-link">اختاري هديتكِ <Icon name="arrow" /></a></div></article>
    </div>
  </section>
}
