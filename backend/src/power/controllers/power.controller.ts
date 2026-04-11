import { Controller, Get } from '@nestjs/common'
import { PowerService } from '../services/power.service'

@Controller('power')
export class PowerController {
  constructor(private readonly powerService: PowerService) {}

  @Get('history')
  getHistory() {
    return this.powerService.getHistory()
  }
}
