import { IsEnum, IsString, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CameraRecognizeDto {
  @ApiProperty({ enum: [0, 1], example: 1, description: '1 = người được phép, 0 = không nhận ra' })
  @IsEnum([0, 1])
  authorized!: 0 | 1

  @ApiProperty({ example: 'Nguyen Van A', description: 'Tên người nhận ra, hoặc "Unknown"' })
  @IsString()
  face_label!: string

  @ApiProperty({ example: 3, description: 'ID thiết bị camera' })
  @IsNumber()
  device_id!: number
}
