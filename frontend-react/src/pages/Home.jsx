import { useEffect, useState } from 'react'
import { listProducts } from '../api/products'
import ProductCard from '../components/ProductCard'
import Banner from '../components/Banner'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    try {
      setLoading(true)
      const data = await listProducts()
      setProducts(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
      setError('No se pudo cargar el catálogo')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  if (loading) return <p>Cargando catálogo…</p>
  if (error) return <p className="error">{error}</p>

  return (
    <section>
      <Banner src="/banner.jpg" headline="Nueva Temporada" sub="Streetwear futurista" />
      <h1>Catálogo</h1>
      {products.length === 0 ? (
        <p>No hay productos todavía.</p>
      ) : (
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p._id || p.id} product={p} onPurchased={load} />
          ))}
        </div>
      )}
    </section>
  )
}
