import { apiClient } from '../lib/apiClient'
import type { Device, TemperatureLog } from '../types'

export async function getTemperatureSensor(): Promise<Device> {
  const arr = await apiClient.get<Device[]>('/devices?type=sensor')
  return arr[0]
}

export function getTemperatureLogs(): Promise<TemperatureLog[]> {
  return apiClient.get<TemperatureLog[]>('/temperature/logs')
}

export function getCurrentReading(): Promise<TemperatureLog> {
  return apiClient.get<TemperatureLog>('/temperature/current')
}
