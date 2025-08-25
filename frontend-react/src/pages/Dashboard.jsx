import { useEffect, useState } from 'react'
import { createProduct, deleteProduct, listProducts, updateProduct } from '../api/products'
import ProductForm from '../components/ProductForm'

export default function Dashboard() {
  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    try {
      setLoading(true)
      const data = await listProducts()
      setProducts(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
      setError('No se pudo cargar la lista')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleCreate = async (payload) => {
    try {
      setSubmitting(true)
      await createProduct(payload)
      await load()
      setSelected(null)
      alert('Producto creado ✅')
    } catch (e) {
      console.error(e)
      alert('No se pudo crear')
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdate = async (payload) => {
    try {
      if (!selected) return
      setSubmitting(true)
      await updateProduct(selected._id || selected.id, payload)
      await load()
      setSelected(null)
      alert('Producto actualizado ✅')
    } catch (e) {
      console.error(e)
      alert('No se pudo actualizar')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (p) => {
    const ok = confirm(`¿Eliminar "${p.nombre}"?`)
    if (!ok) return
    try {
      await deleteProduct(p._id || p.id)
      await load()
    } catch (e) {
      console.error(e)
      alert('No se pudo eliminar')
    }
  }

  if (loading) return <p>Cargando panel…</p>
  if (error) return <p className="error">{error}</p>

  return (
    <section className="dashboard">
      <h1>Panel de Control</h1>

      <div className="dashboard__grid">
        <div>
          <h2>{selected ? 'Editar producto' : 'Nuevo producto'}</h2>
          <ProductForm
            initialValues={selected}
            onSubmit={selected ? handleUpdate : handleCreate}
            submitting={submitting}
          />
        </div>

        <div>
          <h2>Productos existentes</h2>
          {products.length === 0 ? (
            <p>No hay productos.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id || p.id}>
                    <td>
                      {(p.imagenUrl || p.imagen) && (
                        <img src={p.imagenUrl || p.imagen} alt={p.nombre} style={{ width: 48, height: 48, objectFit: 'cover' }} />
                      )}
                    </td>
                    <td>{p.nombre}</td>
                    <td>
                      <button className="btn" onClick={() => setSelected(p)}>Editar</button>
                      <button className="btn btn--danger" onClick={() => handleDelete(p)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  )
}
