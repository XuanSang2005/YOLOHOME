import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CameraLog, type CameraLogDocument } from '../schemas/camera-log.schema'

@Injectable()
export class CameraRepository implements OnModuleInit {
  constructor(
    @InjectModel(CameraLog.name) private readonly model: Model<CameraLogDocument>,
  ) {}

  async onModuleInit() {
    const count = await this.model.countDocuments()
    if (count === 0) {
      await this.model.insertMany([
        { user_id: null, device_id: 3, event: 'camera_on',     face_label: null,            note: 'Camera turned on',   created_at: '2026-04-08T08:00:00' },
        { user_id: 1,    device_id: 3, event: 'face_detected', face_label: 'Unknown',       note: 'Unknown person',     created_at: '2026-04-08T11:30:00' },
        { user_id: null, device_id: 3, event: 'camera_off',    face_label: null,            note: 'Camera turned off',  created_at: '2026-04-08T12:00:00' },
        { user_id: null, device_id: 3, event: 'camera_on',     face_label: null,            note: 'Camera turned on',   created_at: '2026-04-08T14:00:00' },
        { user_id: 1,    device_id: 3, event: 'face_detected', face_label: 'Nguyen Van A',  note: 'Front door',         created_at: '2026-04-08T14:30:00' },
      ])
    }
  }

  findAll() {
    return this.model.find().sort({ created_at: -1 })
  }

  async createLog(command: 'on' | 'off') {
    return this.model.create({
      user_id: null,
      device_id: 3,
      event: command === 'on' ? 'camera_on' : 'camera_off',
      face_label: null,
      note: command === 'on' ? 'Camera turned on' : 'Camera turned off',
      created_at: new Date().toISOString(),
    })
  }
}
