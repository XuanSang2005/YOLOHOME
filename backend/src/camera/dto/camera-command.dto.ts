import { IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CameraCommandDto {
  @ApiProperty({ enum: ['on', 'off'], example: 'on' })
  @IsEnum(['on', 'off'])
  command!: 'on' | 'off'
}
