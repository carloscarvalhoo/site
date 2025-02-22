import axios from 'axios'
import API_BASE_URL from 'config/apiConfig'
const API_URL = `${API_BASE_URL}`

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

const userService = {
  login: async (email, password) => {
    const response = await api.post('/users', { email, password })
    return response.data
  },
}

export default userService
