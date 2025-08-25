import api from './client'

const BASE = '/api/proyecto5/ventas'
const DESARROLLADOR = 'cristianguti93' // 

export async function registrarCompra(producto) {
  const payload = {
    desarrollador: DESARROLLADOR,
    aplicacion: 'React',
    producto: {
      id: producto._id || producto.id,
      nombre: producto.nombre,
      imagenUrl: producto.imagenUrl || producto.imagen || null,
    },
    fecha: new Date().toISOString(),
  }
  const { data } = await api.post(BASE, payload)
  return data
}
