import 'dotenv/config'
import mongoose from 'mongoose'
import Producto from './models/Producto.js'

async function main() {
  const uri = process.env.MONGO_URI
  if (!uri) { console.error('Falta MONGO_URI en .env'); process.exit(1) }
  await mongoose.connect(uri)
  console.log('Conectado a MongoDB')

  // Limpia si quieres empezar de cero
  await Producto.deleteMany({})

  const demo = [
    { nombre: 'Camiseta KŌRA',  imagenUrl: null, precio: 19.95, moneda: 'EUR' },
    { nombre: 'Sudadera KŌRA',  imagenUrl: null, precio: 39.90, moneda: 'EUR' },
    { nombre: 'Pantalón KŌRA',  imagenUrl: null, precio: 49.90, moneda: 'EUR' },
  ]

  await Producto.insertMany(demo)
  console.log('Productos demo insertados')
  await mongoose.disconnect()
  console.log('Listo.')
}
main().catch(e => { console.error(e); process.exit(1) })
