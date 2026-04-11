import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { HealthModule } from './health/health.module'
import { DevicesModule } from './devices/devices.module'
import { LightsModule } from './lights/lights.module'
import { TemperatureModule } from './temperature/temperature.module'
import { CameraModule } from './camera/camera.module'
import { PowerModule } from './power/power.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    HealthModule,
    DevicesModule,
    LightsModule,
    TemperatureModule,
    CameraModule,
    PowerModule,
  ],
})
export class AppModule {}
