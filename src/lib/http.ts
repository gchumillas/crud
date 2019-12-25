import _ from 'lodash'
import axios from 'axios'
import { TFunction } from 'i18next'
import { API_URL } from './env'

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

export const getStatus = (error: Error): number => {
  const response = _.get(error, 'response')

  return _.get(response, 'status', HTTP_UNKNOWN)
}

export const translateStatus = (t: TFunction, path: string, errorCode: number) => {
  return t(`${path}.http.${errorCode}`, t(`http.${errorCode}`, t(`http.${HTTP_UNKNOWN}`)))
}