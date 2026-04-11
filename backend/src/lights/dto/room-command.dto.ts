import { IsIn } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RoomCommandDto {
  @ApiProperty({ enum: ['on', 'off'], example: 'on' })
  @IsIn(['on', 'off'])
  command!: 'on' | 'off'
}
