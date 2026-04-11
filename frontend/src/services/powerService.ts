import { apiClient } from '../lib/apiClient'

export interface PowerHistory {
  bars: number[]
  total_kwh: number
  trend: string
  time_start: string
  time_end: string
}

export function getPowerHistory(): Promise<PowerHistory> {
  return apiClient.get<PowerHistory>('/power/history')
}
