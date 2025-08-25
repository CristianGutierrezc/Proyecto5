import { Link } from 'react-router-dom'
import { registrarCompra } from '../api/ventas'

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
      </div>
      <div className="kora-card__body">
       <h3 className="kora-card__title clamp-2">{product.nombre}</h3>
        <div className="kora-card__actions">
          <Link className="btn" to={`/productos/${product._id || product.id}`}>Ver detalle</Link>
          <button className="btn btn--primary" onClick={handleBuy}>Comprar</button>
        </div>
      </div>
    </article>
  )
}
