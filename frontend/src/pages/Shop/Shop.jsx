import { useMemo, useState } from 'react'
import ProductCard from '../../components/ProductCard.jsx'
import './Shop.css'

const filters = ['All gifts', 'Flowers', 'Sweet treats', 'Snack boxes', 'Gift boxes', 'Keepsakes']
const pageSize = 6

export default function Shop({ products, category, onCategory, onAdd }) {
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('featured')
  const filtered = useMemo(() => category === 'All gifts' ? products : products.filter((p) => p.category === category), [products, category])
  const sorted = useMemo(() => {
    const copy = [...filtered]
    if (sort === 'price-low') copy.sort((a, b) => a.price - b.price)
    if (sort === 'price-high') copy.sort((a, b) => b.price - a.price)
    if (sort === 'name') copy.sort((a, b) => a.name.localeCompare(b.name))
    return copy
  }, [filtered, sort])
  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  const visible = sorted.slice((page - 1) * pageSize, page * pageSize)
  const chooseCategory = (nextCategory) => { setPage(1); onCategory(nextCategory) }
  const chooseSort = (nextSort) => { setPage(1); setSort(nextSort) }
  const changePage = (next) => {
    setPage(next)
    document.querySelector('.shop-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return <section className="shop-page"><div className="shop-intro"><span className="eyebrow">A LITTLE JOY, COMING RIGHT UP</span><h1>Gifts with <em>feeling.</em></h1><p>For the big days, the little days, and all the days in between.</p><div className="shop-floating-gift" aria-hidden="true"><span>♡</span></div></div><div className="shop-content content-width"><div className="shop-toolbar"><div className="shop-filters" aria-label="Filter gifts">{filters.map((filter) => <button key={filter} className={category === filter ? 'filter-active' : ''} onClick={() => chooseCategory(filter)}>{filter}</button>)}</div><div className="shop-controls"><span className="result-count">Showing {sorted.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, sorted.length)} of {sorted.length} gifts</span><label className="sort-control">Sort by <select value={sort} onChange={(event) => chooseSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name</option></select></label></div></div>{visible.length ? <div className="product-grid shop-grid">{visible.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd}/>)}</div> : <p className="empty-state">We’re gathering more lovely things for this shelf. Check back soon!</p>}{pageCount > 1 && <nav className="pagination" aria-label="Product pages"><button className="page-arrow" onClick={() => changePage(Math.max(1, page - 1))} disabled={page === 1} aria-label="Previous page">←</button>{Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => <button key={number} className={page === number ? 'page-number current-page' : 'page-number'} aria-current={page === number ? 'page' : undefined} onClick={() => changePage(number)}>{String(number).padStart(2, '0')}</button>)}<button className="page-arrow" onClick={() => changePage(Math.min(pageCount, page + 1))} disabled={page === pageCount} aria-label="Next page">→</button><span className="page-caption">Page {page} of {pageCount}</span></nav>}</div></section>
}
