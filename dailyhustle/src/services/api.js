import axios from 'axios'

const api = axios.create({
  baseURL: '/api', // update with your backend url
  timeout: 10000,
})

export default api
