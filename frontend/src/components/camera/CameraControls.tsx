export function CameraControls({ isActive, isPending, onCommand }: {
  isActive: boolean; isPending: boolean
  onCommand: (cmd: 'on' | 'off') => void
}) {
  return (
    <div className="sm:col-span-2 rounded-3xl p-6 flex flex-col justify-between"
      style={{ background: 'rgba(255,255,255,0.65)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)' }}>
      <div className="text-[12px] font-semibold text-stone-400 uppercase tracking-widest mb-5">Controls</div>

      <div className="flex flex-col gap-2.5 flex-1">
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onCommand('on')}
          disabled={isPending}
          className={`w-full py-3.5 rounded-2xl text-[13px] font-semibold transition-all duration-200 disabled:opacity-50 ${
            isActive
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-default'
              : 'bg-emerald-500 text-white shadow-sm hover:bg-emerald-600 active:scale-[0.98]'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill={isActive ? '#10b981' : 'white'} stroke="none">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            {isActive ? 'Camera is On' : 'Turn On'}
          </span>
        </button>

        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onCommand('off')}
          disabled={isPending}
          className={`w-full py-3.5 rounded-2xl text-[13px] font-semibold transition-all duration-200 disabled:opacity-50 ${
            !isActive
              ? 'bg-stone-100 text-stone-400 border border-stone-200 cursor-default'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200 active:scale-[0.98]'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill={!isActive ? '#a8a29e' : '#57534e'} stroke="none">
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
            {!isActive ? 'Camera is Off' : 'Turn Off'}
          </span>
        </button>
      </div>

      <div className={`mt-5 pt-4 border-t ${isActive ? 'border-emerald-100' : 'border-stone-100'}`}>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-stone-400">Connection</span>
          <span className={`text-[11px] font-semibold ${isActive ? 'text-emerald-500' : 'text-stone-400'}`}>
            {isActive ? '● Streaming' : '○ Offline'}
          </span>
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[11px] text-stone-400">Resolution</span>
          <span className="text-[11px] font-semibold text-stone-500">1080p HD</span>
        </div>
      </div>
    </div>
  )
}
