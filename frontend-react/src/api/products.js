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

export async function createProduct({ nombre, imagenFile }) {
  const form = new FormData()
  form.append('nombre', nombre)
  if (imagenFile) form.append('imagen', imagenFile)

  const { data } = await api.post(BASE, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export async function updateProduct(id, { nombre, imagenFile }) {
  if (imagenFile) {
    const form = new FormData()
    form.append('nombre', nombre)
    form.append('imagen', imagenFile)
    const { data } = await api.put(`${BASE}/${id}`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  } else {
    const { data } = await api.put(`${BASE}/${id}`, { nombre })
    return data
  }
}

export async function deleteProduct(id) {
  const { data } = await api.delete(`${BASE}/${id}`)
  return data
}
