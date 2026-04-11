import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class UpdateRoomSettingsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  brightness?: number

  @IsOptional()
  @IsIn(['warm', 'neutral', 'cool'])
  color_temp?: 'warm' | 'neutral' | 'cool'
}
