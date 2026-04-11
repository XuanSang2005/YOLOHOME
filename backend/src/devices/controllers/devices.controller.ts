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
import { DevicesService } from '../services/devices.service'
import { CreateDeviceDto, DeviceType } from '../dto/create-device.dto'
import { ResponseMessage } from '../../common/decorators/response-message.decorator'

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  findAll(@Query('type') type?: DeviceType) {
    return this.devicesService.findAll(type)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devicesService.findById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Device created')
  create(@Body() dto: CreateDeviceDto) {
    return this.devicesService.create(dto)
  }
}
