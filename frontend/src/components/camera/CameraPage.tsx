import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCamera, getCameraLogs, sendCameraCommand } from '../../services/cameraService'
import { useState } from 'react'
import cameraImg from '../../assets/camera.png'
import cautionImg from '../../assets/caution-triangle.png'
import shieldImg from '../../assets/shield.png'
import userImg from '../../assets/user.png'
import { InsightTile } from './InsightTile'
import { CameraPreview } from './CameraPreview'
import { SecuritySummary } from './SecuritySummary'
import { CameraControls } from './CameraControls'
import { EVENT_CFG } from './EventConfig'

export function CameraPage() {
  const queryClient = useQueryClient()
  const camera = useQuery({ queryKey: ['camera'], queryFn: getCamera })
  const logs = useQuery({ queryKey: ['cameraLogs'], queryFn: getCameraLogs })
  const [showAll, setShowAll] = useState(false)

  const mutation = useMutation({
    mutationFn: sendCameraCommand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['camera'] })
      queryClient.invalidateQueries({ queryKey: ['cameraLogs'] })
    },
  })

  const isActive    = camera.data?.status === 'active'
  const displayLogs = showAll ? logs.data : logs.data?.slice(0, 6)
  const faceCount   = logs.data?.filter((l) => l.event === 'face_detected').length ?? 0
  const lastFace    = logs.data?.find((l) => l.event === 'face_detected')
  const unknownCount = logs.data?.filter((l) => l.face_label === 'Unknown').length ?? 0

  return (
    <div className="flex flex-col gap-5 animate-float-up">

      {/* Page Title */}
      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-xs text-stone-400/80 mb-1.5">Security · Front Door</p>
          <h1 className="text-[32px] sm:text-[40px] font-normal text-stone-900 leading-tight tracking-tight">Camera</h1>
        </div>
        <div className={`flex items-center gap-2 text-sm font-semibold rounded-2xl px-4 py-2 ${
          isActive ? 'bg-white/70 text-stone-700' : 'bg-white/50 text-stone-400'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-stone-300'}`} />
          {isActive ? 'Online' : 'Offline'}
        </div>
      </div>

      {/* Hero */}
      <div className="animate-float-up" style={{ animationDelay: '60ms' }}>
        <CameraPreview isActive={isActive} name={camera.data?.name} room={camera.data?.room} />
      </div>

      {/* 4 Insight Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-float-up" style={{ animationDelay: '120ms' }}>
        <InsightTile
          icon={<img src={userImg} className="w-5 h-5 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(71%) sepia(10%) saturate(300%) hue-rotate(345deg)' }} />}
          iconBg="rgba(168,162,158,0.14)"
          label="Faces Today"
          value={`${faceCount}`}
          sub={lastFace?.face_label ? `Last: ${lastFace.face_label}` : 'No detections yet'}
        />
        <InsightTile
          icon={<img src={cautionImg} className="w-5 h-5 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(98%) saturate(500%) hue-rotate(330deg) brightness(110%)' }} />}
          iconBg="rgba(239,68,68,0.10)"
          label="Unknown Visitors"
          value={`${unknownCount}`}
          sub={unknownCount > 0 ? 'Review activity log' : 'No alerts'}
        />
        <InsightTile
          icon={<img src={shieldImg} className="w-5 h-5 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(59%) sepia(64%) saturate(400%) hue-rotate(120deg)' }} />}
          iconBg="rgba(16,185,129,0.10)"
          label="Motion Detect"
          value="Active"
          sub="Monitoring entrance"
        />
        <InsightTile
          icon={<img src={cameraImg} className="w-5 h-5 object-contain" style={{ filter: isActive ? 'brightness(0) saturate(100%) invert(59%) sepia(64%) saturate(400%) hue-rotate(120deg)' : 'brightness(0) saturate(100%) invert(71%) sepia(10%) saturate(300%) hue-rotate(345deg)' }} />}
          iconBg={isActive ? 'rgba(16,185,129,0.10)' : 'rgba(168,162,158,0.10)'}
          label="Camera Health"
          value={isActive ? 'Online' : 'Offline'}
          sub={isActive ? '1080p · Connected' : 'Camera is off'}
        />
      </div>

      {/* Security Summary + Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 animate-float-up" style={{ animationDelay: '180ms' }}>
        <SecuritySummary name={camera.data?.name} room={camera.data?.room} isActive={isActive} lastFace={lastFace} />
        <CameraControls isActive={isActive} isPending={mutation.isPending} onCommand={(cmd) => mutation.mutate(cmd)} />
      </div>

      {/* Activity Feed */}
      <div
        className="rounded-3xl overflow-hidden animate-float-up"
        style={{ animationDelay: '240ms', background: '#ffffff', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.07)' }}
      >
        <div className="flex items-start justify-between px-7 pt-6 pb-5" style={{ background: '#f0efed' }}>
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <div className="w-0.75 h-4.5 rounded-full bg-[#C8601F]" />
              <h2 className="text-[19px] font-semibold text-stone-900 leading-none tracking-tight">Security Activity</h2>
            </div>
            <p className="text-[13px] text-stone-400 pl-3.75">Recent camera events &amp; detections</p>
          </div>
          <div className="bg-stone-200/80 rounded-full px-3 py-1.5">
            <span className="text-[12px] font-semibold text-stone-500 tabular-nums">{logs.data?.length ?? 0} events</span>
          </div>
        </div>

        <div className="divide-y divide-stone-100/70">
          {displayLogs?.map((log) => {
            const time = new Date(log.created_at)
            const cfg = EVENT_CFG[log.event] ?? EVENT_CFG.camera_on
            return (
              <div key={log.id} className="flex items-center gap-5 px-7 py-4">
                <div className="shrink-0 w-9 h-9 rounded-2xl flex items-center justify-center" style={{ background: cfg.iconBg }}>
                  {cfg.iconEl}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <span className="text-[15px] font-semibold text-stone-800">{cfg.label}</span>
                    {log.face_label && (
                      <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[12px] font-medium ${
                        log.face_label === 'Unknown' ? 'bg-stone-100 text-stone-400' : 'bg-violet-50 text-violet-600'
                      }`}>
                        <span className={`w-1 h-1 rounded-full ${log.face_label === 'Unknown' ? 'bg-stone-300' : 'bg-violet-400'}`} />
                        {log.face_label}
                      </div>
                    )}
                  </div>
                  <div className="text-[13px] text-stone-400">{log.note ?? cfg.label}</div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-mono text-[14px] text-stone-400 tabular-nums">
                    {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                  </div>
                  <div className="text-[11px] text-stone-300 mt-0.5">
                    {time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {(logs.data?.length ?? 0) > 6 && (
          <div className="px-7 py-3.5 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between">
            <span className="text-[12px] font-medium text-stone-400">
              Showing {displayLogs?.length ?? 0} of {logs.data?.length ?? 0} events
            </span>
            <button onClick={() => setShowAll((v) => !v)} className="inline-flex items-center gap-1 text-[12px] font-bold text-[#C8601F]/60 tracking-wide uppercase">
              {showAll ? 'Show less' : 'View all'}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
