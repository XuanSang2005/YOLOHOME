import { useState, useEffect, useRef } from 'react'
import { TEMP } from './types'
import type { RoomLightCardProps } from './types'
import { BrightnessSlider } from './BrightnessSlider'
import { TemperatureChips } from './TemperatureChips'

export function RoomLightCard({
  name, schedule, icon,
  isOn, brightness, colorTemp,
  onToggle, onBrightness, onColorTemp,
}: RoomLightCardProps) {
  const [expanded, setExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [liveB, setLiveB] = useState(brightness)
  const tc = TEMP[colorTemp]
  const dark = !isOn

  useEffect(() => { setLiveB(brightness) }, [brightness])

  useEffect(() => {
    if (!expanded) return
    const handler = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setExpanded(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [expanded])

  const b = liveB / 100
  const glowSize      = isOn ? 90 + b * 110 : 0
  const glowOpacity   = isOn ? 0.18 + b * 0.42 : 0
  const shadowAlpha   = isOn ? Math.round((0.15 + b * 0.40) * 255).toString(16).padStart(2, '0') : '00'
  const ambientOpacity = isOn ? 0.15 + b * 0.35 : 0

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-3xl flex flex-col p-6 cursor-pointer select-none outline-none"
      onClick={() => setExpanded((v) => !v)}
      style={{
        background: isOn ? tc.cardBg : '#0c0e1c',
        boxShadow: isOn
          ? `0 4px 32px ${tc.hex}${shadowAlpha}, 0 1px 3px rgba(0,0,0,0.06)`
          : '0 4px 24px rgba(0,0,0,0.25)',
        transition: 'background 0.5s, box-shadow 0.5s',
      }}
    >
      {/* Stars (OFF only) */}
      {dark && (
        <div className="absolute inset-0 pointer-events-none">
          {[[18,12],[45,28],[72,8],[90,35],[30,55],[60,48],[82,20],[15,70],[50,75],[75,65],[35,85],[65,90],[88,80],[20,40],[55,18]].map(([x,y],i) => (
            <div key={i} className="absolute rounded-full bg-white"
              style={{ left:`${x}%`, top:`${y}%`, width: i%3===0?2:1, height: i%3===0?2:1, opacity: 0.25+(i%4)*0.1 }} />
          ))}
        </div>
      )}

      {/* Ambient overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          opacity: ambientOpacity,
          background: `radial-gradient(ellipse at 50% 38%, ${tc.hex}55 0%, transparent 68%)`,
        }} />

      {/* Header */}
      <div className="flex items-start justify-between relative z-10">
        <div>
          <div className={`text-[17px] font-semibold leading-none transition-colors duration-500 ${isOn ? 'text-stone-800' : 'text-white/70'}`}>
            {name}
          </div>
          <div className={`flex items-center gap-1.5 mt-1.5 transition-opacity duration-400 ${isOn ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[9px] font-bold tracking-widest text-emerald-500 uppercase">Active</span>
          </div>
        </div>
        <div className={`shrink-0 transition-all duration-500 ${isOn ? 'text-stone-400' : 'text-white/25'}`}>
          {icon}
        </div>
      </div>

      {/* Orb */}
      <div className="flex-1 flex items-center justify-center py-5 relative z-10">
        <div
          role="button"
          onClick={(e) => { e.stopPropagation(); onToggle() }}
          className="relative flex items-center justify-center group cursor-pointer"
        >
          {isOn && (
            <div className="absolute rounded-full pointer-events-none animate-glow-pulse"
              style={{ width: 130, height: 130, background: `radial-gradient(circle, ${tc.hex}33 0%, transparent 70%)` }} />
          )}
          <div className="absolute rounded-full pointer-events-none"
            style={{ width: glowSize, height: glowSize, opacity: glowOpacity,
              background: `radial-gradient(circle, ${tc.hex}60 0%, ${tc.hex}18 50%, transparent 72%)` }} />
          <div className="absolute rounded-full pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{ width: 108, height: 108, background: `radial-gradient(circle, ${isOn ? tc.hex + '28' : 'rgba(255,255,255,0.10)'} 0%, transparent 70%)` }} />
          <div className="relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-700 group-active:scale-95"
            style={isOn ? {
              background: `linear-gradient(135deg, ${tc.orbFrom}, ${tc.orbTo})`,
              boxShadow: `0 8px 32px ${tc.hex}${shadowAlpha}, 0 0 0 1px ${tc.hex}22`,
              border: '1px solid transparent',
            } : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', boxShadow: 'none' }}
          >
            <svg width="46" height="46" viewBox="0 0 24 24" fill="none" strokeWidth="1.25"
              stroke={isOn ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.30)'}
              className="transition-all duration-500">
              <path d="M9 18h6m-5 4h4M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="text-center relative z-10 mb-1">
        <div className={`text-[12px] font-bold tracking-[0.18em] uppercase transition-colors duration-500 ${isOn ? 'text-stone-600' : 'text-white/25'}`}>
          {isOn ? 'On' : 'Off'}
        </div>
        <div className={`text-[11px] font-medium mt-0.5 transition-all duration-500 ${isOn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
          style={{ color: tc.hex }}>
          {liveB}% · {tc.label}
        </div>
      </div>

      {/* Controls (ON + expanded only) */}
      <div className={`relative z-10 overflow-hidden transition-all duration-500 ease-out ${
        expanded && isOn ? 'max-h-52 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
      }`}>
        <div className={`h-px mb-4 ${dark ? 'bg-white/10' : 'bg-black/6'}`} />

        <div className="mb-3">
          <div className={`text-[9px] font-bold tracking-[0.15em] uppercase mb-2 ${dark ? 'text-white/30' : 'text-stone-400'}`}>
            Brightness
          </div>
          <BrightnessSlider value={brightness} onCommit={onBrightness} onLiveChange={setLiveB} colorTemp={colorTemp} dark={dark} />
        </div>

        <div className="mb-4">
          <div className={`text-[9px] font-bold tracking-[0.15em] uppercase mb-2 ${dark ? 'text-white/30' : 'text-stone-400'}`}>
            Color Temp
          </div>
          <TemperatureChips value={colorTemp} onChange={onColorTemp} dark={dark} />
        </div>

        <div className={`flex items-center gap-2 text-[10px] font-medium ${dark ? 'text-white/25' : 'text-stone-400'}`}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg>
          <span>Auto off · {schedule}</span>
        </div>
      </div>
    </div>
  )
}
