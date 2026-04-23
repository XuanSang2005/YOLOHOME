import { apiClient } from '../lib/apiClient'
import type { Device, CameraLog } from '../types'

export async function getCamera(): Promise<Device | undefined> {
  const arr = await apiClient.get<Device[]>('/devices?type=camera')
  return arr[0]
}

export async function getGate(): Promise<Device | undefined> {
  const arr = await apiClient.get<Device[]>('/devices?type=gate')
  return arr[0]
}

export function getCameraLogs(): Promise<CameraLog[]> {
  return apiClient.get<CameraLog[]>('/camera/logs')
}

export function sendCameraCommand(command: 'on' | 'off'): Promise<void> {
  return apiClient.post<void>('/camera/commands', { command })
}

export const sendRecognition = async (authorized: 0 | 1, label: string) => {
  const response = await fetch('/camera/recognize', { // Nhớ sửa lại link này cho giống các hàm trên nếu cần
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      authorized: authorized,
      face_label: label,
      device_id: 1
    })
  });
  return response.json();
}
