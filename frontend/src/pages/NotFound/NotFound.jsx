import Icon from '../../components/Icon.jsx'
import './NotFound.css'

export default function NotFound({ onHome, onShop }) {
  return <section className="not-found-page"><div className="not-found-card"><div className="not-found-art" aria-hidden="true"><span className="lost-orbit orbit-one"/><span className="lost-orbit orbit-two"/><span className="lost-gift"><Icon name="gift" size={45}/></span><span className="lost-sparkle sparkle-a"><Icon name="sparkle" size={20}/></span><span className="lost-sparkle sparkle-b"><Icon name="sparkle" size={14}/></span></div><span className="eyebrow">A LITTLE DETOUR</span><p className="not-found-code">404</p><h1>This page wandered<br/><em>off to find a gift.</em></h1><p className="not-found-copy">We couldn’t find that page. Let’s get you back to the good things.</p><div className="not-found-actions"><button className="button-primary" onClick={onHome}>Back home <span><Icon name="arrowRight" size={15}/></span></button><button className="not-found-shop" onClick={onShop}>Browse gifts</button></div></div></section>
}
