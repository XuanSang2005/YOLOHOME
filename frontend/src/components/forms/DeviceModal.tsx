import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { DeviceForm } from './DeviceForm'
import type { DeviceFormValues } from '../../schemas/deviceSchema'

interface Props {
  open: boolean
  onClose: () => void
  onSave: (data: DeviceFormValues) => void
}

export function DeviceModal({ open, onClose, onSave }: Props) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full max-w-md rounded-3xl p-7 flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
        style={{
          background: '#ffffff',
          boxShadow: '0 8px 40px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.08)',
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[20px] font-semibold text-stone-900 tracking-tight">Add Device</h2>
            <p className="text-[13px] text-stone-400 mt-0.5">Register a new device to your home network</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors shrink-0 mt-0.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <DeviceForm
          onSubmit={(data) => { onSave(data); onClose() }}
          onCancel={onClose}
        />
      </div>
    </div>,
    document.body
  )
}
