import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DevicesController } from './controllers/devices.controller'
import { DevicesService } from './services/devices.service'
import { DevicesRepository } from './repositories/devices.repository'
import { Device, DeviceSchema } from './schemas/device.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }])],
  controllers: [DevicesController],
  providers: [DevicesService, DevicesRepository],
  exports: [DevicesRepository],
})
export class DevicesModule {}
