import mongoose from 'mongoose'

const ventaSchema = new mongoose.Schema({
  desarrollador: { type: String, required: true },
  aplicacion: { type: String, required: true },
  producto: {
    id: { type: String, required: true },
    nombre: { type: String, required: true },
    imagenUrl: { type: String }
  },
  fecha: { type: Date, default: Date.now }
}, { timestamps: true })

export default mongoose.model('Venta', ventaSchema)
