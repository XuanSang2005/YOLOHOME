import { IsEnum } from 'class-validator'

export class CameraCommandDto {
  @IsEnum(['on', 'off'])
  command!: 'on' | 'off'
}
