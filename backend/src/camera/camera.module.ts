import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CameraController } from './controllers/camera.controller'
import { CameraService } from './services/camera.service'
import { CameraRepository } from './repositories/camera.repository'
import { CameraLog, CameraLogSchema } from './schemas/camera-log.schema'
import { DevicesModule } from '../devices/devices.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CameraLog.name, schema: CameraLogSchema }]),
    DevicesModule,
  ],
  controllers: [CameraController],
  providers: [CameraService, CameraRepository],
})
export class CameraModule {}
