<<<<<<< HEAD
import type { Device, DeviceCommand } from '../types'
import { devices, deviceCommands } from './mockData'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function getLight(): Promise<Device> {
  await delay(200)
  return devices.find(d => d.type === 'light')!
}

export async function getLightCommands(): Promise<DeviceCommand[]> {
  await delay(200)
  return deviceCommands
}

export async function sendLightCommand(command: 'on' | 'off'): Promise<DeviceCommand> {
  await delay(300)
  const light = devices.find(d => d.type === 'light')!
  light.status = command
  const newCommand: DeviceCommand = {
    id: deviceCommands.length + 1,
    device_id: light.id,
    command,
    executed: false,
    executed_at: null,
    created_at: new Date().toISOString(),
    device: light,
  }
  deviceCommands.unshift(newCommand)
  return newCommand
=======
import { apiClient } from '../lib/apiClient'
import type { Device, DeviceCommand } from '../types'

export interface RoomSetting {
  room: string
  device_id: number
  is_on: boolean
  brightness: number
  color_temp: 'warm' | 'neutral' | 'cool'
}

export async function getLight(): Promise<Device> {
  const arr = await apiClient.get<Device[]>('/devices?type=light')
  return arr[0]
}

export function getLightCommands(): Promise<DeviceCommand[]> {
  return apiClient.get<DeviceCommand[]>('/lights/commands')
}

export function sendLightCommand(command: 'on' | 'off'): Promise<DeviceCommand> {
  return apiClient.post<DeviceCommand>('/lights/commands', { command })
}

export function getRoomSettings(): Promise<RoomSetting[]> {
  return apiClient.get<RoomSetting[]>('/lights/rooms')
}

export function sendRoomCommand(room: string, command: 'on' | 'off'): Promise<DeviceCommand> {
  return apiClient.post<DeviceCommand>(`/lights/rooms/${encodeURIComponent(room)}/command`, { command })
}

export function updateRoomSettings(
  room: string,
  settings: { brightness?: number; color_temp?: string },
): Promise<RoomSetting> {
  return apiClient.patch<RoomSetting>(`/lights/rooms/${encodeURIComponent(room)}/settings`, settings)
>>>>>>> 0cfb5800ab41499dd5b546fd19c5441e9822217e
}
