import { http } from '../lib/http'
import { API_URL } from '../env'

export const getItems = async (token: string): Promise<{
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