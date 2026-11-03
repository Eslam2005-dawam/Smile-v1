import { Link } from 'react-router'
import { categories, categoryPath, type CategoryId } from '../../data/categories'

function CategoryArtwork({ category }: { category: CategoryId }) {
  return <svg className="category-icon" viewBox="0 0 48 48" aria-hidden="true">
    {category === 'all' && <path d="M16 15h16l3 24H13l3-24Zm3 2v-4a5 5 0 0 1 10 0v4M19 26h10" />}
    {category === 'makeup' && <path d="m16 30 15-15 5 5-15 15H14l2-5Zm12-12 4 4M12 15h8m-4-4v8" />}
    {category === 'skincare' && <path d="M19 11h10v6l4 4v16H15V21l4-4v-6Zm0 6h10m-9 10c2-2 6-2 8 0" />}
    {category === 'hair' && <path d="M18 12h12l2 6-2 19H18l-2-19 2-6Zm2 0V8h8v4m-9 12h10" />}
    {category === 'perfume' && <path d="M21 10h6v6l6 5v16H15V21l6-5v-6Zm0 0h6m-9 17h12" />}
    {category === 'bags' && <path d="M12 20h24l-2 18H14l-2-18Zm7 0v-4a5 5 0 0 1 10 0v4m-8 8h6" />}
    {category === 'natural' && <path d="M21 9h6v6l5 4v17H16V19l5-4V9Zm0 0h6m-8 18c4-4 7-4 10 0" />}
    {category === 'accessories' && <><circle cx="24" cy="24" r="11"/><circle cx="24" cy="24" r="4"/><path d="m16 15-4-4m20 4 4-4M16 33l-4 4m20-4 4 4"/></>}
  </svg>
}

export function Categories() {
  return <section className="category-section page-shell" id="categories" aria-labelledby="categories-title">
    <div className="section-heading compact-heading"><div><p className="eyebrow"></p><h2 id="categories-title">تسوّقي حسب القسم</h2></div><p className="heading-note">كل الأشياء اللي تحبينها، مرتّبة لكِ.</p></div>
    <div className="category-track" role="group" aria-label="تسوّقي حسب القسم">
      <Link className="category-item is-active" to="/products"><span className="category-orb orb-pink"><CategoryArtwork category="all" /></span><span>كل المنتجات</span></Link>
      {categories.map(category => <Link key={category.id} className="category-item" to={categoryPath(category.id)}><span className={`category-orb orb-${category.orb}`}><CategoryArtwork category={category.id} /></span><span>{category.label}</span></Link>)}
    </div>
  </section>
}
