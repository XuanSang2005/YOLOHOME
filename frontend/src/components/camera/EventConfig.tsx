import type { ReactNode } from 'react'
import cameraImg from '../../assets/camera.png'
import userImg from '../../assets/user.png'

export type EventCfg = { label: string; iconBg: string; iconEl: ReactNode }

const FILTER = {
  stone:   'brightness(0) saturate(100%) invert(71%) sepia(10%) saturate(300%) hue-rotate(345deg)',
  emerald: 'brightness(0) saturate(100%) invert(59%) sepia(64%) saturate(400%) hue-rotate(120deg)',
  red:     'brightness(0) saturate(100%) invert(27%) sepia(98%) saturate(500%) hue-rotate(330deg) brightness(110%)',
}

export const EVENT_CFG: Record<string, EventCfg> = {
  face_detected: {
    label: 'Face detected',
    iconBg: 'rgba(168,162,158,0.14)',
    iconEl: <img src={userImg} className="w-5 h-5 object-contain" style={{ filter: FILTER.stone }} />,
  },
  camera_on: {
    label: 'Camera on',
    iconBg: 'rgba(16,185,129,0.10)',
    iconEl: <img src={cameraImg} className="w-5 h-5 object-contain" style={{ filter: FILTER.emerald }} />,
  },
  camera_off: {
    label: 'Camera off',
    iconBg: 'rgba(239,68,68,0.06)',
    iconEl: <img src={cameraImg} className="w-5 h-5 object-contain" style={{ filter: FILTER.red }} />,
  },
}
