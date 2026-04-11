import { Module } from '@nestjs/common'
import { PowerController } from './controllers/power.controller'
import { PowerService } from './services/power.service'
import { PowerRepository } from './repositories/power.repository'

@Module({
  controllers: [PowerController],
  providers: [PowerService, PowerRepository],
})
export class PowerModule {}
