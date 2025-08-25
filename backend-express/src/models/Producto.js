import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  imagenUrl: { type: String },
  imagenFilename: { type: String },
}, { timestamps: true })

export default mongoose.model('Producto', productSchema)
