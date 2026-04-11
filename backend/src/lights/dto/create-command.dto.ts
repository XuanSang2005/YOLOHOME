import { IsEnum } from 'class-validator'

export class CreateCommandDto {
  @IsEnum(['on', 'off'])
  command!: 'on' | 'off'
}
