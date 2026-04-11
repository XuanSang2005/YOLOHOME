import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { TemperatureLog, type TemperatureLogDocument } from '../schemas/temperature-log.schema'

@Injectable()
export class TemperatureRepository implements OnModuleInit {
  constructor(
    @InjectModel(TemperatureLog.name) private readonly model: Model<TemperatureLogDocument>,
  ) {}

  async onModuleInit() {
    const count = await this.model.countDocuments()
    if (count === 0) {
      await this.model.insertMany([
        { device_id: 2, temperature: 20.8, humidity: 62, light_intensity: 120, air_quality: 88, created_at: '2026-04-08T23:00:00' },
        { device_id: 2, temperature: 21.2, humidity: 63, light_intensity: 80,  air_quality: 87, created_at: '2026-04-08T22:00:00' },
        { device_id: 2, temperature: 21.8, humidity: 61, light_intensity: 150, air_quality: 86, created_at: '2026-04-08T21:00:00' },
        { device_id: 2, temperature: 22.5, humidity: 60, light_intensity: 220, air_quality: 84, created_at: '2026-04-08T20:00:00' },
        { device_id: 2, temperature: 23.0, humidity: 62, light_intensity: 310, air_quality: 83, created_at: '2026-04-08T19:00:00' },
        { device_id: 2, temperature: 23.8, humidity: 64, light_intensity: 380, air_quality: 82, created_at: '2026-04-08T18:00:00' },
        { device_id: 2, temperature: 24.2, humidity: 66, light_intensity: 420, air_quality: 80, created_at: '2026-04-08T17:00:00' },
        { device_id: 2, temperature: 25.0, humidity: 65, light_intensity: 480, air_quality: 81, created_at: '2026-04-08T16:00:00' },
        { device_id: 2, temperature: 25.5, humidity: 63, light_intensity: 520, air_quality: 79, created_at: '2026-04-08T15:00:00' },
        { device_id: 2, temperature: 25.8, humidity: 62, light_intensity: 560, air_quality: 78, created_at: '2026-04-08T14:00:00' },
        { device_id: 2, temperature: 25.2, humidity: 64, light_intensity: 580, air_quality: 80, created_at: '2026-04-08T13:00:00' },
        { device_id: 2, temperature: 24.5, humidity: 66, light_intensity: 600, air_quality: 82, created_at: '2026-04-08T12:00:00' },
        { device_id: 2, temperature: 23.8, humidity: 68, light_intensity: 580, air_quality: 84, created_at: '2026-04-08T11:00:00' },
        { device_id: 2, temperature: 22.8, humidity: 70, light_intensity: 520, air_quality: 86, created_at: '2026-04-08T10:00:00' },
        { device_id: 2, temperature: 22.0, humidity: 72, light_intensity: 440, air_quality: 88, created_at: '2026-04-08T09:00:00' },
        { device_id: 2, temperature: 21.5, humidity: 74, light_intensity: 320, air_quality: 90, created_at: '2026-04-08T08:00:00' },
        { device_id: 2, temperature: 21.0, humidity: 73, light_intensity: 200, air_quality: 91, created_at: '2026-04-08T07:00:00' },
        { device_id: 2, temperature: 20.5, humidity: 72, light_intensity: 120, air_quality: 92, created_at: '2026-04-08T06:00:00' },
        { device_id: 2, temperature: 20.2, humidity: 71, light_intensity: 60,  air_quality: 91, created_at: '2026-04-08T05:00:00' },
        { device_id: 2, temperature: 20.0, humidity: 70, light_intensity: 30,  air_quality: 90, created_at: '2026-04-08T04:00:00' },
        { device_id: 2, temperature: 20.5, humidity: 69, light_intensity: 20,  air_quality: 89, created_at: '2026-04-08T03:00:00' },
        { device_id: 2, temperature: 21.2, humidity: 68, light_intensity: 15,  air_quality: 88, created_at: '2026-04-08T02:00:00' },
        { device_id: 2, temperature: 22.0, humidity: 66, light_intensity: 10,  air_quality: 87, created_at: '2026-04-08T01:00:00' },
        { device_id: 2, temperature: 22.5, humidity: 65, light_intensity: 5,   air_quality: 86, created_at: '2026-04-08T00:00:00' },
      ])
    }
  }

  findAll() {
    return this.model.find().sort({ created_at: -1 })
  }

  findLatest() {
    return this.model.findOne().sort({ created_at: -1 })
  }

  createLog(data: { device_id: number; temperature: number; humidity: number; light_intensity?: number; air_quality?: number }) {
    return this.model.create({
      ...data,
      created_at: new Date().toISOString(),
    })
  }
}
