import { FloorPlan } from './model'

export interface IToDo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface IFloorPlanState {
  meta: { value: number; todo: IToDo | null }
  model: FloorPlan
  loading: boolean
  error: string | null
}
