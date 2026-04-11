import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger'
import { DevicesService } from '../services/devices.service'
import { CreateDeviceDto, DeviceType } from '../dto/create-device.dto'
import { ResponseMessage } from '../../common/decorators/response-message.decorator'

@ApiTags('Devices')
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @ApiOperation({ summary: 'Lấy danh sách thiết bị', description: 'Có thể lọc theo type: light, sensor, camera' })
  @ApiQuery({ name: 'type', enum: DeviceType, required: false })
  @Get()
  findAll(@Query('type') type?: DeviceType) {
    return this.devicesService.findAll(type)
  }

  @ApiOperation({ summary: 'Lấy thiết bị theo ID' })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId của thiết bị' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devicesService.findById(id)
  }

  @ApiOperation({ summary: 'Tạo thiết bị mới' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Device created')
  create(@Body() dto: CreateDeviceDto) {
    return this.devicesService.create(dto)
  }
}
