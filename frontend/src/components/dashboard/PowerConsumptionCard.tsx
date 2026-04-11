const bars = [
  0, 0, 0.2, 0.4, 0, 0, 0.6, 1, 0.8, 1, 0.6, 0.4,
  0, 0, 0.3, 0.7, 1, 1, 0.9, 0.5, 0, 0, 0.4, 0.8,
  1, 1, 0.7, 0.3, 0, 0.5, 0.9, 1, 0.8, 0.6, 0.4, 1,
]
const WATTAGE = 0.06
const totalKwh = bars.reduce((s, v) => s + v * (5 / 60) * WATTAGE, 0)
const maxBar = 1
const avgFraction = bars.reduce((s, v) => s + v, 0) / bars.length
const BAR_COUNT = bars.length

const W = 340, H = 110
const gap = 2
const barW = (W - gap * (BAR_COUNT - 1)) / BAR_COUNT
const normalY = H - (avgFraction / maxBar) * H

export function PowerConsumptionCard() {
  return (
    <div className="h-full bg-[#f5f4f0]/60 backdrop-blur-md rounded-3xl p-6 shadow-sm shadow-stone-300/15 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[19px] font-semibold text-stone-800">Power Consumption</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-stone-300">
          <path d="M7 17l9.2-9.2M17 17V7H7" />
        </svg>
      </div>

      <div className="flex items-end gap-2 mb-5">
        <span className="text-4xl font-bold text-stone-900 leading-none">{totalKwh.toFixed(2)}</span>
        <span className="text-lg font-semibold text-stone-400 mb-0.5">kWh</span>
        <span className="text-sm text-emerald-500 font-semibold mb-1 ml-1">▲ +7.8%</span>
      </div>

      <div className="flex-1 flex items-end">
        <svg viewBox={`0 0 ${W} ${H + 18}`} className="w-full" style={{ height: 150 }}>
          <line x1="0" y1={normalY} x2={W} y2={normalY}
            stroke="rgb(214 211 209)" strokeWidth="0.8" strokeDasharray="4 3" />
          <text x="4" y={normalY - 4} fontSize="8" fill="rgb(168 162 158)" fontFamily="system-ui">Normal</text>

          {bars.map((v, i) => {
            const barH = Math.max((v / maxBar) * H, 3)
            const x = i * (barW + gap)
            const isLast = i === BAR_COUNT - 1
            return (
              <rect key={i} x={x} y={H - barH} width={barW} height={barH} rx="3"
                fill={isLast ? 'rgb(234 88 12)' : 'rgb(214 211 209)'}
                opacity={isLast ? 1 : 0.45 + (i / BAR_COUNT) * 0.45}
              />
            )
          })}

          <text x="0" y={H + 15} fontSize="7" fill="rgb(168 162 158)" fontFamily="system-ui">10:00</text>
          <text x={W} y={H + 15} fontSize="7" fill="rgb(168 162 158)" textAnchor="end" fontFamily="system-ui">13:00</text>
        </svg>
      </div>
    </div>
  )
}
