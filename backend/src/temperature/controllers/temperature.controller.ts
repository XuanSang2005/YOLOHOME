import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { TemperatureService } from '../services/temperature.service'
import { CreateTemperatureLogDto } from '../dto/create-temperature-log.dto'
import { ResponseMessage } from '../../common/decorators/response-message.decorator'

@ApiTags('Temperature')
@Controller('temperature')
export class TemperatureController {
  constructor(private readonly temperatureService: TemperatureService) {}

  @ApiOperation({ summary: 'Lấy lịch sử đo nhiệt độ / độ ẩm' })
  @Get('logs')
  getLogs() {
    return this.temperatureService.getLogs()
  }

  @ApiOperation({ summary: 'Lấy chỉ số mới nhất từ cảm biến' })
  @Get('current')
  getCurrent() {
    return this.temperatureService.getCurrentReading()
  }

  @ApiOperation({ summary: 'ESP32 gửi dữ liệu cảm biến lên backend' })
  @Post('logs')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Log created')
  createLog(@Body() dto: CreateTemperatureLogDto) {
    return this.temperatureService.createLog(dto)
  }
}
