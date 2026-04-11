import { Injectable } from '@nestjs/common'
import type { PowerHistory } from '../interfaces/power-history.interface'

const BARS = [
  0, 0, 0.2, 0.4, 0, 0, 0.6, 1, 0.8, 1, 0.6, 0.4,
  0, 0, 0.3, 0.7, 1, 1, 0.9, 0.5, 0, 0, 0.4, 0.8,
  1, 1, 0.7, 0.3, 0, 0.5, 0.9, 1, 0.8, 0.6, 0.4, 1,
]
const WATTAGE = 0.06

@Injectable()
export class PowerRepository {
  private readonly history: PowerHistory = {
    bars: BARS,
    total_kwh: parseFloat(
      BARS.reduce((s, v) => s + v * (5 / 60) * WATTAGE, 0).toFixed(2),
    ),
    trend: '+7.8%',
    time_start: '10:00',
    time_end: '13:00',
  }

  getHistory(): PowerHistory {
    return this.history
  }
}
