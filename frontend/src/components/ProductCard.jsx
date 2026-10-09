import { imageUrl } from '../data/products.js'

export default function ProductCard({ product, onAdd }) {
  const showFallback = (event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/product-fallback.svg' }
  return <article className="product-card">
    <div className="product-image-wrap"><img src={imageUrl(product.image)} alt={product.name} loading="lazy" onError={showFallback}/><span className="product-tag">{product.tag}</span>
      <button className="quick-add" onClick={() => onAdd(product)} aria-label={`Add ${product.name} to bag`} title={`Add ${product.name} to bag`}>+</button>
    </div>
    <div className="product-info"><div><h3>{product.name}</h3><p>{product.note}</p></div><span className="product-price">${product.price}</span></div>
  </article>
}
