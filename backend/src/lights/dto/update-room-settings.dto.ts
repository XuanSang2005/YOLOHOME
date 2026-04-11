import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateRoomSettingsDto {
  @ApiPropertyOptional({ minimum: 0, maximum: 100, example: 80 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  brightness?: number

  @ApiPropertyOptional({ enum: ['warm', 'neutral', 'cool'], example: 'warm' })
  @IsOptional()
  @IsIn(['warm', 'neutral', 'cool'])
  color_temp?: 'warm' | 'neutral' | 'cool'
}
