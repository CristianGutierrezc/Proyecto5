import { useEffect, useState } from 'react'

export default function ProductForm({ initialValues, onSubmit, submitting }) {
  const [nombre, setNombre] = useState('')
  const [imagenFile, setImagenFile] = useState(null)
  const [preview, setPreview] = useState('')

  useEffect(() => {
    setNombre(initialValues?.nombre || '')
    setPreview(initialValues?.imagenUrl || initialValues?.imagen || '')
    setImagenFile(null)
  }, [initialValues])

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    setImagenFile(file || null)
    if (file) setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      alert('El nombre es obligatorio')
      return
    }
    onSubmit({ nombre: nombre.trim(), imagenFile })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form__field">
        <span>Nombre *</span>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Camiseta básica"
          required
        />
      </label>

      <label className="form__field">
        <span>Imagen (opcional)</span>
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
