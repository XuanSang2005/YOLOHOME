import { useState, useEffect, useRef } from 'react'
import { TEMP } from './types'
import type { ColorTemp } from './types'

export function BrightnessSlider({
  value, onCommit, colorTemp, dark, onLiveChange,
}: {
  value: number
  onCommit: (v: number) => void
  colorTemp: ColorTemp
  dark?: boolean
  onLiveChange: (v: number) => void
}) {
  const tc = TEMP[colorTemp]
  const [local, setLocal] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setLocal(value) }, [value])

  const trackBg = (v: number) => {
    const pct = ((v - 5) / 95) * 100
    const offset = (0.5 - pct / 100) * 17
    const stop = `calc(${pct}% + ${offset}px)`
    return dark
      ? `linear-gradient(to right, ${tc.sliderTrack} ${stop}, rgba(255,255,255,0.13) ${stop})`
      : `linear-gradient(to right, ${tc.sliderTrack} ${stop}, #e7e5e4 ${stop})`
  }

  return (
    <div className="flex items-center gap-3">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        className={dark ? 'text-white/30 shrink-0' : 'text-stone-300 shrink-0'}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
      <input
        ref={inputRef}
        type="range" min={5} max={100} value={local}
        onClick={(e) => e.stopPropagation()}
        className={`brightness-slider flex-1 ${dark ? 'brightness-slider-dark' : ''}`}
        style={{ background: trackBg(local) }}
        onChange={(e) => {
          const v = Number(e.target.value)
          setLocal(v)
          onLiveChange(v)
        }}
        onPointerUp={(e) => onCommit(Number((e.target as HTMLInputElement).value))}
      />
      <span className={`text-[11px] font-semibold tabular-nums w-8 text-right shrink-0 ${dark ? 'text-white/40' : 'text-stone-400'}`}>
        {local}%
      </span>
    </div>
  )
}
