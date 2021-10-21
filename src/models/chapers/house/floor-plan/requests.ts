import { AxiosResponse } from 'axios'
import { api } from '../../../../helpers/api'
import { IToDo } from './types'

const fetchTodoRequest = async (id: number): Promise<IToDo> => {
  const res: AxiosResponse<IToDo> = await api.get(`/todos/${id}`)
  return res.data
}

export const floorPlanRequests = {
  fetchTodoRequest,
}
