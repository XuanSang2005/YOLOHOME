import {
  IsString,
  IsEnum,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export enum DeviceType {
  LIGHT = 'light',
  SENSOR = 'sensor',
  CAMERA = 'camera',
  GATE = 'gate',
}

export enum DeviceRoom {
  LIVING_ROOM = 'Living Room',
  BEDROOM = 'Bedroom',
  KITCHEN = 'Kitchen',
  FRONT_DOOR = 'Front Door',
}

export class CreateDeviceDto {
  @ApiProperty({ example: 'Living Room Light', minLength: 2, maxLength: 50 })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string

  @ApiProperty({ enum: DeviceType, example: DeviceType.LIGHT })
  @IsEnum(DeviceType)
  type!: DeviceType

  @ApiProperty({ enum: DeviceRoom, example: DeviceRoom.LIVING_ROOM })
  @IsEnum(DeviceRoom)
  room!: DeviceRoom

  @ApiPropertyOptional({ example: '192.168.1.10', description: 'IP address của thiết bị' })
  @IsOptional()
  @IsString()
  @Matches(/^(\d{1,3}\.){3}\d{1,3}$/, { message: 'Invalid IP address' })
  ip_address?: string

  @ApiPropertyOptional({ enum: ['on', 'off'], example: 'on' })
  @IsOptional()
  @IsEnum(['on', 'off'])
  status?: 'on' | 'off'
}
