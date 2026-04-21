import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type DeviceDocument = HydratedDocument<Device>

@Schema({
  collection: 'devices',
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: (_doc, ret: Record<string, unknown>) => {
      delete ret._id
      return ret
    },
  },
})
export class Device {
  @Prop({ required: true })
  name!: string

  @Prop({ required: true, enum: ['light', 'sensor', 'camera', 'gate'] })
  type!: string

  @Prop({ required: true })
  room!: string

  @Prop({ required: true, enum: ['on', 'off', 'active', 'inactive', 'open', 'closed'], default: 'off' })
  status!: string

  @Prop({ default: '' })
  ip_address!: string

  @Prop({ default: () => new Date().toISOString() })
  last_seen_at!: string
}

export const DeviceSchema = SchemaFactory.createForClass(Device)
