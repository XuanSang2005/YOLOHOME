import { IsNumber, IsOptional, Min, Max } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateTemperatureLogDto {
  @ApiProperty({ example: 25.5, minimum: -40, maximum: 100, description: 'Nhiệt độ (°C)' })
  @Type(() => Number)
  @IsNumber()
  @Min(-40)
  @Max(100)
  temperature!: number

  @ApiProperty({ example: 65, minimum: 0, maximum: 100, description: 'Độ ẩm (%)' })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  humidity!: number

  @ApiPropertyOptional({ example: 320, minimum: 0, description: 'Cường độ ánh sáng (lux)' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  light_intensity?: number

  @ApiPropertyOptional({ example: 85, minimum: 0, description: 'Chất lượng không khí (AQI)' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  air_quality?: number
}
