import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly config: ConfigService) {}

  @ApiOperation({ summary: 'Kiểm tra trạng thái server' })
  @Get()
  check() {
    return {
      status: 'ok',
      service: this.config.get<string>('APP_NAME', 'YoloHome API'),
      environment: this.config.get<string>('NODE_ENV', 'development'),
      timestamp: new Date().toISOString(),
    }
  }
}
