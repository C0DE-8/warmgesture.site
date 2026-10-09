import { useState } from 'react'
import Home from './pages/Home/Home.jsx'
import Shop from './pages/Shop/Shop.jsx'
import { products } from './data/products.js'
import './App.css'

function App() {
  const [page, setPage] = useState('home')
  const [category, setCategory] = useState('All gifts')
  const [cart, setCart] = useState([])
  const addToCart = (product) => setCart((items) => [...items, product])
  const shop = (nextCategory = 'All gifts') => { setCategory(nextCategory); setPage('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <button className="brand" onClick={() => setPage('home')} aria-label="WarmGesture home">
            <span className="brand-mark">w<span>♥</span></span><span className="brand-name">warmgesture<span className="brand-dot">.</span></span>
          </button>
          <nav className="main-nav" aria-label="Main navigation">
            <button className={page === 'home' ? 'nav-active' : ''} onClick={() => setPage('home')}>Home</button>
            <button className={page === 'shop' ? 'nav-active' : ''} onClick={() => shop()}>Shop all</button>
            <button onClick={() => shop('Flowers')}>Flowers</button>
            <button onClick={() => shop('Sweet treats')}>Sweet treats</button>
            <button onClick={() => shop('Gift boxes')}>Gift boxes</button>
          </nav>
          <div className="header-actions">
            <button className="search-button" aria-label="Search gifts" onClick={() => shop()}><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.2 4.2"/></svg></button>
            <button className="bag-button" onClick={() => shop()} aria-label={`Shopping bag, ${cart.length} items`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l1 12H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg><span>Bag</span><b>{cart.length}</b></button>
          </div>
        </div>
      </header>
      <main>{page === 'home' ? <Home products={products} onShop={shop} onAdd={addToCart} /> : <Shop products={products} category={category} onCategory={setCategory} onAdd={addToCart} />}</main>
      <footer className="site-footer">
        <div className="footer-main"><div className="footer-brand"><div className="brand-lockup"><span className="brand-mark">w<span>♥</span></span><span className="brand-name">warmgesture<span className="brand-dot">.</span></span></div><p>A little something, sent with a lot of love.</p><span className="footer-social">Instagram&nbsp; · &nbsp;Pinterest</span></div>
          <div className="footer-col"><h3>Explore</h3><button onClick={() => shop()}>Shop all gifts</button><button onClick={() => shop('Flowers')}>Flowers</button><button onClick={() => shop('Sweet treats')}>Sweet treats</button><button onClick={() => shop('Gift boxes')}>Gift boxes</button></div>
          <div className="footer-col"><h3>Here to help</h3><a href="mailto:hello@warmgesture.com">Contact us</a><a href="mailto:hello@warmgesture.com">Delivery & returns</a><a href="mailto:hello@warmgesture.com">FAQs</a></div>
          <div className="footer-note"><span className="footer-sparkle">✳</span><p>Make someone’s<br/>day a little brighter.</p><button onClick={() => shop()}>Find a gift <span>↗</span></button></div>
        </div><div className="footer-bottom"><span>© 2025 WarmGesture. Made for moments that matter.</span><span>Thoughtfully picked · Lovingly packed</span></div>
      </footer>
    </div>
  )
}

export default App
