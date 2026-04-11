export interface RoomSetting {
  room: string
  device_id: number
  is_on: boolean
  brightness: number
  color_temp: 'warm' | 'neutral' | 'cool'
}
