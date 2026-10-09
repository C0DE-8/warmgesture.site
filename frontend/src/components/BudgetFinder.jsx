import { useMemo, useState } from 'react'
import ProductCard from './ProductCard.jsx'

export default function BudgetFinder({ products, onAdd }) {
  const [budget, setBudget] = useState(20)
  const matches = useMemo(() => products.filter((product) => product.price <= budget).sort((a, b) => a.price - b.price || a.id - b.id), [products, budget])
  return <section className="budget-finder content-width" aria-labelledby="budget-title"><div className="budget-intro"><span className="eyebrow">A LOVELY GIFT, AT YOUR PRICE</span><h2 id="budget-title">Little budget.<br/><em>Lots of heart.</em></h2><p>Choose what you’d like to spend and we’ll find thoughtful gifts that fit.</p><label className="budget-slider-label" htmlFor="gift-budget">Your budget <strong>${budget}</strong></label><input id="gift-budget" className="budget-slider" type="range" min="10" max="100" step="5" value={budget} onChange={(event) => setBudget(Number(event.target.value))}/><div className="budget-range"><span>$10</span><span>$100</span></div><p className="budget-match-count">{matches.length} gift{matches.length === 1 ? '' : 's'} at or under ${budget}</p></div><div className="budget-results">{matches.length ? matches.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd}/>) : <p className="budget-empty">Try a little more to discover lovely gifts.</p>}</div></section>
}
