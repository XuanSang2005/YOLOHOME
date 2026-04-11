import { useQuery } from '@tanstack/react-query'
import { getCurrentReading } from '../../services/temperatureService'

export function ClimateCard() {
  const current = useQuery({ queryKey: ['currentReading'], queryFn: getCurrentReading })
  const humidity = current.data?.humidity ?? 65

  const R = 150, sw = 11, cx = 158, cy = 158
  const halfC = Math.PI * R
  const humidDash = (Math.min(humidity, 100) / 100) * halfC

  return (
    <div className="h-full bg-[#f5f4f0]/60 backdrop-blur-md rounded-3xl p-6 shadow-sm shadow-stone-300/15 flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[19px] font-semibold text-stone-800">Climate</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-stone-300">
          <path d="M7 17l9.2-9.2M17 17V7H7" />
        </svg>
      </div>
      <div className="flex items-center gap-3 text-xs text-stone-400 mb-2">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />Humidity
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-stone-300 inline-block" />Temperature
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 316 166" className="w-full" preserveAspectRatio="xMidYMid meet" style={{ height: 170 }}>
          <path
            d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
            fill="none" stroke="rgb(231 229 228)" strokeWidth={sw} strokeLinecap="round"
          />
          <path
            d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
            fill="none" stroke="rgb(234 88 12)" strokeWidth={sw} strokeLinecap="round"
            strokeDasharray={`${humidDash} ${halfC}`}
          />
          <text x={cx} y={cy - 24} textAnchor="middle" fontSize="30" fontWeight="700" fill="#1c1917" fontFamily="system-ui">
            {humidity}%
          </text>
          <text x={cx} y={cy - 8} textAnchor="middle" fontSize="11" fill="#a8a29e" fontFamily="system-ui">
            Humidity
          </text>
        </svg>
      </div>
    </div>
  )
}
