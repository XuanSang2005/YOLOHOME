import { useState } from 'react'
import homeImage from '../../assets/Modern eco-friendly home with solar panels.png'
import { SensorTabs } from './SensorTabs'
import { EnvironmentalCard } from './EnvironmentalCard'
import { LightCard } from './LightCard'
import { DevicesCard } from './DevicesCard'
import { ClimateCard } from './ClimateCard'
import { PowerConsumptionCard } from './PowerConsumptionCard'
import type { Metric } from './types'

export function DashboardPage() {
  const [metric, setMetric] = useState<Metric>('temperature')

  return (
    <div className="relative min-h-[calc(100vh-120px)]">
      {/* floating house image */}
      <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none z-0">
        <img src={homeImage} alt="Smart Home" className="w-full max-w-265 object-contain drop-shadow-2xl -translate-y-22.5" />
      </div>

      <div className="relative z-10 flex flex-col min-h-[calc(100vh-120px)]">

        {/* TOP: title */}
        <div className="mb-3 lg:mb-4 mt-3 lg:mt-5 animate-float-up" style={{ animationDelay: '0ms' }}>
          <p className="text-xs text-stone-400/80 mb-1.5">Last updated: 3 mins ago</p>
          <h1 className="text-[26px] sm:text-[34px] lg:text-[46px] font-normal text-stone-900 leading-[1.12] tracking-tight">
            Smart Home<br />Management
          </h1>
        </div>

        {/* MIDDLE: left cards + house spacer + right card */}
        <div className="flex-1 flex flex-col gap-4 lg:grid lg:grid-cols-[1fr_minmax(300px,42%)_1fr] lg:gap-x-4">
          <div className="flex flex-col gap-3 lg:justify-end lg:pb-40 animate-float-up" style={{ animationDelay: '100ms' }}>
            <SensorTabs metric={metric} onChange={setMetric} />
            <div className="h-64 lg:h-70">
              <EnvironmentalCard metric={metric} />
            </div>
          </div>
          <div className="hidden lg:block" />
          <div className="flex flex-col gap-3 lg:justify-end lg:pb-40 animate-float-up" style={{ animationDelay: '180ms' }}>
            <div className="flex justify-end">
              <div className="bg-[#f5f4f0] rounded-2xl px-6 py-3 flex items-center gap-3 shadow-sm shadow-stone-300/15">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-stone-400">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                <span className="text-sm font-semibold text-stone-700">20 – 27, Apr 2026</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-400">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
            <div className="h-64 lg:h-70">
              <DevicesCard />
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:-mt-36 relative z-20 *:min-h-72 lg:*:min-h-80">
          <div className="animate-float-up h-full" style={{ animationDelay: '260ms' }}><LightCard /></div>
          <div className="animate-float-up h-full" style={{ animationDelay: '320ms' }}><ClimateCard /></div>
          <div className="sm:col-span-2 lg:col-span-1 animate-float-up h-full" style={{ animationDelay: '380ms' }}>
            <PowerConsumptionCard />
          </div>
        </div>
      </div>
    </div>
  )
}
