import express from 'express'
import Venta from '../models/Venta.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const { desarrollador, aplicacion, producto, fecha } = req.body
  if (!desarrollador || !aplicacion || !producto?.id || !producto?.nombre) {
    return res.status(400).json({ error: 'Campos de venta incompletos' })
  }
  const venta = await Venta.create({
    desarrollador,
    aplicacion,
    producto: {
      id: String(producto.id),
      nombre: producto.nombre,
      imagenUrl: producto.imagenUrl || null
    },
    fecha: fecha ? new Date(fecha) : new Date()
  })
  res.status(201).json({ ok: true, venta })
})

export default router
