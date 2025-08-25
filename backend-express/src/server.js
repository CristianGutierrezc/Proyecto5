import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import productsRouter from './routes/products.js'
import ventasRouter from './routes/ventas.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173'
app.use(cors({ origin: clientOrigin }))

const uploadsDir = process.env.UPLOADS_DIR || 'uploads'
app.use('/uploads', express.static(path.join(__dirname, uploadsDir)))

app.use('/api/proyecto5/react', productsRouter)
app.use('/api/proyecto5/ventas', ventasRouter)

const MONGO_URI = process.env.MONGO_URI
if (!MONGO_URI) {
  console.error('Falta MONGO_URI en .env')
  process.exit(1)
}
mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => {
    console.error('Error de conexión MongoDB:', err.message)
    process.exit(1)
  })

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`)
})
