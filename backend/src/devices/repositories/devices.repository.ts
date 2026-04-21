import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Device, type DeviceDocument } from '../schemas/device.schema'
import type { CreateDeviceDto } from '../dto/create-device.dto'
import { DeviceType } from '../dto/create-device.dto'

@Injectable()
export class DevicesRepository implements OnModuleInit {
  constructor(@InjectModel(Device.name) private readonly model: Model<DeviceDocument>) {}

  async onModuleInit() {
    const count = await this.model.countDocuments()
    if (count === 0) {
      await this.model.insertMany([
        { name: 'Living Room Light', type: 'light',  room: 'Living Room', status: 'on',     ip_address: '192.168.1.10', last_seen_at: '2026-04-08T14:30:00' },
        { name: 'Temperature Sensor', type: 'sensor', room: 'Living Room', status: 'active', ip_address: '192.168.1.11', last_seen_at: '2026-04-08T14:30:00' },
        { name: 'Front Door Webcam',  type: 'camera', room: 'Front Door',  status: 'active', ip_address: '192.168.1.12', last_seen_at: '2026-04-08T14:30:00' },
        { name: 'Bedroom Light',      type: 'light',  room: 'Bedroom',     status: 'off',    ip_address: '192.168.1.13', last_seen_at: '2026-04-08T14:30:00' },
        { name: 'Kitchen Light',      type: 'light',  room: 'Kitchen',     status: 'on',     ip_address: '192.168.1.14', last_seen_at: '2026-04-08T14:30:00' },
        { name: 'Front Gate',         type: 'gate',   room: 'Front Door',  status: 'closed', ip_address: '192.168.1.15', last_seen_at: '2026-04-08T14:30:00' },
      ])
    }
  }

  findAll(type?: DeviceType) {
    return type ? this.model.find({ type }) : this.model.find()
  }

  findById(id: string) {
    return this.model.findById(id)
  }

  create(dto: CreateDeviceDto) {
    return this.model.create({
      name: dto.name,
      type: dto.type,
      room: dto.room,
      status: dto.status ?? 'off',
      ip_address: dto.ip_address ?? '',
      last_seen_at: new Date().toISOString(),
    })
  }

  updateGateStatus(status: 'open' | 'closed') {
    return this.model.findOneAndUpdate(
      { type: 'gate' },
      { status, last_seen_at: new Date().toISOString() },
      { new: true },
    )
  }
}
