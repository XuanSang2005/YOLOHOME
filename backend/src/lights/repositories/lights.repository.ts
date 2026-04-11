import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { LightCommand, type LightCommandDocument } from '../schemas/light-command.schema'
import { RoomSetting, type RoomSettingDocument } from '../schemas/room-setting.schema'
import type { UpdateRoomSettingsDto } from '../dto/update-room-settings.dto'

@Injectable()
export class LightsRepository implements OnModuleInit {
  constructor(
    @InjectModel(LightCommand.name) private readonly commandModel: Model<LightCommandDocument>,
    @InjectModel(RoomSetting.name) private readonly roomModel: Model<RoomSettingDocument>,
  ) {}

  async onModuleInit() {
    const [cmdCount, roomCount] = await Promise.all([
      this.commandModel.countDocuments(),
      this.roomModel.countDocuments(),
    ])

    if (cmdCount === 0) {
      await this.commandModel.insertMany([
        { device_id: 1, device_name: 'Living Room', command: 'on',  executed: true, executed_at: '2026-04-08T10:00:00', created_at: '2026-04-08T10:00:00' },
        { device_id: 1, device_name: 'Living Room', command: 'off', executed: true, executed_at: '2026-04-08T10:30:00', created_at: '2026-04-08T10:30:00' },
        { device_id: 1, device_name: 'Living Room', command: 'on',  executed: true, executed_at: '2026-04-08T10:50:00', created_at: '2026-04-08T10:50:00' },
        { device_id: 1, device_name: 'Living Room', command: 'off', executed: true, executed_at: '2026-04-08T11:00:00', created_at: '2026-04-08T11:00:00' },
        { device_id: 1, device_name: 'Living Room', command: 'on',  executed: true, executed_at: '2026-04-08T11:10:00', created_at: '2026-04-08T11:10:00' },
        { device_id: 1, device_name: 'Living Room', command: 'off', executed: true, executed_at: '2026-04-08T11:20:00', created_at: '2026-04-08T11:20:00' },
        { device_id: 1, device_name: 'Living Room', command: 'on',  executed: true, executed_at: '2026-04-08T11:30:00', created_at: '2026-04-08T11:30:00' },
        { device_id: 1, device_name: 'Living Room', command: 'off', executed: true, executed_at: '2026-04-08T11:40:00', created_at: '2026-04-08T11:40:00' },
        { device_id: 1, device_name: 'Living Room', command: 'on',  executed: true, executed_at: '2026-04-08T11:52:00', created_at: '2026-04-08T11:52:00' },
        { device_id: 1, device_name: 'Living Room', command: 'off', executed: true, executed_at: '2026-04-08T12:00:00', created_at: '2026-04-08T12:00:00' },
      ])
    }

    if (roomCount === 0) {
      await this.roomModel.insertMany([
        { room: 'Bedroom',     device_id: 4, is_on: false, brightness: 70,  color_temp: 'warm'    },
        { room: 'Living Room', device_id: 1, is_on: true,  brightness: 85,  color_temp: 'neutral' },
        { room: 'Kitchen',     device_id: 5, is_on: true,  brightness: 100, color_temp: 'cool'    },
      ])
    }
  }

  findAll() {
    return this.commandModel.find().sort({ created_at: -1 })
  }

  getRoomSettings() {
    return this.roomModel.find()
  }

  async updateRoomSettings(room: string, dto: UpdateRoomSettingsDto) {
    const update: Record<string, unknown> = {}
    if (dto.brightness !== undefined) update.brightness = dto.brightness
    if (dto.color_temp !== undefined) update.color_temp = dto.color_temp
    return this.roomModel.findOneAndUpdate({ room }, { $set: update }, { new: true })
  }

  async sendRoomCommand(room: string, command: 'on' | 'off') {
    const setting = await this.roomModel.findOneAndUpdate(
      { room },
      { $set: { is_on: command === 'on' } },
      { new: true },
    )
    if (!setting) return null
    return this.commandModel.create({
      device_id: setting.device_id,
      device_name: room,
      command,
      executed: false,
      executed_at: null,
      created_at: new Date().toISOString(),
    })
  }

  /** Backward-compat: Living Room toggle via old POST /lights/commands */
  create(command: 'on' | 'off') {
    return this.sendRoomCommand('Living Room', command)
  }
}
