import cameraImg from '../../assets/camera.png'
import Webcam from 'react-webcam'
import * as faceapi from 'face-api.js'
import { useEffect, useRef, useState } from 'react'
import { KNOWN_FACES } from '../../constants/knownFaces'

const MODEL_URL = '/models'

export function CameraPreview({
  isActive,
  name,
  room,
  onRecognize,
}: {
  isActive: boolean
  name?: string
  room?: string
  onRecognize?: (authorized: 0 | 1, label: string) => void
}) {
  const webcamRef    = useRef<Webcam>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null)
  const labeledRef   = useRef<faceapi.LabeledFaceDescriptors[]>([])
  const onRecognizeRef = useRef(onRecognize)
  const [modelsReady, setModelsReady] = useState(false)
  const [aiStatus,    setAiStatus]    = useState('Đang tải model...')

  // Giữ callback luôn mới nhất mà không trigger re-run effect
  useEffect(() => { onRecognizeRef.current = onRecognize }, [onRecognize])

  // Load model + ảnh known faces — chỉ chạy 1 lần
  useEffect(() => {
    let cancelled = false
    async function init() {
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ])
        if (cancelled) return
        setAiStatus('Đang load khuôn mặt...')

        const descriptors: faceapi.LabeledFaceDescriptors[] = []
        for (const [personName, imgPath] of Object.entries(KNOWN_FACES)) {
          try {
            const img = await faceapi.fetchImage(imgPath)
            const det = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
            if (det) descriptors.push(new faceapi.LabeledFaceDescriptors(personName, [det.descriptor]))
          } catch {
            console.warn(`Không load được ảnh: ${personName}`)
          }
        }
        if (!cancelled) {
          labeledRef.current = descriptors
          setModelsReady(true)
          setAiStatus(`Face ID: ${descriptors.length} người`)
        }
      } catch (e) {
        if (!cancelled) setAiStatus('Lỗi load model AI')
        console.error(e)
      }
    }
    init()
    return () => { cancelled = true }
  }, [])

  // Vòng lặp nhận diện — chạy khi camera bật và model sẵn sàng
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (!isActive || !modelsReady) return

    intervalRef.current = setInterval(async () => {
      const video  = webcamRef.current?.video
      const canvas = canvasRef.current
      if (!video || video.readyState !== 4 || !canvas) return

      const displaySize = { width: video.offsetWidth, height: video.offsetHeight }
      canvas.width  = displaySize.width
      canvas.height = displaySize.height

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 }))
        .withFaceLandmarks()
        .withFaceDescriptors()

      const resized = faceapi.resizeResults(detections, displaySize)
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const matcher = labeledRef.current.length > 0
        ? new faceapi.FaceMatcher(labeledRef.current, 0.5)
        : null

      for (const det of resized) {
        const { x, y, width, height } = det.detection.box
        const match      = matcher?.findBestMatch(det.descriptor)
        const isKnown    = match ? match.label !== 'unknown' : false
        const label      = isKnown ? match!.label : 'Unknown'
        const authorized: 0 | 1 = isKnown ? 1 : 0
        const color      = isKnown ? '#10b981' : '#ef4444'

        ctx.strokeStyle = color
        ctx.lineWidth   = 2
        ctx.strokeRect(x, y, width, height)
        ctx.fillStyle = color + 'dd'
        ctx.fillRect(x, y - 26, width, 26)
        ctx.fillStyle = '#fff'
        ctx.font = 'bold 13px ui-monospace, monospace'
        ctx.fillText(label, x + 6, y - 8)

        onRecognizeRef.current?.(authorized, label)
      }
    }, 3000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      const ctx = canvasRef.current?.getContext('2d')
      if (ctx && canvasRef.current) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  }, [isActive, modelsReady])

  return (
    <div
      className="rounded-3xl overflow-hidden relative"
      style={{
        background: 'linear-gradient(160deg, #141418 0%, #0e0e12 60%, #111116 100%)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.22), 0 1px 4px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.04)',
        minHeight: 340,
      }}
    >
      {/* Webcam stream */}
      {isActive && (
        <Webcam
          ref={webcamRef}
          audio={false}
          mirrored={true}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Canvas nhận diện — scaleX(-1) để khớp với webcam mirrored */}
      {isActive && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ transform: 'scaleX(-1)' }}
        />
      )}

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.35) 100%)' }} />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)' }} />

      {/* Green glow khi active */}
      {isActive && (
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.04) 0%, transparent 60%)' }} />
      )}

      {/* Offline state */}
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

      {/* Top-left: LIVE badge + tên camera */}
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

      {/* Top-right: resolution + AI status */}
      <div className="absolute top-5 right-6 flex items-center gap-2">
        <div className="rounded-lg px-2.5 py-1.5" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(6px)' }}>
          <span className="text-[12px] font-semibold" style={{ color: 'rgba(255,255,255,0.40)' }}>1080p</span>
        </div>
        {isActive && (
          <div className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
            style={{ background: modelsReady ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)', backdropFilter: 'blur(6px)' }}>
            <div className={`w-1.5 h-1.5 rounded-full ${modelsReady ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
            <span className={`text-[12px] font-semibold ${modelsReady ? 'text-emerald-400' : 'text-amber-400'}`}>
              {aiStatus}
            </span>
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
