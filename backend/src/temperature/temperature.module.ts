import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TemperatureController } from './controllers/temperature.controller'
import { TemperatureService } from './services/temperature.service'
import { TemperatureRepository } from './repositories/temperature.repository'
import { TemperatureLog, TemperatureLogSchema } from './schemas/temperature-log.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: TemperatureLog.name, schema: TemperatureLogSchema }])],
  controllers: [TemperatureController],
  providers: [TemperatureService, TemperatureRepository],
})
export class TemperatureModule {}
