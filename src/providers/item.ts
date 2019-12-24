import { http } from '../lib/http'
import { API_URL } from '../lib/env'

export const readItems = async (token: string): Promise<{
  items: Array<{
    id: string,
    title: string,
    description: string
  }>
}> => {
  const url = [API_URL, '/items'].join('')
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