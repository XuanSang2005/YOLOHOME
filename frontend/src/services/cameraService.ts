<<<<<<< HEAD
import type { Device, CameraLog } from '../types'
import { devices, cameraLogs } from './mockData'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function getCamera(): Promise<Device> {
  await delay(200)
  return devices.find(d => d.type === 'camera')!
}

export async function getCameraLogs(): Promise<CameraLog[]> {
  await delay(200)
  return cameraLogs
}

export async function sendCameraCommand(command: 'on' | 'off'): Promise<void> {
  await delay(300)
  const camera = devices.find(d => d.type === 'camera')!
  camera.status = command === 'on' ? 'active' : 'inactive'
  cameraLogs.unshift({
    id: cameraLogs.length + 1,
    user_id: null,
    device_id: camera.id,
    event: command === 'on' ? 'camera_on' : 'camera_off',
    face_label: null,
    note: command === 'on' ? 'Camera turned on' : 'Camera turned off',
    created_at: new Date().toISOString(),
  })
=======
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
>>>>>>> 0cfb5800ab41499dd5b546fd19c5441e9822217e
}
