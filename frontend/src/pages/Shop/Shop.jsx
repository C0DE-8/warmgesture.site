import { useMemo } from 'react'
import ProductCard from '../../components/ProductCard.jsx'
import './Shop.css'

const filters = ['All gifts', 'Flowers', 'Sweet treats', 'Snack boxes', 'Gift boxes', 'Keepsakes']

export default function Shop({ products, category, onCategory, onAdd }) {
  const filtered = useMemo(() => category === 'All gifts' ? products : products.filter((p) => p.category === category), [products, category])
  return <section className="shop-page"><div className="shop-intro"><span className="eyebrow">A LITTLE JOY, COMING RIGHT UP</span><h1>Gifts with <em>feeling.</em></h1><p>For the big days, the little days, and all the days in between.</p><div className="shop-floating-gift" aria-hidden="true"><span>♡</span></div></div><div className="shop-content content-width"><div className="shop-toolbar"><div className="shop-filters" aria-label="Filter gifts">{filters.map((filter) => <button key={filter} className={category === filter ? 'filter-active' : ''} onClick={() => onCategory(filter)}>{filter}</button>)}</div><span className="result-count">{filtered.length} lovely things</span></div>{filtered.length ? <div className="product-grid shop-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd}/>)}</div> : <p className="empty-state">We’re gathering more lovely things for this shelf. Check back soon!</p>}</div></section>
}
