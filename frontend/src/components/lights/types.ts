import type { ReactNode } from 'react'

export type ColorTemp = 'warm' | 'neutral' | 'cool'

export const TEMP: Record<ColorTemp, {
  label: string; hex: string; chipBg: string; chipText: string
  cardBg: string; orbFrom: string; orbTo: string; glow: string; sliderTrack: string
}> = {
  warm: {
    label: 'Warm', hex: '#f59e0b', chipBg: '#292218', chipText: '#f59e0b',
    cardBg: '#faf6ec', orbFrom: '#fcd34d', orbTo: '#f59e0b',
    glow: 'rgba(245,158,11,0.38)', sliderTrack: '#f59e0b',
  },
  neutral: {
    label: 'Neutral', hex: '#c4b5a0', chipBg: '#1e1c19', chipText: '#c4b5a0',
    cardBg: '#faf7f3', orbFrom: '#EAE7E2', orbTo: '#D4C9BB',
    glow: 'rgba(196,181,160,0.45)', sliderTrack: '#c4b5a0',
  },
  cool: {
    label: 'Cool', hex: '#60a5fa', chipBg: '#101720', chipText: '#60a5fa',
    cardBg: '#f5f8ff', orbFrom: '#bfdbfe', orbTo: '#60a5fa',
    glow: 'rgba(96,165,250,0.38)', sliderTrack: '#60a5fa',
  },
}

export interface RoomLightCardProps {
  name: string
  schedule: string
  icon: ReactNode
  isOn: boolean
  brightness: number
  colorTemp: ColorTemp
  onToggle: () => void
  onBrightness: (v: number) => void
  onColorTemp: (v: ColorTemp) => void
}
