import { Injectable } from '@nestjs/common'
import { PowerRepository } from '../repositories/power.repository'

@Injectable()
export class PowerService {
  constructor(private readonly repository: PowerRepository) {}

  getHistory() {
    return this.repository.getHistory()
  }
}
