import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import Producto from '../models/Producto.js'

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadsDir = process.env.UPLOADS_DIR || 'uploads'
const fullUploads = path.join(__dirname, '..', uploadsDir)
if (!fs.existsSync(fullUploads)) fs.mkdirSync(fullUploads, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, fullUploads),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const name = path.basename(file.originalname, ext).replace(/[^a-z0-9-_]/gi, '_')
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, `${name}-${unique}${ext}`)
  }
})
const upload = multer({ storage })

function publicUrl(req, filename) {
  if (!filename) return undefined
  const base = `${req.protocol}://${req.get('host')}`
  return `${base}/uploads/${filename}`
}

// Listar
router.get('/', async (_req, res) => {
  const items = await Producto.find().sort({ createdAt: -1 })
  res.json(items)
})

// Obtener por id
router.get('/:id', async (req, res) => {
  const item = await Producto.findById(req.params.id)
  if (!item) return res.status(404).json({ error: 'No encontrado' })
  res.json(item)
})

// Crear
router.post('/', upload.single('imagen'), async (req, res) => {
  const { nombre } = req.body
  const precio = Number(req.body.precio)

  if (!nombre || !nombre.trim()) return res.status(400).json({ error: 'Nombre requerido' })
  if (Number.isNaN(precio) || precio < 0) return res.status(400).json({ error: 'Precio inválido' })

  const doc = new Producto({
    nombre: nombre.trim(),
    precio,
    moneda: 'EUR',
  })

  if (req.file?.filename) {
    doc.imagenFilename = req.file.filename
    doc.imagenUrl = publicUrl(req, req.file.filename)
  }

  await doc.save()
  res.status(201).json(doc)
})

// Actualizar
router.put('/:id', upload.single('imagen'), async (req, res) => {
  const { id } = req.params
  const item = await Producto.findById(id)
  if (!item) return res.status(404).json({ error: 'No encontrado' })

  const { nombre } = req.body
  if (typeof nombre === 'string' && nombre.trim()) {
    item.nombre = nombre.trim()
  }

  if (typeof req.body.precio !== 'undefined') {
    const nuevoPrecio = Number(req.body.precio)
    if (Number.isNaN(nuevoPrecio) || nuevoPrecio < 0) {
      return res.status(400).json({ error: 'Precio inválido' })
    }
    item.precio = nuevoPrecio
    item.moneda = 'EUR'
  }

  if (req.file?.filename) {
    const old = item.imagenFilename
    item.imagenFilename = req.file.filename
    item.imagenUrl = publicUrl(req, req.file.filename)
    if (old) {
      try { fs.unlinkSync(path.join(fullUploads, old)) } catch {}
    }
  }

  await item.save()
  res.json(item)
})

// Eliminar
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const item = await Producto.findById(id)
  if (!item) return res.status(404).json({ error: 'No encontrado' })

  if (item.imagenFilename) {
    try { fs.unlinkSync(path.join(fullUploads, item.imagenFilename)) } catch {}
  }
  await item.deleteOne()
  res.json({ ok: true })
})

export default router
