import { useEffect, useState } from 'react'

export default function ProductForm({ initialValues, onSubmit, submitting }) {
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')     // Nuevo
  const [imagenFile, setImagenFile] = useState(null)
  const [preview, setPreview] = useState('')

  useEffect(() => {
    setNombre(initialValues?.nombre || '')
    setPrecio(
      typeof initialValues?.precio === 'number'
        ? String(initialValues.precio)
        : (initialValues?.precio ?? '')
    )
    setPreview(initialValues?.imagenUrl || initialValues?.imagen || '')
    setImagenFile(null)
  }, [initialValues])

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    setImagenFile(file || null)
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
    } else if (initialValues?.imagenUrl || initialValues?.imagen) {
      setPreview(initialValues.imagenUrl || initialValues.imagen)
    } else {
      setPreview('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const p = parseFloat(precio)
    if (!nombre.trim()) {
      alert('El nombre es obligatorio')
      return
    }
    if (Number.isNaN(p) || p < 0) {
      alert('Precio inválido')
      return
    }
    await onSubmit?.({ nombre: nombre.trim(), precio: p, imagenFile })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form__row">
        <span>Nombre</span>
        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre del producto" />
      </label>

      <label className="form__row">
        <span>Precio (EUR)</span>
        <input
          type="number"
          inputMode="decimal"
          step="0.01"
          min="0"
          value={precio}
          onChange={e => setPrecio(e.target.value)}
          placeholder="0.00"
        />
      </label>

      <label className="form__row">
        <span>Imagen</span>
        <input type="file" name="imagen" accept="image/*" onChange={handleFile} />
      </label>

      {preview && (
        <div className="form__preview">
          <img src={preview} alt="preview" />
        </div>
      )}

      <button className="btn btn--primary" disabled={submitting}>
        {submitting ? 'Guardando…' : 'Guardar'}
      </button>
    </form>
  )
}
