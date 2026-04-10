import type { ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getLight } from '../../services/lightService'
import { getTemperatureSensor } from '../../services/temperatureService'
import { getCamera } from '../../services/cameraService'

const icons: Record<string, ReactNode> = {
  light: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 18h6m-5 4h4M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" />
    </svg>
  ),
  sensor: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" />
    </svg>
  ),
  camera: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
}

export function DevicesCard() {
  const light = useQuery({ queryKey: ['light'], queryFn: getLight })
  const sensor = useQuery({ queryKey: ['sensor'], queryFn: getTemperatureSensor })
  const camera = useQuery({ queryKey: ['camera'], queryFn: getCamera })
  const devices = [light.data, sensor.data, camera.data].filter(Boolean)

  return (
    <div className="h-full bg-[#f5f4f0]/60 backdrop-blur-md rounded-3xl p-6 shadow-sm shadow-stone-300/15">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[19px] font-semibold text-stone-800">Devices</span>
        <span className="text-[10px] text-stone-400 bg-stone-50 rounded-full px-2 py-0.5">{devices.length}</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {devices.map((d) => {
          if (!d) return null
          const on = d.status === 'on' || d.status === 'active'
          return (
            <div key={d.id} className={`flex items-center gap-3 px-4 py-3 rounded-2xl ${on ? 'bg-stone-50' : ''}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${on ? 'bg-white text-stone-600' : 'bg-stone-100 text-stone-400'}`}>
                {icons[d.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-stone-800 truncate">{d.name}</div>
                <div className="text-[11px] text-stone-400">{d.room}</div>
              </div>
              <span className={`w-1.5 h-1.5 rounded-full ${on ? 'bg-emerald-400' : 'bg-stone-300'}`} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
