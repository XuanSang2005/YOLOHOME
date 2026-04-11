import { useQuery } from '@tanstack/react-query'
import { getCurrentReading, getTemperatureLogs } from '../../services/temperatureService'
import { useState } from 'react'
import { TemperatureHero } from './TemperatureHero'
import { HumidityHero } from './HumidityHero'
import { InsightCard } from './InsightCard'
import { ClimateChart } from './ClimateChart'
import { fmtTime12 } from './utils'

export function TemperaturePage() {
  const current = useQuery({ queryKey: ['currentReading'], queryFn: getCurrentReading })
  const logs = useQuery({ queryKey: ['temperatureLogs'], queryFn: getTemperatureLogs })
  const [showAll, setShowAll] = useState(false)

  const sorted = [...(logs.data ?? [])].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  )
  const historyData = [...sorted].reverse()
  const displayHistory = showAll ? historyData : historyData.slice(0, 8)

  const temps = sorted.map((l) => l.temperature)
  const minTemp = temps.length ? Math.min(...temps) : 0
  const maxTemp = temps.length ? Math.max(...temps) : 30
  const avgTemp = temps.length ? temps.reduce((a, b) => a + b, 0) / temps.length : 0
  const peakEntry = sorted.length ? sorted.reduce((m, l) => (l.temperature > m.temperature ? l : m), sorted[0]) : null
  const lowEntry  = sorted.length ? sorted.reduce((m, l) => (l.temperature < m.temperature ? l : m), sorted[0]) : null

  const t = current.data?.temperature ?? 0
  const h = current.data?.humidity ?? 0
  const tempStatus  = t >= 22 && t <= 26 ? 'Comfortable' : t < 22 ? 'Slightly Cool' : 'Slightly Warm'
  const humidStatus = h >= 40 && h <= 70 ? 'Optimal' : h < 40 ? 'Dry' : 'Humid'

  const last6 = sorted.slice(-6).map((l) => l.temperature)
  const trendText = last6.length >= 2 && last6[last6.length - 1] > last6[0] ? 'Warming up' : 'Cooling down'

  return (
    <div className="flex flex-col gap-6 animate-float-up">
      {/* Page Title */}
      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-xs text-stone-400/80 mb-1.5">Last updated: just now</p>
          <h1 className="text-[32px] sm:text-[40px] font-normal text-stone-900 leading-tight tracking-tight">
            Temperature Monitoring
          </h1>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold rounded-2xl px-4 py-2 bg-white/70 text-stone-700">
          <div className={`w-1.5 h-1.5 rounded-full ${tempStatus === 'Comfortable' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
          {tempStatus}
        </div>
      </div>

      {/* Hero Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 animate-float-up" style={{ animationDelay: '80ms' }}>
        <TemperatureHero value={current.data?.temperature} status={tempStatus} />
        <HumidityHero value={current.data?.humidity} status={humidStatus} />
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-float-up" style={{ animationDelay: '160ms' }}>
        <InsightCard
          icon={<polyline points="18 15 12 9 6 15" />}
          iconBg="bg-orange-50" iconColor="#C8601F"
          label="Daily Peak"
          value={peakEntry ? `${peakEntry.temperature}°C` : '--'}
          sub={peakEntry ? `at ${fmtTime12(peakEntry.created_at)}` : ''}
        />
        <InsightCard
          icon={<polyline points="6 9 12 15 18 9" />}
          iconBg="bg-blue-50" iconColor="#60a5fa"
          label="Daily Low"
          value={lowEntry ? `${lowEntry.temperature}°C` : '--'}
          sub={lowEntry ? `at ${fmtTime12(lowEntry.created_at)}` : ''}
        />
        <InsightCard
          icon={<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />}
          iconBg="bg-stone-100" iconColor="#78716c"
          label="Trend"
          value={trendText}
          sub={`Avg ${avgTemp.toFixed(1)}°C today`}
        />
      </div>

      {/* Climate Chart */}
      <div
        className="rounded-3xl overflow-hidden animate-float-up"
        style={{ animationDelay: '240ms', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)' }}
      >
        <div className="px-7 pt-6 pb-2 flex items-center justify-between">
          <div>
            <h2 className="text-[20px] font-semibold text-stone-900 tracking-tight">Climate Timeline</h2>
            <p className="text-[13px] text-stone-500 mt-0.5">24-hour temperature &amp; humidity</p>
          </div>
          <div className="flex items-center gap-5 text-[11px] font-medium text-stone-500">
            <span className="flex items-center gap-2"><span className="w-4 h-0.5 rounded-full bg-[#C8601F]" />Temperature</span>
            <span className="flex items-center gap-2"><span className="w-4 h-0.5 rounded-full bg-[#60a5fa] opacity-60" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #60a5fa 0 4px, transparent 4px 7px)' }} />Humidity</span>
            <span className="flex items-center gap-2"><span className="w-4 h-2.5 rounded-sm" style={{ background: 'rgba(16,185,129,0.10)', border: '1px solid rgba(16,185,129,0.25)' }} />Comfort zone</span>
          </div>
        </div>
        <div className="px-3 pb-4">
          <ClimateChart sorted={sorted} minTemp={minTemp} maxTemp={maxTemp} />
        </div>
      </div>

      {/* Measurement History */}
      <div
        className="rounded-3xl overflow-hidden animate-float-up"
        style={{ animationDelay: '320ms', background: '#ffffff', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.07)' }}
      >
        <div className="flex items-start justify-between px-7 pt-6 pb-5" style={{ background: '#f0efed' }}>
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <div className="w-0.75 h-4.5 rounded-full bg-[#C8601F]" />
              <h2 className="text-[19px] font-semibold text-stone-900 leading-none tracking-tight">Measurement History</h2>
            </div>
            <p className="text-[13px] text-stone-400 pl-3.75">24-hour climate log</p>
          </div>
          <div className="bg-stone-200/80 rounded-full px-3 py-1.5">
            <span className="text-[12px] font-semibold text-stone-500 tabular-nums">{logs.data?.length ?? 0} readings</span>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_120px_100px_80px] px-7 py-3 bg-stone-50 border-y border-stone-100/80">
          {[
            { label: 'Time', cls: '' },
            { label: 'Temp', cls: 'text-center' },
            { label: 'Humidity', cls: 'text-center' },
            { label: 'Status', cls: 'text-center' },
          ].map(({ label, cls }) => (
            <span key={label} className={`text-[12px] font-bold tracking-[0.15em] uppercase text-stone-400 ${cls}`}>{label}</span>
          ))}
        </div>

        <div className="divide-y divide-stone-100/70">
          {displayHistory.map((log, idx) => {
            const comfort = log.temperature >= 22 && log.temperature <= 26 ? 'good' : log.temperature < 22 ? 'cool' : 'warm'
            const prev = historyData[idx + 1]
            const trend = prev ? (log.temperature > prev.temperature ? 'up' : log.temperature < prev.temperature ? 'down' : 'flat') : 'flat'
            const time = new Date(log.created_at)
            return (
              <div key={log.id} className="grid grid-cols-[1fr_120px_100px_80px] items-center px-7 py-4">
                <div>
                  <div className="text-[14px] font-semibold text-stone-800 leading-snug">
                    {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                  </div>
                  <div className="text-[11px] text-stone-400 mt-0.5">
                    {time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-[14px] font-semibold text-stone-800 tabular-nums w-14 text-right">{log.temperature}°C</span>
                  <span className="w-3 flex items-center justify-center shrink-0">
                    {trend === 'up' && (
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#C8601F" strokeWidth="2" strokeLinecap="round"><polyline points="2 8 6 4 10 8" /></svg>
                    )}
                    {trend === 'down' && (
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"><polyline points="2 4 6 8 10 4" /></svg>
                    )}
                  </span>
                </div>
                <div className="text-[14px] font-medium text-blue-500 text-center tabular-nums">{log.humidity}%</div>
                <div className="flex justify-center">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                    comfort === 'good' ? 'bg-emerald-50 text-emerald-600'
                    : comfort === 'warm' ? 'bg-orange-50 text-orange-500'
                    : 'bg-blue-50 text-blue-500'
                  }`}>
                    <span className={`w-1 h-1 rounded-full ${comfort === 'good' ? 'bg-emerald-500' : comfort === 'warm' ? 'bg-orange-400' : 'bg-blue-400'}`} />
                    {comfort === 'good' ? 'OK' : comfort === 'warm' ? 'Warm' : 'Cool'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="px-7 py-3.5 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between">
          <span className="text-[12px] font-medium text-stone-400">
            Showing {displayHistory.length} of {historyData.length} readings
          </span>
          <button onClick={() => setShowAll((v) => !v)} className="inline-flex items-center gap-1 text-[12px] font-bold text-[#C8601F]/60 tracking-wide uppercase">
            {showAll ? 'Show less' : 'View all'}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
