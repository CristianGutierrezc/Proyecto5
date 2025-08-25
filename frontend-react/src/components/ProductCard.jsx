import { Link } from 'react-router-dom'
import { registrarCompra } from '../api/ventas'

const eur = (v, moneda='EUR') =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: moneda }).format(v ?? 0)

export default function ProductCard({ product, onPurchased }) {
  const handleBuy = async () => {
    try {
      await registrarCompra(product)
      alert('Compra registrada ✅')
      onPurchased?.()
    } catch (err) {
      console.error(err)
      alert('No se pudo registrar la compra')
    }
  }

  const img = product.imagenUrl || product.imagen
  return (
    <article className="kora-card">
      <div className="kora-card__media">
        {img ? <img src={img} alt={product.nombre} /> : <div className="kora-card__ph" />}
        {/* Badge de precio arriba a la derecha */}
        <span className="kora-card__badge">{eur(product.precio, product.moneda)}</span>
      </div>
      <div className="kora-card__body">
        <h3 className="kora-card__title clamp-2">{product.nombre}</h3>
        {/* Precio también en el cuerpo (opcional, puedes quitarlo si te quedas con el badge) */}
        <p className="kora-card__price">{eur(product.precio, product.moneda)}</p>
        <div className="kora-card__actions">
          <Link className="btn" to={`/productos/${product._id || product.id}`}>Ver detalle</Link>
          <button className="btn btn--primary" onClick={handleBuy}>Comprar</button>
        </div>
      </div>
    </article>
  )
}
