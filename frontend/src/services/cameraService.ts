import { apiClient } from '../lib/apiClient'
import type { Device, CameraLog } from '../types'

export async function getCamera(): Promise<Device> {
  const arr = await apiClient.get<Device[]>('/devices?type=camera')
  return arr[0]
}

export function getCameraLogs(): Promise<CameraLog[]> {
  return apiClient.get<CameraLog[]>('/camera/logs')
}

export function sendCameraCommand(command: 'on' | 'off'): Promise<void> {
  return apiClient.post<void>('/camera/commands', { command })
}
