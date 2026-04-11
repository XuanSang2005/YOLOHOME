import type { ReactNode } from 'react'
import shieldImg from '../../assets/shield.png'
import userImg from '../../assets/user.png'
import cameraImg from '../../assets/camera.png'

function StatusRow({ icon, label, positive }: { icon: ReactNode; label: string; positive: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className={`w-5 h-5 rounded-lg flex items-center justify-center ${positive ? 'bg-emerald-50' : 'bg-stone-100'}`}
        style={{ opacity: positive ? 1 : 0.55 }}>
        {icon}
      </div>
      <span className="text-[12px] text-stone-500">{label}</span>
    </div>
  )
}

export function SecuritySummary({ name, room, isActive, lastFace }: {
  name?: string; room?: string; isActive: boolean
  lastFace?: { face_label: string | null; created_at: string } | null
}) {
  return (
    <div
      className="sm:col-span-3 relative overflow-hidden rounded-3xl p-7"
      style={{
        background: isActive ? 'linear-gradient(135deg, #f4faf7, #edf7f2)' : 'linear-gradient(135deg, #fafafa, #f5f4f3)',
        boxShadow: isActive ? '0 4px 24px rgba(16,185,129,0.07), 0 1px 3px rgba(0,0,0,0.04)' : '0 4px 24px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <div className="absolute top-0 right-0 w-52 h-52 pointer-events-none"
        style={{ background: `radial-gradient(circle at 80% 20%, ${isActive ? 'rgba(16,185,129,0.05)' : 'rgba(168,162,158,0.06)'}, transparent 65%)` }} />

      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="text-[12px] font-semibold text-stone-400 uppercase tracking-wider mb-1">Security Status</div>
          <div className="flex items-center gap-2">
            {isActive && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
            <span className="text-[11px] text-stone-400">{isActive ? 'Live monitoring active' : 'System standby'}</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ background: isActive ? 'rgba(16,185,129,0.08)' : 'rgba(168,162,158,0.10)' }}>
          <img src={shieldImg} className="w-5 h-5 object-contain" style={{ opacity: isActive ? 1 : 0.5 }} />
        </div>
      </div>

      <div className="text-[26px] font-bold text-stone-900 leading-tight tracking-tight mb-1">
        {name ?? 'Front Door Webcam'}
      </div>
      <div className="text-[13px] text-stone-500 mb-5">
        {room ?? 'Front Door'} · {isActive ? 'Monitoring entrance activity' : 'Camera is currently off'}
      </div>

      <div className="flex flex-col gap-2.5">
        <StatusRow icon={<img src={shieldImg} className="w-3.5 h-3.5 object-contain" />} label="No unusual activity detected" positive />
        <StatusRow
          icon={<img src={userImg} className="w-3.5 h-3.5 object-contain" />}
          label={lastFace ? `Last recognized: ${lastFace.face_label ?? 'Unknown'}` : 'No face detections yet'}
          positive={!!lastFace && lastFace.face_label !== 'Unknown'}
        />
        <StatusRow
          icon={<img src={cameraImg} className="w-3.5 h-3.5 object-contain" />}
          label={isActive ? 'Connected and streaming · 1080p' : 'Camera is offline'}
          positive={isActive}
        />
      </div>
    </div>
  )
}
