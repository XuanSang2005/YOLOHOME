export interface CameraLog {
  id: number
  user_id: number | null
  device_id: number | null
  event: 'camera_on' | 'camera_off' | 'face_detected'
  face_label: string | null
  note: string | null
  created_at: string
}
