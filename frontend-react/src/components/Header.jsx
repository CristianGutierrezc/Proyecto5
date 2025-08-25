import { Link, NavLink } from 'react-router-dom'

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4h-2l-1 2h2l3.6 7.59L8.25 16.04A2 2 0 0 0 10 19h9v-2h-9l1.1-2h7.45a2 2 0 0 0 1.84-1.23l3.58-8.02A1 1 0 0 0 23 3H6" fill="currentColor"/>
    </svg>
  )
}
function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.33 0-8 2.17-8 5v1h16v-1c0-2.83-3.67-5-8-5z" fill="currentColor"/>
    </svg>
  )
}

export default function Header() {
  return (
    <header className="kora-header">
      <div className="container kora-header__content">
        <Link to="/" className="kora-logo">KŌRA</Link>
        <nav className="kora-nav">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/dashboard">Panel</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
        </nav>
        <div className="kora-actions">
          <button className="icon-btn" title="Usuario"><UserIcon/></button>
          <button className="icon-btn" title="Carrito"><CartIcon/></button>
        </div>
      </div>
    </header>
  )
}
