import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { Icon } from '../components/ui/Icon'
import { ProductCard } from '../components/products/ProductCard'
import { allProducts, formatNumber } from '../data/storeProducts'
import { categoryPath, categories } from '../data/categories'

interface Props {
  favoriteIds: ReadonlySet<string>
  onFavorite: (id: string) => void
  onAdd: (id: string, variant?: string) => void
}

function money(value: number) { return `${formatNumber.format(value)} ج.م` }

export function ProductDetailPage({ favoriteIds, onFavorite, onAdd }: Props) {
  const { slug } = useParams()
  const product = allProducts.find((item) => item.slug === slug)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState('')
  const [selectedVariant, setSelectedVariant] = useState('')

  useEffect(() => {
    if (!product) return
    const previousTitle = document.title
    document.title = `${product.name} | Smile Store`
    setActiveImage(product.image)
    setSelectedVariant(product.variants?.[0] ?? '')
    setQuantity(1)
    return () => { document.title = previousTitle }
  }, [product])

  if (!product) {
    return <main className="product-not-found page-shell" id="main-content"><div className="catalog-empty"><h1>المنتج غير متاح</h1><p>تصفّحي المنتجات المتاحة واختاري ما يناسبكِ.</p><Link className="button button-dark" to="/products">كل المنتجات</Link></div></main>
  }

  const category = categories.find((item) => item.id === product.category)
  const related = allProducts.filter((item) => item.id !== product.id && (item.category === product.category || item.bestSeller)).slice(0, 4)
  const favorite = favoriteIds.has(product.id)

  return <main className="product-detail-page" id="main-content">
    <nav className="product-breadcrumbs page-shell" aria-label="مسار الصفحة"><Link to="/">الرئيسية</Link><span aria-hidden="true">/</span><Link to="/products">كل المنتجات</Link><span aria-hidden="true">/</span>{category && <><Link to={categoryPath(category.id)}>{category.label}</Link><span aria-hidden="true">/</span></>}<span aria-current="page">{product.name}</span></nav>
    <section className="product-detail section-inner" aria-labelledby="product-detail-title">
      <div className="product-detail-media"><img src={activeImage || product.image} alt={product.name} width="900" height="1125" fetchPriority="high" onError={(event) => { const fallback = product.gallery?.[0]; if (fallback && event.currentTarget.src !== new URL(fallback, window.location.href).href) { event.currentTarget.src = fallback; setActiveImage(fallback) } else event.currentTarget.style.visibility = 'hidden' }} /><span className={product.discount === 'جديد' ? 'product-badge badge-new' : 'product-badge'}>{product.discountSource === 'mock_demo' ? `عرض تجريبي ${product.discount}` : product.discount}</span></div>
      <div className="product-detail-info"><p className="eyebrow">{category?.label ?? 'اختيارات Smile Store'}</p><div className="product-rating detail-rating" aria-label={`تقييم تجريبي ${product.rating} من ٥`}><span className="star" aria-hidden="true">★</span><span>{product.rating}</span><span>تقييم تجريبي · ليس مراجعة عميل</span></div><h1 id="product-detail-title">{product.name}</h1><p className="product-detail-description">{product.description}</p><p className="product-detail-note"><Icon name="sparkle" /> {product.note}</p><div className="detail-price-line"><strong>{money(product.price)}</strong><del>{money(product.oldPrice)}</del><span>{product.discountSource === 'mock_demo' ? `عرض تجريبي ${product.discount}` : product.discount}</span></div><p className="detail-sample-price">{product.isEstimatedPrice ? 'سعر تقديري للعرض التوضيحي' : 'السعر المرصود في كتالوج WhatsApp'} · السعر السابق والخصم تجريبيان</p><p className={`detail-stock${product.inStock ? '' : ' is-unavailable'}`} role="status">{product.inStock ? (product.isMockMarketingData ? 'متوفر تجريبيًا للمعاينة' : 'متوفر للطلب') : 'غير متوفر حاليًا'}</p>
        {product.gallery && product.gallery.length > 0 && <div className="product-gallery-thumbs" role="group" aria-label="صور المنتج"><button type="button" className={activeImage === product.image ? 'is-active' : ''} aria-label="الصورة الأساسية" onClick={() => setActiveImage(product.image)}><img src={product.image} alt="" loading="lazy" /></button>{product.gallery.slice(0, 7).map((image, index) => <button type="button" key={image} className={activeImage === image ? 'is-active' : ''} aria-label={`صورة إضافية ${index + 1}`} onClick={() => setActiveImage(image)}><img src={image} alt="" loading="lazy" /></button>)}</div>}
        {product.variants && product.variants.length > 0 && <label className="detail-variant">اختاري الدرجة أو النوع<select value={selectedVariant} onChange={(event) => setSelectedVariant(event.target.value)}><option value="">اختاري</option>{product.variants.map((variant) => <option key={variant} value={variant}>{variant}</option>)}</select></label>}
        <div className="product-detail-actions"><div className="quantity-control" aria-label="الكمية"><button type="button" aria-label="تقليل الكمية" onClick={() => setQuantity((current) => Math.max(1, current - 1))}>−</button><output>{formatNumber.format(quantity)}</output><button type="button" aria-label="زيادة الكمية" onClick={() => setQuantity((current) => current + 1)}>+</button></div><button className="checkout-cta detail-add-button" type="button" disabled={!product.inStock || Boolean(product.variants?.length && !selectedVariant)} onClick={() => Array.from({ length: quantity }, () => onAdd(product.id, selectedVariant || undefined))}><Icon name="bag" /> أضيفي للسلة · {money(product.price * quantity)}</button></div>
        <button className={`detail-favorite${favorite ? ' is-active' : ''}`} type="button" aria-pressed={favorite} onClick={() => onFavorite(product.id)}><Icon name="heart" />{favorite ? 'أُضيف إلى المفضلة' : 'أضيفي إلى المفضلة'}</button>
        <div className="detail-perks"><p><Icon name="truck" /> شحن لجميع المحافظات</p><p><Icon name="shield" /> الدفع عند الاستلام</p><p><Icon name="heart" /> دعم واستبدال سهل</p></div>
      </div>
    </section>
    {related.length > 0 && <section className="related-products full-bleed"><div className="section-inner"><div className="section-heading"><div><p className="eyebrow">اختيارات تكمل يومكِ</p><h2>قد يعجبكِ أيضًا</h2></div><Link className="text-link" to={category ? categoryPath(category.id) : '/products'}>تصفّحي المزيد <Icon name="arrow" /></Link></div><div className="product-grid">{related.map((item) => <ProductCard key={item.id} product={item} favorite={favoriteIds.has(item.id)} onFavorite={onFavorite} onAdd={onAdd} />)}</div></div></section>}
  </main>
}
