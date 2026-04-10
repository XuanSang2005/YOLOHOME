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
}
