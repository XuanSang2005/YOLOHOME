import type { ReactNode } from 'react'

export function InsightCard({ icon, iconBg, iconColor, label, value, sub }: {
  icon: ReactNode; iconBg: string; iconColor: string
  label: string; value: string; sub: string
}) {
  return (
    <div className="rounded-3xl p-5" style={{ background: 'rgba(255,255,255,0.65)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
      <div className="flex items-center gap-2.5 mb-3">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${iconBg}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {icon}
          </svg>
        </div>
        <span className="text-[12px] font-semibold text-stone-400 uppercase tracking-wide">{label}</span>
      </div>
      <div className="text-[22px] font-bold text-stone-900 leading-none mb-1">{value}</div>
      <div className="text-[11px] text-stone-400">{sub}</div>
    </div>
  )
}
