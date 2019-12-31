import _ from 'lodash'
import { http } from '../lib/http'
import { API_URL } from '../lib/env'

export type Item = {
  id: string,
  title: string,
  description: string
}

export const readItems = async (token: string, params?: {
  page?: number,
  sort?: {
    column: string,
    direction?: string
  }
}): Promise<{
  sortColumn: string,
  sortDirection: string,
  rowsPerPage: number,
  numRows: number,
  items: Item[]
}> => {
  const query = _.map(params, (value, key) => {
    const val = key === 'sort'
      ? [_.get(value, 'column'), _.get(value, 'direction')].join()
      : value

    return [key, val].join('=')
  }).join('&')

  const url = [API_URL, ['/items', query].join('?')].join('')
  const res = await http(token).get(url)

  return res.data
}

export const createItem = async (token: string, title: string, description: string): Promise<{
  id: string
}> => {
  const url = [API_URL, '/items'].join('')
  const res = await http(token).post(url, { title, description })

  return res.data
}

export const readItem = async (token: string, id: string): Promise<{
  title: string,
  description: string
}> => {
  const url = [API_URL, `/items/${id}`].join('')
  const res = await http(token).get(url)

  return res.data
}

export const updateItem = async (token: string, id: string, title: string, description: string): Promise<void> => {
  const url = [API_URL, `/items/${id}`].join('')
  await http(token).patch(url, { title, description })
}

export const deleteItem = async (token: string, id: string): Promise<void> => {
  const url = [API_URL, `/items/${id}`].join('')
  await http(token).delete(url)
}