import { z } from 'zod'

export const DEVICE_TYPES = ['light', 'sensor', 'camera'] as const
export const DEVICE_ROOMS = ['Living Room', 'Bedroom', 'Kitchen', 'Front Door'] as const

export const deviceSchema = z.object({
  name: z
    .string()
    .min(2, 'At least 2 characters')
    .max(50, 'Max 50 characters'),
  type: z.enum(DEVICE_TYPES),
  room: z.enum(DEVICE_ROOMS),
  ip_address: z
    .string()
    .regex(/^(\d{1,3}\.){3}\d{1,3}$/, 'Invalid IP address (e.g. 192.168.1.10)')
    .or(z.literal(''))
    .optional(),
  status: z.enum(['on', 'off']),
})

export type DeviceFormValues = z.infer<typeof deviceSchema>
