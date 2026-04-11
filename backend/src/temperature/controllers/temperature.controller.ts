import { Controller, Get } from '@nestjs/common'
import { TemperatureService } from '../services/temperature.service'

@Controller('temperature')
export class TemperatureController {
  constructor(private readonly temperatureService: TemperatureService) {}

  @Get('logs')
  getLogs() {
    return this.temperatureService.getLogs()
  }

  @Get('current')
  getCurrent() {
    return this.temperatureService.getCurrentReading()
  }
}
