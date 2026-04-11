import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type RoomSettingDocument = HydratedDocument<RoomSetting>

@Schema({
  collection: 'room_settings',
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: (_doc, ret: Record<string, unknown>) => {
      delete ret._id
      return ret
    },
  },
})
export class RoomSetting {
  @Prop({ required: true, unique: true })
  room!: string

  @Prop({ required: true, type: Number })
  device_id!: number

  @Prop({ default: false })
  is_on!: boolean

  @Prop({ default: 80, min: 0, max: 100 })
  brightness!: number

  @Prop({ default: 'neutral', enum: ['warm', 'neutral', 'cool'] })
  color_temp!: string
}

export const RoomSettingSchema = SchemaFactory.createForClass(RoomSetting)
