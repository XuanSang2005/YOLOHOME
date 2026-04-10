import type { ReactNode } from 'react'
import type { Metric } from './types'

const tabs: { id: Metric; label: string; icon: ReactNode }[] = [
  {
    id: 'temperature',
    label: 'Temperature',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" />
      </svg>
    ),
  },
  {
    id: 'light_intensity',
    label: 'Light',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6m-5 4h4M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" />
      </svg>
    ),
  },
  {
    id: 'air_quality',
    label: 'Air Quality',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
      </svg>
    ),
  },
]

export function SensorTabs({ metric, onChange }: { metric: Metric; onChange: (m: Metric) => void }) {
  return (
    <div className="flex items-center gap-2">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`w-13 h-13 rounded-2xl flex items-center justify-center transition-all ${
            t.id === metric
              ? 'bg-orange-500 shadow-md shadow-orange-200/50 text-white'
              : 'bg-white text-stone-400 hover:text-stone-600'
          }`}
        >
          {t.icon}
        </button>
      ))}
    </div>
  )
}
