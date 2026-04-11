import type { ReactNode } from 'react'
import cameraImg from '../../assets/camera.png'
import userImg from '../../assets/user.png'

export type EventCfg = { label: string; iconBg: string; iconEl: ReactNode }

export const EVENT_CFG: Record<string, EventCfg> = {
  face_detected: {
    label: 'Face detected',
    iconBg: 'rgba(168,162,158,0.14)',
    iconEl: <img src={userImg} className="w-5 h-5 object-contain" />,
  },
  camera_on: {
    label: 'Camera on',
    iconBg: 'rgba(16,185,129,0.10)',
    iconEl: <img src={cameraImg} className="w-5 h-5 object-contain" />,
  },
  camera_off: {
    label: 'Camera off',
    iconBg: 'rgba(239,68,68,0.06)',
    iconEl: <img src={cameraImg} className="w-5 h-5 object-contain opacity-40" />,
  },
}
