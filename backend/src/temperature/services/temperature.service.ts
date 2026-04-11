import { Injectable } from '@nestjs/common'
import { TemperatureRepository } from '../repositories/temperature.repository'
import type { CreateTemperatureLogDto } from '../dto/create-temperature-log.dto'

@Injectable()
export class TemperatureService {
  constructor(private readonly repository: TemperatureRepository) {}

  getLogs() {
    return this.repository.findAll()
  }

  getCurrentReading() {
    return this.repository.findLatest()
  }

  createLog(dto: CreateTemperatureLogDto) {
    return this.repository.createLog({ device_id: 2, ...dto })
  }
}
