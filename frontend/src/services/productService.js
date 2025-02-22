import axios from 'axios'
import API_BASE_URL from 'config/apiConfig'
const API_URL = `${API_BASE_URL}`

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

const productService = {
  createProduct: async (productData, images = []) => {
    const formData = new FormData()
    Object.keys(productData).forEach((key) => formData.append(key, productData[key]))
    images.forEach((image) => formData.append('files', image))
    const response = await api.post('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  getProducts: async () => {
    const response = await api.get('/products')
    return response.data
  },

  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  getProductsByCategory: async (category_id) => {
    const response = await api.get(`/products/by-category?category_id=${category_id}`)
    return response.data
  },

  getProductsByColor: async (color_id) => {
    const response = await api.get(`/products/by-color?color_id=${color_id}`)
    return response.data
  },

  updateProduct: async (id, productData, images = []) => {
    const formData = new FormData()
    Object.keys(productData).forEach((key) => formData.append(key, productData[key]))
    images.forEach((image) => formData.append('files', image))
    const response = await api.put(`/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  toggleProductStatusBulk: async (productIds, is_active) => {
    const response = await api.patch('/products/bulk/status', { productIds, is_active })
    return response.data
  },

  deleteProductsBulk: async (productIds) => {
    const response = await api.delete('/products/bulk', { data: { productIds } })
    return response.data
  },
}

export default productService
