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
}
