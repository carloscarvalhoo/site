import axios from 'axios'
import API_BASE_URL from 'config/apiConfig'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

const categoryService = {
  getCategories: async () => {
    const response = await api.get('/categories')
    return response.data
  },
}

export default categoryService
