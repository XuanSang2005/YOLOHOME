import { IsNumber, IsOptional, Min, Max } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateTemperatureLogDto {
  @Type(() => Number)
  @IsNumber()
  @Min(-40)
  @Max(100)
  temperature!: number

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  humidity!: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  light_intensity?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  air_quality?: number
}
