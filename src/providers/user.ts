import axios from 'axios'
import { API_URL } from '../lib/env'

export const login = async (username: string, password: string): Promise<{
  token: string
}> => {
  const url = [API_URL, '/login'].join('')
  const res = await axios.post(url, {
    username,
    password
  })

  return res.data
}