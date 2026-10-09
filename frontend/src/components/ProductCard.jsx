import { imageUrl } from '../data/products.js'

export default function ProductCard({ product, onAdd }) {
  return <article className="product-card">
    <div className="product-image-wrap"><img src={imageUrl(product.image)} alt={product.name} loading="lazy"/><span className="product-tag">{product.tag}</span>
      <button className="quick-add" onClick={() => onAdd(product)} aria-label={`Add ${product.name} to bag`}>+</button>
    </div>
    <div className="product-info"><div><h3>{product.name}</h3><p>{product.note}</p></div><span className="product-price">${product.price}</span></div>
  </article>
}
