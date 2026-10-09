import { useEffect, useRef, useState } from 'react'
import Home from './pages/Home/Home.jsx'
import Shop from './pages/Shop/Shop.jsx'
import Checkout from './pages/Checkout/Checkout.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'
import Icon from './components/Icon.jsx'
import { products } from './data/products.js'
import { imageUrl } from './data/products.js'
import './App.css'

const readLocal = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}

const shopCategories = {
  flowers: 'Flowers',
  'sweet-treats': 'Sweet treats',
  'snack-boxes': 'Snack boxes',
  'gift-boxes': 'Gift boxes',
  keepsakes: 'Keepsakes',
}

const routeFor = (pathname) => {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  if (path === '/') return { page: 'home', category: 'All gifts' }
  if (path === '/checkout') return { page: 'checkout', category: 'All gifts' }
  if (path === '/shop') return { page: 'shop', category: 'All gifts' }
  const match = path.match(/^\/shop\/([^/]+)$/)
  const category = match && shopCategories[match[1].toLowerCase()]
  return category ? { page: 'shop', category } : { page: 'not-found', category: 'All gifts' }
}

function App() {
  const [route, setRoute] = useState(() => routeFor(window.location.pathname))
  const { page, category } = route
  const [cart, setCart] = useState(() => readLocal('warmgesture-cart', []))
  const [customer, setCustomer] = useState(() => ({ senderName: '', email: '', recipientName: '', recipientPhone: '', address: '', city: '', postal: '', note: '', anonymous: false, ...readLocal('warmgesture-customer', {}) }))
  const [orderReceipt, setOrderReceipt] = useState(null)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)
  const toastSequence = useRef(0)
  useEffect(() => {
    const handlePopState = () => setRoute(routeFor(window.location.pathname))
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])
  useEffect(() => { localStorage.setItem('warmgesture-cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('warmgesture-customer', JSON.stringify(customer)) }, [customer])
  const notify = (message, tone = 'success') => {
    setToast({ message, tone, id: ++toastSequence.current })
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2800)
  }
  const addToCart = (product) => {
    setCart((items) => {
    const existing = items.find((item) => item.id === product.id)
    return existing ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { ...product, quantity: 1, imageUrl: imageUrl(product.image, 300) }]
    })
    notify(`${product.name} added to your bag`)
  }
  const changeQuantity = (id, delta) => {
    const item = cart.find((entry) => entry.id === id)
    if (!item) return
    if (delta < 0 && item.quantity === 1) { removeFromCart(id); return }
    setCart((items) => items.map((entry) => entry.id === id ? { ...entry, quantity: entry.quantity + delta } : entry))
    notify(`${item.name} ${delta > 0 ? 'quantity increased' : 'quantity updated'}`)
  }
  const removeFromCart = (id) => {
    const item = cart.find((entry) => entry.id === id)
    setCart((items) => items.filter((entry) => entry.id !== id))
    if (item) notify(`${item.name} removed from your bag`, 'removed')
  }
  const updateCustomer = (field, value) => setCustomer((info) => ({ ...info, [field]: value }))
  const placeOrder = ({ deliveryMode, paymentMethod }) => {
    const code = `WG-${Date.now().toString(36).slice(-6).toUpperCase()}`
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = subtotal === 0 || subtotal >= 75 ? 0 : 6.95
    const order = { code, customer, items: cart, subtotal, shipping, total: subtotal + shipping, deliveryMode, paymentMethod, createdAt: new Date().toISOString() }
    const pastOrders = readLocal('warmgesture-orders', [])
    localStorage.setItem('warmgesture-orders', JSON.stringify([order, ...pastOrders]))
    setOrderReceipt(order)
    setCart([])
  }
  const navigate = (path) => {
    window.history.pushState({}, '', path)
    setRoute(routeFor(path))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const shop = (nextCategory = 'All gifts') => {
    const slug = Object.entries(shopCategories).find(([, label]) => label === nextCategory)?.[0]
    navigate(slug ? `/shop/${slug}` : '/shop')
  }
  const openCheckout = () => { setOrderReceipt(null); navigate('/checkout') }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
            <button className="brand" onClick={() => navigate('/')} aria-label="WarmGesture home">
            <span className="brand-mark">w<span><Icon name="heart" size={9}/></span></span><span className="brand-name">warmgesture<span className="brand-dot">.</span></span>
          </button>
          <nav className="main-nav" aria-label="Main navigation">
            <button className={page === 'home' ? 'nav-active' : ''} onClick={() => navigate('/')}>Home</button>
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
      <main>{page === 'home' ? <Home products={products} onShop={shop} onAdd={addToCart} /> : page === 'shop' ? <Shop key={category} products={products} category={category} onCategory={shop} onAdd={addToCart} /> : page === 'checkout' ? <Checkout cart={cart} customer={customer} onCustomer={updateCustomer} onQuantity={changeQuantity} onRemove={removeFromCart} onBack={() => { setOrderReceipt(null); shop() }} onPlaceOrder={placeOrder} receipt={orderReceipt} /> : <NotFound onHome={() => navigate('/')} onShop={() => shop()} />}</main>
      {toast && <div className={`glass-toast toast-${toast.tone}`} key={toast.id} role="status" aria-live="polite"><span className="toast-icon">{toast.tone === 'removed' ? '−' : '✓'}</span><span>{toast.message}</span><button onClick={() => setToast(null)} aria-label="Dismiss notification">×</button></div>}
      <footer className="site-footer">
        <div className="footer-main"><div className="footer-brand"><div className="brand-lockup"><span className="brand-mark">w<span><Icon name="heart" size={9}/></span></span><span className="brand-name">warmgesture<span className="brand-dot">.</span></span></div><p>A little something, sent with a lot of love.</p><span className="footer-social">Instagram&nbsp; · &nbsp;Pinterest</span></div>
          <div className="footer-col"><h3>Explore</h3><button onClick={() => shop()}>Shop all gifts</button><button onClick={() => shop('Flowers')}>Flowers</button><button onClick={() => shop('Sweet treats')}>Sweet treats</button><button onClick={() => shop('Gift boxes')}>Gift boxes</button></div>
          <div className="footer-col"><h3>Here to help</h3><a href="mailto:hello@warmgesture.com">Contact us</a><a href="mailto:hello@warmgesture.com">Delivery & returns</a><a href="mailto:hello@warmgesture.com">FAQs</a></div>
          <div className="footer-note"><span className="footer-sparkle"><Icon name="sparkle" size={20}/></span><p>Make someone’s<br/>day a little brighter.</p><button onClick={() => shop()}>Find a gift <span><Icon name="arrowRight" size={14}/></span></button></div>
        </div><div className="footer-bottom"><span>© 2025 WarmGesture. Made for moments that matter.</span><span>Thoughtfully picked · Lovingly packed</span></div>
      </footer>
    </div>
  )
}

export default App
