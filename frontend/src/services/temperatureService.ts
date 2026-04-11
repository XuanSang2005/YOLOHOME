<<<<<<< HEAD
import type { Device, TemperatureLog } from '../types'
import { devices, temperatureLogs } from './mockData'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function getTemperatureSensor(): Promise<Device> {
  await delay(200)
  return devices.find(d => d.type === 'sensor')!
}

export async function getTemperatureLogs(): Promise<TemperatureLog[]> {
  await delay(200)
  return temperatureLogs
}

export async function getCurrentReading(): Promise<TemperatureLog> {
  await delay(200)
  return temperatureLogs[0]
=======
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
>>>>>>> 0cfb5800ab41499dd5b546fd19c5441e9822217e
}
