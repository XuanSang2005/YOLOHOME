import { Injectable } from '@nestjs/common'
import { CameraRepository } from '../repositories/camera.repository'
import type { CameraCommandDto } from '../dto/camera-command.dto'

@Injectable()
export class CameraService {
  constructor(private readonly repository: CameraRepository) {}

  getLogs() {
    return this.repository.findAll()
  }

  sendCommand(dto: CameraCommandDto) {
    return this.repository.createLog(dto.command)
  }
}
