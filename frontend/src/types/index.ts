export interface Device {
<<<<<<< HEAD
  id: number
=======
  id: string
>>>>>>> 0cfb5800ab41499dd5b546fd19c5441e9822217e
  name: string
  type: 'light' | 'sensor' | 'camera'
  room: string
  status: string
  ip_address: string
  last_seen_at: string
}

export interface DeviceCommand {
<<<<<<< HEAD
  id: number
  device_id: number
=======
  id: string
  device_id: number
  device_name?: string
>>>>>>> 0cfb5800ab41499dd5b546fd19c5441e9822217e
  command: string
  executed: boolean
  executed_at: string | null
  created_at: string
  device?: Device
}

export interface TemperatureLog {
<<<<<<< HEAD
  id: number
=======
  id: string
>>>>>>> 0cfb5800ab41499dd5b546fd19c5441e9822217e
  device_id: number
  temperature: number
  humidity: number
  light_intensity?: number
  air_quality?: number
  created_at: string
}

export interface CameraLog {
<<<<<<< HEAD
  id: number
=======
  id: string
>>>>>>> 0cfb5800ab41499dd5b546fd19c5441e9822217e
  user_id: number | null
  device_id: number | null
  event: 'camera_on' | 'camera_off' | 'face_detected'
  face_label: string | null
  note: string | null
  created_at: string
}
