import { Injectable } from '@nestjs/common'
import { TemperatureRepository } from '../repositories/temperature.repository'

@Injectable()
export class TemperatureService {
  constructor(private readonly repository: TemperatureRepository) {}

  getLogs() {
    return this.repository.findAll()
  }

  getCurrentReading() {
    return this.repository.findLatest()
  }
}
