import { useEffect, useRef, useState } from 'react'

export default function ProductForm({ initialValues, onSubmit, submitting }) {
  // Estado controlado
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [imagenFile, setImagenFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [fileName, setFileName] = useState('Ningún archivo seleccionado')

  const fileInputRef = useRef(null)

  useEffect(() => {
    // Cargar valores iniciales
    setNombre(initialValues?.nombre || '')
    setPrecio(
      typeof initialValues?.precio === 'number'
        ? String(initialValues.precio)
        : (initialValues?.precio ?? '')
    )
    const initialPreview = initialValues?.imagenUrl || initialValues?.imagen || ''
    setPreview(initialPreview)
    setFileName(initialPreview ? 'Imagen existente' : 'Ningún archivo seleccionado')
  }, [initialValues])

  // Manejo de archivo
  function handleFileChange(file) {
    if (!file) return
    setImagenFile(file)
    setFileName(file.name)
    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  function handleNativeFile(e) {
    const file = e.target.files?.[0]
    handleFileChange(file)
  }

  // Drag & Drop opcional para la zona de imagen
  function onDrop(e) {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    handleFileChange(file)
  }
  function onDragOver(e) {
    e.preventDefault()
  }

  // Envío
  async function handleSubmit(e) {
    e.preventDefault()
    const precioNumber = precio === '' ? undefined : Number(precio)
    await onSubmit?.({
      nombre: nombre?.trim(),
      precio: typeof precioNumber === 'number' && !Number.isNaN(precioNumber) ? precioNumber : undefined,
      imagenFile
    })
  }

  return (
    <form className="kora-form" onSubmit={handleSubmit}>
      {/* Nombre */}
      <div className="kora-field">
        <label htmlFor="nombre" className="kora-label">Nombre</label>
        <input
          id="nombre"
          type="text"
          placeholder="Nombre del producto"
          className="kora-input"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      {/* Precio con prefijo € */}
      <div className="kora-field">
        <label htmlFor="precio" className="kora-label">Precio (EUR)</label>
        <div className="kora-currency">
          <span className="kora-currency__prefix" aria-hidden>€</span>
          <input
            id="precio"
            name="precio"
            type="number"
            step="0.01"
            min="0"
            inputMode="decimal"
            className="kora-input kora-currency__input"
            placeholder="0,00"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>
        <small className="kora-help">Usa punto o coma para decimales. Ej.: 19.95</small>
      </div>

      {/* Selector de imagen custom + Drag & Drop */}
      <div className="kora-field">
        <span className="kora-label">Imagen del producto</span>

        <div
          className="kora-file"
          onDrop={onDrop}
          onDragOver={onDragOver}
          role="group"
          aria-label="Selector de imagen con arrastrar y soltar"
        >
          {/* Input real, oculto visualmente pero accesible */}
          <input
            ref={fileInputRef}
            id="imagen"
            name="imagen"
            type="file"
            accept="image/*"
            className="kora-visually-hidden"
            onChange={handleNativeFile}
          />

          {/* Botón que dispara el input */}
          <button
            type="button"
            className="kora-file__trigger"
            onClick={() => fileInputRef.current?.click()}
          >
            Seleccionar imagen
          </button>

          {/* Nombre del archivo seleccionado */}
          <span className="kora-file__name" title={fileName}>{fileName}</span>

          {/* Texto guía para Drag & Drop */}
          <span className="kora-file__hint">o arrastra y suelta aquí</span>
        </div>

        {/* Preview */}
        {preview && (
          <div className="kora-file__preview">
            <img src={preview} alt="Vista previa" />
          </div>
        )}
      </div>

      {/* Acciones */}
      <div className="kora-actions">
        <button className="btn btn--primary" disabled={submitting}>
          {submitting ? 'Guardando…' : 'Guardar'}
        </button>
      </div>
    </form>
  )
}
