export interface Device {
  id: string
  name: string
  type: 'light' | 'sensor' | 'camera'
  room: string
  status: string
  ip_address: string
  last_seen_at: string
}

export interface DeviceCommand {
  id: string
  device_id: number
  device_name?: string
  command: string
  executed: boolean
  executed_at: string | null
  created_at: string
  device?: Device
}

export interface TemperatureLog {
  id: string
  device_id: number
  temperature: number
  humidity: number
  light_intensity?: number
  air_quality?: number
  created_at: string
}

export interface CameraLog {
  id: string
  user_id: number | null
  device_id: number | null
  event: 'camera_on' | 'camera_off' | 'face_detected'
  face_label: string | null
  note: string | null
  created_at: string
}
