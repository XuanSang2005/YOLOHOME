import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { deviceSchema, DEVICE_TYPES, DEVICE_ROOMS, type DeviceFormValues } from '../../schemas/deviceSchema'
import { FormField } from './FormField'

const inputCls = (invalid: boolean) =>
  `w-full px-3.5 py-2.5 rounded-xl border text-[14px] text-stone-800 bg-white outline-none transition-colors
  ${invalid
    ? 'border-red-300 focus:border-red-400'
    : 'border-stone-200 focus:border-stone-400'
  }`

const TYPE_LABELS: Record<string, string> = {
  light: 'Light',
  sensor: 'Sensor',
  camera: 'Camera',
}

interface Props {
  defaultValues?: Partial<DeviceFormValues>
  onSubmit: (data: DeviceFormValues) => void
  onCancel: () => void
}

export function DeviceForm({ defaultValues, onSubmit, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DeviceFormValues>({
    resolver: zodResolver(deviceSchema),
    defaultValues: {
      name: '',
      type: 'light',
      room: 'Living Room',
      ip_address: '',
      status: 'off',
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormField label="Device Name" error={errors.name?.message}>
        <input
          {...register('name')}
          className={inputCls(!!errors.name)}
          placeholder="e.g. Living Room Light"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Type" error={errors.type?.message}>
          <select {...register('type')} className={inputCls(!!errors.type)}>
            {DEVICE_TYPES.map((t) => (
              <option key={t} value={t}>{TYPE_LABELS[t]}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Status" error={errors.status?.message}>
          <select {...register('status')} className={inputCls(!!errors.status)}>
            <option value="off">Off</option>
            <option value="on">On</option>
          </select>
        </FormField>
      </div>

      <FormField label="Room" error={errors.room?.message}>
        <select {...register('room')} className={inputCls(!!errors.room)}>
          {DEVICE_ROOMS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </FormField>

      <FormField label="IP Address (optional)" error={errors.ip_address?.message}>
        <input
          {...register('ip_address')}
          className={inputCls(!!errors.ip_address)}
          placeholder="192.168.1.10"
        />
      </FormField>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl text-[14px] font-semibold text-stone-500 bg-stone-100 hover:bg-stone-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-2.5 rounded-xl text-[14px] font-semibold text-white transition-colors disabled:opacity-50"
          style={{ background: '#C8601F' }}
        >
          {isSubmitting ? 'Saving…' : 'Save Device'}
        </button>
      </div>
    </form>
  )
}
