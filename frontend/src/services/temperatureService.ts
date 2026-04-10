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
}
