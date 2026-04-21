import cameraImg from '../../assets/camera.png'
import Webcam from 'react-webcam' // 1. IMPORT THƯ VIỆN WEBCAM

export function CameraPreview({ isActive, name, room }: { isActive: boolean; name?: string; room?: string }) {
  return (
    <div
      className="rounded-3xl overflow-hidden relative"
      style={{
        background: 'linear-gradient(160deg, #141418 0%, #0e0e12 60%, #111116 100%)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.22), 0 1px 4px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.04)',
        minHeight: 340,
      }}
    >
      {/* 2. CẤY WEBCAM VÀO DƯỚI CÙNG ĐỂ NÓ LÀM NỀN */}
      {isActive && (
        <Webcam
          audio={false}
          mirrored={true} // Lật hình như soi gương nhìn cho thuận mắt
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Lớp hiệu ứng tối mờ ở các góc */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.35) 100%)' }} />

      {/* Lớp hiệu ứng nhiễu sóng (Scanlines) sọc sọc */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)' }} />

      {/* Ánh sáng xanh nhè nhẹ tỏa ra từ trên xuống khi bật */}
      {isActive && (
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.04) 0%, transparent 60%)' }} />
      )}

      {/* 3. ẨN ICON CHÍNH GIỮA NẾU CAMERA ĐANG BẬT (ĐỂ KHÔNG CHE MẶT) */}
      {!isActive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <img src={cameraImg} className="w-8 h-8 object-contain" style={{ opacity: 0.22 }} />
          </div>
          <span className="text-[14px] font-medium tracking-wide" style={{ color: 'rgba(255,255,255,0.18)' }}>
            Camera offline
          </span>
        </div>
      )}

      {/* Top-left: LIVE + camera label */}
      <div className="absolute top-5 left-6 flex items-center gap-3">
        {isActive ? (
          <div className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
            style={{ background: 'rgba(239,68,68,0.85)', backdropFilter: 'blur(6px)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[12px] font-bold text-white uppercase tracking-widest">Live</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
            style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(6px)' }}>
            <span className="text-[12px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>Offline</span>
          </div>
        )}
        <div className="rounded-lg px-2.5 py-1.5" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(6px)' }}>
          <span className="text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.55)' }}>{name ?? 'Camera'}</span>
        </div>
      </div>

      {/* Top-right: resolution + motion */}
      <div className="absolute top-5 right-6 flex items-center gap-2">
        <div className="rounded-lg px-2.5 py-1.5" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(6px)' }}>
          <span className="text-[12px] font-semibold" style={{ color: 'rgba(255,255,255,0.40)' }}>1080p</span>
        </div>
        {isActive && (
          <div className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5" style={{ background: 'rgba(16,185,129,0.12)', backdropFilter: 'blur(6px)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[12px] font-semibold text-emerald-400">Motion detect ON</span>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-4"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[13px] tabular-nums" style={{ color: 'rgba(255,255,255,0.28)' }}>
            {new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
            {' '}
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
          </span>
          <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.20)' }}>{room ?? 'Front Door'}</span>
        </div>
        {isActive && (
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[12px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>Rec</span>
          </div>
        )}
      </div>
    </div>
  )
}
