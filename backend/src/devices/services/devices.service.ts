import { Injectable, NotFoundException } from '@nestjs/common'
import { DevicesRepository } from '../repositories/devices.repository'
import type { CreateDeviceDto, DeviceType } from '../dto/create-device.dto'

@Injectable()
export class DevicesService {
  constructor(private readonly repository: DevicesRepository) {}

  findAll(type?: DeviceType) {
    return this.repository.findAll(type)
  }

  async findById(id: string) {
    const device = await this.repository.findById(id)
    if (!device) throw new NotFoundException(`Device #${id} not found`)
    return device
  }

  create(dto: CreateDeviceDto) {
    return this.repository.create(dto)
  }
}
