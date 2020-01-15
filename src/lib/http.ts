import _ from 'lodash'
import axios from 'axios'
import { API_URL } from './env'

export const HTTP_UNAUTHORIZED = 401
export const HTTP_FORBIDDEN = 403
export const HTTP_UNKNOWN = 666

export const http = (token: string) => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` })
    }
  })
}