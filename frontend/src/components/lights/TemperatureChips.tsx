import { TEMP } from './types'
import type { ColorTemp } from './types'

export function TemperatureChips({
  value, onChange, dark,
}: {
  value: ColorTemp
  onChange: (v: ColorTemp) => void
  dark?: boolean
}) {
  const temps: ColorTemp[] = ['warm', 'neutral', 'cool']
  return (
    <div className="flex gap-1.5">
      {temps.map((t) => {
        const active = t === value
        const tc = TEMP[t]
        return (
          <button
            key={t}
            onClick={(e) => { e.stopPropagation(); onChange(t) }}
            className="flex-1 py-1.5 rounded-xl text-[10px] font-bold tracking-wide uppercase transition-all duration-200"
            style={active
              ? { backgroundColor: tc.chipBg, color: tc.chipText }
              : dark
                ? { backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.28)' }
                : { backgroundColor: 'rgba(0,0,0,0.05)', color: '#a8a29e' }
            }
          >
            {tc.label}
          </button>
        )
      })}
    </div>
  )
}
