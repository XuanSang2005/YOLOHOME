import {
  IsString,
  IsEnum,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator'

export enum DeviceType {
  LIGHT = 'light',
  SENSOR = 'sensor',
  CAMERA = 'camera',
}

export enum DeviceRoom {
  LIVING_ROOM = 'Living Room',
  BEDROOM = 'Bedroom',
  KITCHEN = 'Kitchen',
  FRONT_DOOR = 'Front Door',
}

export class CreateDeviceDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string

  @IsEnum(DeviceType)
  type!: DeviceType

  @IsEnum(DeviceRoom)
  room!: DeviceRoom

  @IsOptional()
  @IsString()
  @Matches(/^(\d{1,3}\.){3}\d{1,3}$/, { message: 'Invalid IP address' })
  ip_address?: string

  @IsOptional()
  @IsEnum(['on', 'off'])
  status?: 'on' | 'off'
}
