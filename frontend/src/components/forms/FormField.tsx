import type { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  error?: string
  children: ReactNode
}

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-semibold text-stone-500 uppercase tracking-[0.1em]">
        {label}
      </label>
      {children}
      {error && (
        <span className="text-[12px] text-red-500 font-medium">{error}</span>
      )}
    </div>
  )
}
