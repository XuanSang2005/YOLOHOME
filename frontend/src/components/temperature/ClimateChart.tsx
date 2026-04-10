type LogEntry = { id: number; temperature: number; humidity: number; created_at: string }

export function ClimateChart({ sorted, minTemp, maxTemp }: {
  sorted: LogEntry[]
  minTemp: number
  maxTemp: number
}) {
  if (!sorted.length) return null

  const W = 960, H = 220
  const PL = 38, PR = 10, PT = 18, PB = 28
  const usableW = W - PL - PR
  const usableH = H - PT - PB

  const chartMin = minTemp - 1
  const chartMax = maxTemp + 1

  const toX = (i: number) => PL + (i / Math.max(sorted.length - 1, 1)) * usableW
  const toY = (v: number) => PT + usableH - ((v - chartMin) / (chartMax - chartMin)) * usableH

  const humids = sorted.map((l) => l.humidity)
  const hMin = Math.min(...humids) - 3
  const hMax = Math.max(...humids) + 3
  const toHY = (v: number) => PT + usableH - ((v - hMin) / (hMax - hMin)) * usableH

  const tempLine = sorted.map((l, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(l.temperature)}`).join(' ')
  const tempArea = `M${toX(0)},${toY(chartMin)} ${sorted.map((l, i) => `L${toX(i)},${toY(l.temperature)}`).join(' ')} L${toX(sorted.length - 1)},${toY(chartMin)} Z`
  const humidLine = sorted.map((l, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toHY(l.humidity)}`).join(' ')

  const comfortTop = toY(Math.min(26, chartMax))
  const comfortBot = toY(Math.max(22, chartMin))

  const yCount = 5
  const ySteps = Array.from({ length: yCount + 1 }, (_, i) => chartMin + (i / yCount) * (chartMax - chartMin))

  const xLabels = sorted.filter((_, i) => i % 2 === 0)

  const lastX = toX(sorted.length - 1)
  const lastY = toY(sorted[sorted.length - 1].temperature)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full block">
      <defs>
        <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8601F" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#C8601F" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Comfort zone band */}
      <rect x={PL} y={comfortTop} width={usableW} height={comfortBot - comfortTop} rx="2"
        fill="rgb(16,185,129)" opacity="0.06" />
      <line x1={PL} y1={comfortTop} x2={PL + usableW} y2={comfortTop}
        stroke="rgb(16,185,129)" strokeWidth="0.7" strokeDasharray="4 4" opacity="0.30" />
      <line x1={PL} y1={comfortBot} x2={PL + usableW} y2={comfortBot}
        stroke="rgb(16,185,129)" strokeWidth="0.7" strokeDasharray="4 4" opacity="0.30" />
      <text x={PL + 6} y={comfortTop + 10} fontSize="8" fontWeight="500" fill="rgb(16,185,129)" opacity="0.55" fontFamily="system-ui">26°</text>
      <text x={PL + 6} y={comfortBot - 4} fontSize="8" fontWeight="500" fill="rgb(16,185,129)" opacity="0.55" fontFamily="system-ui">22°</text>

      {/* Y grid + labels */}
      {ySteps.map((v) => (
        <g key={v}>
          <line x1={PL} y1={toY(v)} x2={PL + usableW} y2={toY(v)}
            stroke="rgb(200 195 190)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.40" />
          <text x={PL - 8} y={toY(v) + 3.5} textAnchor="end" fontSize="10" fontWeight="500"
            fill="rgb(140 135 130)" fontFamily="system-ui">
            {Math.round(v)}°
          </text>
        </g>
      ))}

      {/* X labels */}
      {xLabels.map((d) => {
        const i = sorted.indexOf(d)
        return (
          <text key={d.id} x={toX(i)} y={H - 8} textAnchor="middle" fontSize="10" fontWeight="500"
            fill="rgb(140 135 130)" fontFamily="system-ui">
            {new Date(d.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
          </text>
        )
      })}

      <path d={tempArea} fill="url(#tempFill)" />

      <polyline points={humidLine} fill="none" stroke="#60a5fa" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" opacity="0.40" strokeDasharray="6 4" />

      <polyline points={tempLine} fill="none" stroke="#C8601F" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" />

      {sorted.map((d, i) => {
        const isLast = i === sorted.length - 1
        return (
          <circle key={d.id} cx={toX(i)} cy={toY(d.temperature)}
            r={isLast ? 4.5 : 2} fill="#C8601F" opacity={isLast ? 1 : 0.45} />
        )
      })}

      <circle cx={lastX} cy={lastY} r="9" fill="none" stroke="#C8601F" strokeWidth="1.5" opacity="0.18" />
    </svg>
  )
}
