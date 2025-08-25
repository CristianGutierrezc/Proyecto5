import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },


  precio: { type: Number, required: true, min: 0, default: 0 },

  // Fijamos la moneda a EUR (por si a futuro quisieras soportar más)
  moneda: { type: String, enum: ['EUR'], default: 'EUR' },

  imagenUrl: { type: String },
  imagenFilename: { type: String },
}, { timestamps: true })

export default mongoose.model('Producto', productSchema)
