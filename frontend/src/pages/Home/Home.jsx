import ProductCard from '../../components/ProductCard.jsx'
import { imageUrl } from '../../data/products.js'
import './Home.css'

const categories = [
  { name: 'Flowers', sub: 'Say it with petals', image: 'photo-1494972308805-463bc619d34e', className: 'cat-flowers' },
  { name: 'Sweet treats', sub: 'A little sugar, a lot of love', image: 'photo-1548907040-4d42d979d68e', className: 'cat-sweets' },
  { name: 'Gift boxes', sub: 'All the good things together', image: 'photo-1549465220-1a8b9238cd48', className: 'cat-boxes' },
]

export default function Home({ products, onShop, onAdd }) {
  return <div className="home-page">
    <div className="announcement"><span>✦</span> A little joy, delivered. Free shipping on orders over $75 <span>✦</span></div>
    <section className="hero-section">
      <div className="hero-copy"><span className="eyebrow"><i/> SMALL GIFTS. BIG FEELINGS.</span><h1>Make their<br/><em>ordinary</em> feel<br/>a little magical.</h1><p>Thoughtful gifts for your favorite people, picked with care and wrapped with love.</p><div className="hero-buttons"><button className="button-primary" onClick={() => onShop()}>Find your something <span>↗</span></button><span className="hero-note"><span className="tiny-heart">♥</span> Sent with a little extra love</span></div><div className="hero-proof"><div className="avatar-stack"><span>J</span><span>M</span><span>A</span><span>+</span></div><div><strong>Little gestures, lots of love</strong><small>Made for the people who matter</small></div></div></div>
      <div className="hero-visual"><img src={imageUrl('photo-1518895949257-7621c3c786d7', 1600)} alt="A beautiful bunch of blush pink roses"/><div className="hero-sticker"><span>picked</span><strong>with<br/>♥</strong><span>love</span></div><div className="hero-caption"><span>01 / 03</span><span>For the love of little things</span></div></div>
      <span className="hero-deco deco-one">✳</span><span className="hero-deco deco-two">✿</span>
    </section>

    <section className="category-section content-width"><div className="section-heading"><div><span className="eyebrow">A LITTLE SOMETHING FOR EVERYONE</span><h2>Find their kind of <em>happy.</em></h2></div><button className="text-link" onClick={() => onShop()}>Shop everything <span>↗</span></button></div>
      <div className="category-grid">{categories.map((cat, i) => <button key={cat.name} className={`category-card ${cat.className}`} onClick={() => onShop(cat.name)}><img src={imageUrl(cat.image, 1000)} alt=""/><span className="category-number">0{i + 1}</span><span className="category-card-copy"><small>{cat.sub}</small><strong>{cat.name}<span>↗</span></strong></span></button>)}</div>
    </section>

    <section className="featured-section"><div className="content-width"><div className="section-heading"><div><span className="eyebrow">THE CURRENT CRUSHES</span><h2>Good things, <em>coming your way.</em></h2></div><button className="text-link" onClick={() => onShop()}>See all gifts <span>↗</span></button></div><div className="product-grid">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd}/>)}</div></div></section>

    <section className="note-banner"><div className="note-banner-image"><img src={imageUrl('photo-1511988617509-a57c8a288659', 1000)} alt="Friends sharing a joyful moment"/></div><div className="note-banner-copy"><span className="eyebrow">THE BEST KIND OF DELIVERY</span><span className="big-heart">♡</span><h2>Because “thinking of you”<br/>deserves <em>a little something.</em></h2><p>We believe the smallest gestures can make the biggest days. Find a thoughtful surprise for every kind of moment.</p><button className="button-dark" onClick={() => onShop()}>Send a little love <span>↗</span></button><span className="banner-doodle">with love, always</span></div></section>

    <section className="promise-strip content-width"><div><span>✳</span><p><strong>Good things, made fresh</strong><small>Picked and packed with care</small></p></div><div><span>♡</span><p><strong>A note from you</strong><small>Add a personal message</small></p></div><div><span>↗</span><p><strong>Delivered with love</strong><small>Right to their doorstep</small></p></div></section>
  </div>
}
