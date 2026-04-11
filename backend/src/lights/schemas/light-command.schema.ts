import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type LightCommandDocument = HydratedDocument<LightCommand>

@Schema({
  collection: 'light_commands',
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: (_doc, ret: Record<string, unknown>) => {
      delete ret._id
      return ret
    },
  },
})
export class LightCommand {
  @Prop({ required: true, type: Number })
  device_id!: number

  @Prop({ required: true })
  device_name!: string

  @Prop({ required: true, enum: ['on', 'off'] })
  command!: 'on' | 'off'

  @Prop({ default: false })
  executed!: boolean

  @Prop({ type: String, default: null })
  executed_at!: string | null

  @Prop({ default: () => new Date().toISOString() })
  created_at!: string
}

export const LightCommandSchema = SchemaFactory.createForClass(LightCommand)
