import axios from 'axios'
import API_BASE_URL from 'config/apiConfig'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

const colorService = {
  getColors: async () => {
    const response = await api.get('/colors')
    return response.data
  },
}

export default colorService
