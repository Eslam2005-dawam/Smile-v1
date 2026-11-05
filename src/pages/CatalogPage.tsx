import { Link, useParams, useSearchParams } from 'react-router'
import { categories, categoryFromSlug, categoryPath } from '../data/categories'
import { allProducts, formatProductCount, type Product } from '../data/storeProducts'
import { ProductGrid } from '../components/products/ProductGrid'

type SortOption = 'recommended' | 'newest' | 'price-asc' | 'price-desc'

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'recommended', label: 'المقترح' },
  { value: 'newest', label: 'الأحدث' },
  { value: 'price-asc', label: 'السعر: من الأقل للأعلى' },
  { value: 'price-desc', label: 'السعر: من الأعلى للأقل' },
]

function isSortOption(value: string | null): value is SortOption {
  return sortOptions.some(option => option.value === value)
}

function sortProducts(products: Product[], sort: SortOption) {
  if (sort === 'price-asc') return [...products].sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') return [...products].sort((a, b) => b.price - a.price)
  if (sort === 'newest') return [...products].sort((a, b) => Number(b.newArrival) - Number(a.newArrival))
  return products
}

interface Props {
  query: string
  onClearQuery: () => void
  favoriteIds: ReadonlySet<string>
  onFavorite: (id: string) => void
  onAdd: (id: string) => void
}

export function CatalogPage({ query, onClearQuery, favoriteIds, onFavorite, onAdd }: Props) {
  const { slug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const category = slug ? categoryFromSlug(slug) : undefined
  const sortParam = searchParams.get('sort')
  const sort = isSortOption(sortParam) ? sortParam : 'recommended'
  const needle = query.trim().toLocaleLowerCase('ar')

  if (slug && !category) {
    return <main className="catalog-page page-shell" id="main-content"><div className="catalog-empty"><h1>القسم غير موجود</h1><p>تصفّحي الأقسام المتاحة أو كل المنتجات.</p><Link className="button button-dark" to="/products">كل المنتجات</Link></div></main>
  }

  const matching = allProducts.filter(product => (!category || product.category === category.id) && (!needle || `${product.name} ${product.description} ${product.note}`.toLocaleLowerCase('ar').includes(needle)))
  const displayed = sortProducts(matching, sort)
  const title = category?.label ?? 'كل المنتجات'

  function updateSort(value: SortOption) {
    const next = new URLSearchParams(searchParams)
    if (value === 'recommended') next.delete('sort')
    else next.set('sort', value)
    setSearchParams(next)
  }

  return <main className="catalog-page page-shell" id="main-content">
    <nav className="catalog-breadcrumbs" aria-label="مسار الصفحة"><Link to="/">الرئيسية</Link><span aria-hidden="true">/</span>{category ? <><Link to="/products">كل المنتجات</Link><span aria-hidden="true">/</span><span aria-current="page">{category.label}</span></> : <span aria-current="page">كل المنتجات</span>}</nav>
    <div className="catalog-intro"><div><p className="eyebrow">مساحتكِ المفضّلة</p><h1>{title}</h1><p className="catalog-subtitle">اختاري ما يناسبكِ من تشكيلة Smile Store.</p></div><p className="catalog-count" aria-live="polite">{formatProductCount(displayed.length)}</p></div>
    <nav className="catalog-categories" aria-label="تصنيفات المنتجات"><Link className={`catalog-chip${category ? '' : ' is-active'}`} to="/products" aria-current={category ? undefined : 'page'}>كل المنتجات</Link>{categories.map(item => <Link key={item.id} className={`catalog-chip${category?.id === item.id ? ' is-active' : ''}`} to={categoryPath(item.id)} aria-current={category?.id === item.id ? 'page' : undefined}>{item.label}</Link>)}</nav>
    <div className="catalog-toolbar"><p>{query.trim() ? `نتائج البحث عن «${query.trim()}»` : 'تصفّحي المنتجات حسب القسم أو السعر'}</p><div className="catalog-sort"><label htmlFor="catalog-sort">ترتيب حسب</label><select id="catalog-sort" value={sort} onChange={event => updateSort(event.target.value as SortOption)}>{sortOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div></div>
    {displayed.length ? <ProductGrid products={displayed} favoriteIds={favoriteIds} onFavorite={onFavorite} onAdd={onAdd} ariaLabel={`منتجات ${title}`} className="catalog-grid" /> : <div className="catalog-empty" role="status"><h2>ما لقينا منتجات مطابقة</h2><p>جرّبي قسماً آخر{needle ? ' أو امسحي كلمة البحث.' : '.'}</p>{needle ? <button className="button button-dark" type="button" onClick={onClearQuery}>مسح البحث</button> : <Link className="button button-dark" to="/products">كل المنتجات</Link>}</div>}
  </main>
}
