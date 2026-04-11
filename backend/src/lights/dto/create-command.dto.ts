import { IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCommandDto {
  @ApiProperty({ enum: ['on', 'off'], example: 'on' })
  @IsEnum(['on', 'off'])
  command!: 'on' | 'off'
}
