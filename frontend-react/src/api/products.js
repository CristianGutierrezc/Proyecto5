import api from './client'

const BASE = '/api/proyecto5/react'

export async function listProducts() {
  const { data } = await api.get(BASE)
  return data
}

export async function getProduct(id) {
  const { data } = await api.get(`${BASE}/${id}`)
  return data
}

export async function createProduct({ nombre, precio, imagenFile }) {
  const form = new FormData()
  form.append('nombre', nombre)
  form.append('precio', String(precio))
  if (imagenFile) form.append('imagen', imagenFile)

  const { data } = await api.post(BASE, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export async function updateProduct({ id, nombre, precio, imagenFile }) {
  // Si hay imagen, mandamos multipart; si no, JSON normal
  if (imagenFile) {
    const form = new FormData()
    if (nombre) form.append('nombre', nombre)
    if (typeof precio !== 'undefined') form.append('precio', String(precio))
    form.append('imagen', imagenFile)
    const { data } = await api.put(`${BASE}/${id}`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  } else {
    const payload = {}
    if (nombre) payload.nombre = nombre
    if (typeof precio !== 'undefined') payload.precio = precio
    const { data } = await api.put(`${BASE}/${id}`, payload)
    return data
  }
}

export async function deleteProduct(id) {
  const { data } = await api.delete(`${BASE}/${id}`)
  return data
}
