import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { TemperatureService } from '../services/temperature.service'
import { CreateTemperatureLogDto } from '../dto/create-temperature-log.dto'
import { ResponseMessage } from '../../common/decorators/response-message.decorator'

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

  @Post('logs')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Log created')
  createLog(@Body() dto: CreateTemperatureLogDto) {
    return this.temperatureService.createLog(dto)
  }
}
