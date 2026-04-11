import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type TemperatureLogDocument = HydratedDocument<TemperatureLog>

@Schema({
  collection: 'temperature_logs',
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: (_doc, ret: Record<string, unknown>) => {
      delete ret._id
      return ret
    },
  },
})
export class TemperatureLog {
  @Prop({ required: true, type: Number })
  device_id!: number

  @Prop({ required: true })
  temperature!: number

  @Prop({ required: true })
  humidity!: number

  @Prop({ type: Number, default: null })
  light_intensity!: number | null

  @Prop({ type: Number, default: null })
  air_quality!: number | null

  @Prop({ default: () => new Date().toISOString() })
  created_at!: string
}

export const TemperatureLogSchema = SchemaFactory.createForClass(TemperatureLog)
