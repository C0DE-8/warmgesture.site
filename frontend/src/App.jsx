import { useEffect, useState } from 'react'
import Home from './pages/Home/Home.jsx'
import Shop from './pages/Shop/Shop.jsx'
import Checkout from './pages/Checkout/Checkout.jsx'
import { products } from './data/products.js'
import { imageUrl } from './data/products.js'
import './App.css'

const readLocal = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}

function App() {
  const [page, setPage] = useState('home')
  const [category, setCategory] = useState('All gifts')
  const [cart, setCart] = useState(() => readLocal('warmgesture-cart', []))
  const [customer, setCustomer] = useState(() => readLocal('warmgesture-customer', { name: '', email: '', address: '', city: '', postal: '', note: '' }))
  const [orderCode, setOrderCode] = useState('')
  useEffect(() => { localStorage.setItem('warmgesture-cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('warmgesture-customer', JSON.stringify(customer)) }, [customer])
  const addToCart = (product) => setCart((items) => {
    const existing = items.find((item) => item.id === product.id)
    return existing ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { ...product, quantity: 1, imageUrl: imageUrl(product.image, 300) }]
  })
  const changeQuantity = (id, delta) => setCart((items) => items.map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0))
  const removeFromCart = (id) => setCart((items) => items.filter((item) => item.id !== id))
  const updateCustomer = (field, value) => setCustomer((info) => ({ ...info, [field]: value }))
  const placeOrder = () => {
    const code = `WG-${Date.now().toString(36).slice(-6).toUpperCase()}`
    const order = { code, customer, items: cart, total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0), createdAt: new Date().toISOString() }
    const pastOrders = readLocal('warmgesture-orders', [])
    localStorage.setItem('warmgesture-orders', JSON.stringify([order, ...pastOrders]))
    setOrderCode(code)
    setCart([])
  }
  const shop = (nextCategory = 'All gifts') => { setCategory(nextCategory); setPage('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const openCheckout = () => { setOrderCode(''); setPage('checkout'); window.scrollTo({ top: 0, behavior: 'smooth' }) }

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
            <button className="bag-button" onClick={openCheckout} aria-label={`Shopping bag, ${cart.reduce((n, item) => n + item.quantity, 0)} items`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l1 12H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg><span>Bag</span><b>{cart.reduce((n, item) => n + item.quantity, 0)}</b></button>
          </div>
        </div>
      </header>
      <main>{page === 'home' ? <Home products={products} onShop={shop} onAdd={addToCart} /> : page === 'shop' ? <Shop products={products} category={category} onCategory={setCategory} onAdd={addToCart} /> : <Checkout cart={cart} customer={customer} onCustomer={updateCustomer} onQuantity={changeQuantity} onRemove={removeFromCart} onBack={() => { setOrderCode(''); shop() }} onPlaceOrder={placeOrder} orderCode={orderCode} />}</main>
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
