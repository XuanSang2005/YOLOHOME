export interface DeviceCommand {
  id: number
  device_id: number
  device_name: string
  command: 'on' | 'off'
  executed: boolean
  executed_at: string | null
  created_at: string
}
