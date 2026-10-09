import { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard.jsx'
import Icon from '../../components/Icon.jsx'
import { imageUrl } from '../../data/products.js'
import './Home.css'

const categories = [
  { name: 'Flowers', sub: 'Say it with petals', image: 'photo-1494972308805-463bc619d34e', className: 'cat-flowers' },
  { name: 'Sweet treats', sub: 'A little sugar, a lot of love', image: 'photo-1575377427642-087cf684f29d', className: 'cat-sweets' },
  { name: 'Gift boxes', sub: 'All the good things together', image: 'photo-1549465220-1a8b9238cd48', className: 'cat-boxes' },
]

const slides = [
  { title: <>Make their<br/><em>ordinary</em> feel<br/>a little magical.</>, line: 'Thoughtful gifts for your favorite people, picked with care and wrapped with love.', image: 'photo-1518895949257-7621c3c786d7', alt: 'A beautiful bunch of blush pink roses', caption: 'For the love of little things', eyebrow: 'SMALL GIFTS. BIG FEELINGS.' },
  { title: <>A little joy,<br/><em>right on</em><br/>their doorstep.</>, line: 'The sweetest surprises for birthdays, thank-yous, and just-because days.', image: 'photo-1549465220-1a8b9238cd48', alt: 'A thoughtfully wrapped gift ready to send', caption: 'Make today feel like a celebration', eyebrow: 'WRAPPED UP WITH LOVE.' },
  { title: <>Send a hug<br/>in the shape<br/>of <em>a gift.</em></>, line: 'Find their new favorite treat, keepsake, or bunch of flowers in one happy place.', image: 'photo-1490750967868-88aa4486c946', alt: 'Fresh flowers arranged as a thoughtful gift', caption: 'For your favorite person, always', eyebrow: 'A LITTLE SOMETHING FOR THEM.' },
]

export default function Home({ products, onShop, onAdd }) {
  const [slide, setSlide] = useState(0)
  useEffect(() => { const timer = window.setInterval(() => setSlide((current) => (current + 1) % slides.length), 6500); return () => window.clearInterval(timer) }, [])
  const activeSlide = slides[slide]
  const showFallback = (event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/product-fallback.svg' }
  return <div className="home-page">
    <div className="announcement"><span>✦</span> A little joy, delivered. Free shipping on orders over $75 <span>✦</span></div>
    <section className="hero-section">
      <div className="hero-copy" key={`copy-${slide}`}><span className="eyebrow"><i/> {activeSlide.eyebrow}</span><h1>{activeSlide.title}</h1><p>{activeSlide.line}</p><div className="hero-buttons"><button className="button-primary" onClick={() => onShop()}>Find your something <span><Icon name="arrowRight" size={15}/></span></button><span className="hero-note"><span className="tiny-heart"><Icon name="heart" size={12}/></span> Sent with a little extra love</span></div><div className="hero-proof"><div className="avatar-stack"><span>J</span><span>M</span><span>A</span><span>+</span></div><div><strong>Little gestures, lots of love</strong><small>Made for the people who matter</small></div></div></div>
      <div className="hero-visual" key={`visual-${slide}`}><img src={imageUrl(activeSlide.image, 1600)} alt={activeSlide.alt} onError={showFallback}/><div className="hero-sticker"><span>picked</span><strong>with<br/><Icon name="heart" size={17}/></strong><span>love</span></div><div className="hero-caption"><span>0{slide + 1} / 0{slides.length}</span><span>{activeSlide.caption}</span></div><div className="hero-slider-controls"><button onClick={() => setSlide((slide + slides.length - 1) % slides.length)} aria-label="Previous slide"><Icon name="arrowLeft" size={15}/></button>{slides.map((item, index) => <button key={item.eyebrow} className={index === slide ? 'slide-dot active' : 'slide-dot'} onClick={() => setSlide(index)} aria-label={`Show slide ${index + 1}`} />)}<button onClick={() => setSlide((slide + 1) % slides.length)} aria-label="Next slide"><Icon name="arrowRight" size={15}/></button></div></div>
      <span className="hero-deco deco-one"><Icon name="sparkle" size={22}/></span><span className="hero-deco deco-two"><Icon name="sparkle" size={29}/></span>
    </section>

    <section className="category-section content-width"><div className="section-heading"><div><span className="eyebrow">A LITTLE SOMETHING FOR EVERYONE</span><h2>Find their kind of <em>happy.</em></h2></div><button className="text-link" onClick={() => onShop()}>Shop everything <span><Icon name="arrowRight" size={14}/></span></button></div>
      <div className="category-grid">{categories.map((cat, i) => <button key={cat.name} className={`category-card ${cat.className}`} onClick={() => onShop(cat.name)}><img src={imageUrl(cat.image, 1000)} alt="" onError={showFallback}/><span className="category-number">0{i + 1}</span><span className="category-card-copy"><small>{cat.sub}</small><strong>{cat.name}<span><Icon name="arrowRight" size={14}/></span></strong></span></button>)}</div>
    </section>

    <section className="featured-section"><div className="content-width"><div className="section-heading"><div><span className="eyebrow">THE CURRENT CRUSHES</span><h2>Good things, <em>coming your way.</em></h2></div><button className="text-link" onClick={() => onShop()}>See all gifts <span><Icon name="arrowRight" size={14}/></span></button></div><div className="product-grid">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd}/>)}</div><div className="featured-extra"><span><Icon name="sparkle" size={20}/></span><div><strong>Something for every kind of moment</strong><small>From tiny thank-yous to big celebrations</small></div><button className="text-link" onClick={() => onShop()}>Explore all {products.length} gifts <span><Icon name="arrowRight" size={14}/></span></button></div></div></section>

    <section className="note-banner"><div className="note-banner-image"><img src={imageUrl('photo-1511988617509-a57c8a288659', 1000)} alt="Friends sharing a joyful moment" onError={showFallback}/></div><div className="note-banner-copy"><span className="eyebrow">THE BEST KIND OF DELIVERY</span><span className="big-heart"><Icon name="heart" size={50}/></span><h2>Because “thinking of you”<br/>deserves <em>a little something.</em></h2><p>We believe the smallest gestures can make the biggest days. Find a thoughtful surprise for every kind of moment.</p><button className="button-dark" onClick={() => onShop()}>Send a little love <span><Icon name="arrowRight" size={14}/></span></button><span className="banner-doodle">with love, always</span></div></section>

    <section className="promise-strip content-width"><div><span><Icon name="sparkle" size={21}/></span><p><strong>Good things, made fresh</strong><small>Picked and packed with care</small></p></div><div><span><Icon name="heart" size={21}/></span><p><strong>A note from you</strong><small>Add a personal message</small></p></div><div><span><Icon name="gift" size={21}/></span><p><strong>Delivered with love</strong><small>Right to their doorstep</small></p></div></section>
  </div>
}
