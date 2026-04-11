import type { ReactNode } from 'react'

export function InsightTile({ icon, iconBg, label, value, sub }: {
  icon: ReactNode; iconBg: string; label: string; value: string; sub: string
}) {
  return (
    <div className="rounded-3xl p-5" style={{ background: 'rgba(255,255,255,0.65)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
      <div className="w-9 h-9 rounded-2xl flex items-center justify-center mb-3" style={{ background: iconBg }}>
        {icon}
      </div>
      <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wide mb-1">{label}</div>
      <div className="text-[20px] font-bold text-stone-900 leading-none mb-1">{value}</div>
      <div className="text-[11px] text-stone-400">{sub}</div>
    </div>
  )
}
