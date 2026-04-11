import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type CameraLogDocument = HydratedDocument<CameraLog>

@Schema({
  collection: 'camera_logs',
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: (_doc, ret: Record<string, unknown>) => {
      delete ret._id
      return ret
    },
  },
})
export class CameraLog {
  @Prop({ type: Number, default: null })
  user_id!: number | null

  @Prop({ type: Number, default: null })
  device_id!: number | null

  @Prop({ required: true, enum: ['camera_on', 'camera_off', 'face_detected'] })
  event!: 'camera_on' | 'camera_off' | 'face_detected'

  @Prop({ type: String, default: null })
  face_label!: string | null

  @Prop({ type: String, default: null })
  note!: string | null

  @Prop({ default: () => new Date().toISOString() })
  created_at!: string
}

export const CameraLogSchema = SchemaFactory.createForClass(CameraLog)
