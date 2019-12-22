import axios from 'axios'
import { API_URL } from '../env'

export const http = (token: string) => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` })
    }
  })
}