export type DeviceType = 'light' | 'sensor' | 'camera'
export type DeviceStatus = 'on' | 'off' | 'active' | 'inactive'

export interface Device {
  id: number
  name: string
  type: DeviceType
  room: string
  status: DeviceStatus
  ip_address: string
  last_seen_at: string
}
