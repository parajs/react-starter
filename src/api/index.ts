import { apiPrefix } from '@/config'
import axios from 'axios'



export function popularCurrencies(params: { limint: number} = { limint: 10}): Promise<any> {
  return axios.get(`${apiPrefix}/currencies/popular`,{params})
}