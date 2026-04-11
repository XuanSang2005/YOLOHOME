import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { PowerService } from '../services/power.service'

@ApiTags('Power')
@Controller('power')
export class PowerController {
  constructor(private readonly powerService: PowerService) {}

  @ApiOperation({ summary: 'Lấy lịch sử tiêu thụ điện năng theo tuần' })
  @Get('history')
  getHistory() {
    return this.powerService.getHistory()
  }
}
