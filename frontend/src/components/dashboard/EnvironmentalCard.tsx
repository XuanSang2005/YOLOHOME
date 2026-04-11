import { useQuery } from '@tanstack/react-query'
import { getCurrentReading, getTemperatureLogs } from '../../services/temperatureService'
import type { Metric } from './types'

const METRIC_CONFIG: Record<Metric, { label: string; unit: string; defaultMax: number }> = {
  temperature:     { label: 'Temperature', unit: '°C',  defaultMax: 30 },
  light_intensity: { label: 'Light',       unit: 'lx',  defaultMax: 600 },
  air_quality:     { label: 'Air Quality', unit: 'AQI', defaultMax: 100 },
}

export function EnvironmentalCard({ metric }: { metric: Metric }) {
  const cfg = METRIC_CONFIG[metric]

  const current = useQuery({ queryKey: ['currentReading'], queryFn: getCurrentReading })
  const logs = useQuery({ queryKey: ['temperatureLogs'], queryFn: getTemperatureLogs })

  const sorted = [...(logs.data ?? [])].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  )
  const values = sorted.map((l) => l[metric] as number)
  const minT = values.length > 0 ? Math.min(...values) - 1 : 0
  const maxT = values.length > 0 ? Math.max(...values) + 1 : cfg.defaultMax
  const currentVal = current.data?.[metric] ?? '--'

  const W = 320, H = 100, PL = 28, PR = 8, PT = 8, PB = 18
  const usableW = W - PL - PR
  const usableH = H - PT - PB
  const toX = (i: number) => PL + (i / Math.max(sorted.length - 1, 1)) * usableW
  const toY = (v: number) => PT + usableH - ((v - minT) / (maxT - minT || 1)) * usableH

  const linePoints = values.map((v, i) => `${toX(i)},${toY(v)}`).join(' ')
  const fillPath =
    values.length > 1
      ? `M${PL},${PT + usableH} L${values.map((v, i) => `${toX(i)},${toY(v)}`).join(' L')} L${toX(values.length - 1)},${PT + usableH} Z`
      : ''

  const ySteps = [minT, minT + (maxT - minT) / 2, maxT].map((v) => Math.round(v))
  const xLabels = sorted.filter((_, i) => i % Math.max(1, Math.floor(sorted.length / 5)) === 0)

  return (
    <div className="h-full overflow-hidden bg-[#f5f4f0]/60 backdrop-blur-md rounded-3xl p-6 shadow-sm shadow-stone-300/15">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[19px] font-semibold text-stone-800">{cfg.label}</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-stone-300">
          <path d="M7 17l9.2-9.2M17 17V7H7" />
        </svg>
      </div>
      <div className="flex items-end gap-1 mb-3">
        <span className="text-4xl font-bold text-stone-900 leading-none">{currentVal}{cfg.unit}</span>
        <span className="text-sm text-emerald-500 font-semibold mb-1 ml-3">▲ +0.12%</span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none" style={{ height: 130 }}>
        <defs>
          <linearGradient id="envFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(234 88 12)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="rgb(234 88 12)" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {ySteps.map((v) => (
          <line key={v} x1={PL} y1={toY(v)} x2={W - PR} y2={toY(v)}
            stroke="rgb(214 211 209)" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.4" />
        ))}

        {ySteps.map((v) => (
          <text key={`y${v}`} x={PL - 4} y={toY(v) + 3} textAnchor="end" fontSize="8" fill="rgb(168 162 158)" fontFamily="system-ui">
            {v}
          </text>
        ))}

        {xLabels.map((d) => {
          const i = sorted.indexOf(d)
          return (
            <text key={d.id} x={toX(i)} y={H - 3} textAnchor="middle" fontSize="7" fill="rgb(168 162 158)" fontFamily="system-ui">
              {new Date(d.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
            </text>
          )
        })}

        {fillPath && <path d={fillPath} fill="url(#envFill)" />}

        {sorted.length > 1 && (
          <polyline points={linePoints} fill="none" stroke="rgb(234 88 12)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        )}

        {sorted.map((d, i) => (
          <circle key={d.id} cx={toX(i)} cy={toY(values[i] ?? 0)}
            r={i === sorted.length - 1 ? 3 : 1.5}
            fill="rgb(234 88 12)"
            opacity={i === sorted.length - 1 ? 1 : 0.4} />
        ))}
      </svg>
    </div>
  )
}
