import { IsIn } from 'class-validator'

export class RoomCommandDto {
  @IsIn(['on', 'off'])
  command!: 'on' | 'off'
}
