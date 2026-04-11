export function TemperatureHero({ value, status }: { value?: number; status: string }) {
  return (
    <div
      className="sm:col-span-3 relative overflow-hidden rounded-3xl p-7"
      style={{
        background: 'linear-gradient(135deg, #fffaf5, #fff7ef)',
        boxShadow: '0 4px 24px rgba(200,96,31,0.08), 0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 80% 20%, rgba(200,96,31,0.06), transparent 65%)' }} />

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-[13px] font-semibold text-stone-400 uppercase tracking-wide">Current Temperature</div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-stone-400">Live · Indoor</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(200,96,31,0.08)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8601F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" />
          </svg>
        </div>
      </div>

      <div className="flex items-end gap-2 mb-4">
        <span className="text-[56px] font-bold text-stone-900 leading-none tracking-tight">{value ?? '--'}</span>
        <span className="text-[24px] font-semibold text-stone-400 mb-2">°C</span>
      </div>

      <div className="flex items-center gap-3">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold ${
          status === 'Comfortable' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
        }`}>
          <span className={`w-1 h-1 rounded-full ${status === 'Comfortable' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          {status}
        </span>
        <span className="text-[11px] text-stone-400">Indoor climate is stable</span>
      </div>
    </div>
  )
}
