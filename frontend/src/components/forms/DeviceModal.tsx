import { useEffect } from 'react'
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full max-w-md rounded-3xl p-7 flex flex-col gap-5"
        style={{
          background: '#ffffff',
          boxShadow: '0 8px 40px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.08)',
        }}
      >
        <div>
          <h2 className="text-[20px] font-semibold text-stone-900 tracking-tight">Add Device</h2>
          <p className="text-[13px] text-stone-400 mt-0.5">Register a new device to your home network</p>
        </div>

        <DeviceForm
          onSubmit={(data) => { onSave(data); onClose() }}
          onCancel={onClose}
        />
      </div>
    </div>
  )
}
